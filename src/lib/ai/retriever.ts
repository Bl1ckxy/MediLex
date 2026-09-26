import { cohereRerank } from './providers';
import { embedText } from './embeddings';

export type RetrievedChunk = { id: string; content: string; score: number; metadata?: unknown };
type RetrievedChunkRow = {
    id: string;
    chunk_content: string;
    metadata?: unknown;
    similarity?: number;
};

export async function retrieveChunks(
    supabase: {
        rpc: (name: string, args: Record<string, unknown>) => Promise<{ data: RetrievedChunkRow[] | null; error: unknown }>;
        from?: (table: string) => { select: (columns: string) => { eq: (column: string, value: string) => { limit: (count: number) => Promise<{ data: RetrievedChunkRow[] | null }> } } };
    },
    query: string,
    caseId: string,
    limit = 8,
): Promise<RetrievedChunk[]> {
    let data: RetrievedChunkRow[] | null = null;
    let error: unknown = null;
    try {
        const embedding = await embedText(query);
        ({ data, error } = await supabase.rpc('match_chunks', {
            query_embedding: embedding,
            match_case_id: caseId,
            match_count: Math.max(limit * 3, 20),
        }));
    } catch (cause) {
        error = cause;
    }
    if (!error && data?.length) {
        try {
            const ranked = await cohereRerank(query, data.map((chunk) => chunk.chunk_content), limit);
            return ranked.map((item) => {
                const chunk = data[item.index];
                return { id: chunk?.id ?? '', content: chunk?.chunk_content ?? '', metadata: chunk?.metadata, score: item.relevanceScore };
            });
        } catch {
            return data.slice(0, limit).map((chunk) => ({
                id: chunk.id,
                content: chunk.chunk_content,
                metadata: chunk.metadata,
                score: chunk.similarity ?? 0,
            }));
        }
    }
    // A lexical fallback keeps retrieval useful when pgvector/RPC is unavailable.
    if (supabase.from) {
        const { data: all } = await supabase.from('document_chunks')
            .select('id, chunk_content, metadata')
            .eq('case_id', caseId)
            .limit(Math.max(limit * 4, 20));
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        return (all ?? [])
            .map((chunk) => {
                const content = chunk.chunk_content ?? '';
                const score = terms.reduce((total, term) => total + (content.toLowerCase().includes(term) ? 1 : 0), 0);
                return { id: chunk.id, content, metadata: chunk.metadata, score };
            })
            .filter((chunk) => chunk.score > 0)
            .sort((left, right) => right.score - left.score)
            .slice(0, limit);
    }
    return [];
}
