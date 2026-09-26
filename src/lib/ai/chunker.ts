import { encoding_for_model, type Tiktoken } from 'tiktoken';

export type TextChunk = { content: string; tokenCount: number; page?: number };

export function chunkText(text: string, maxTokens = 512, overlap = 50): TextChunk[] {
    const encoding: Tiktoken = encoding_for_model('gpt-4o');
    try {
        const tokens = encoding.encode(text);
        const chunks: TextChunk[] = [];
        let start = 0;
        while (start < tokens.length) {
            const end = Math.min(start + maxTokens, tokens.length);
            const content = new TextDecoder().decode(encoding.decode(tokens.slice(start, end)));
            if (content.trim()) chunks.push({ content, tokenCount: end - start });
            if (end === tokens.length) break;
            start = Math.max(start + 1, end - overlap);
        }
        return chunks;
    } finally {
        encoding.free();
    }
}
