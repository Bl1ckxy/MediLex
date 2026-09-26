import { groqChat, geminiText } from '@/lib/ai/providers';

/** Calls the configured provider and tolerates fenced JSON responses. */
export async function generateJson<T>(prompt: string): Promise<T> {
    // Try Groq first with fallback chain
    try {
        const text = await groqChat(prompt);
        const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? text;
        return JSON.parse(fenced.trim()) as T;
    } catch (groqError) {
        console.warn('[GENERATE_JSON] Groq failed, falling back to Gemini:', groqError instanceof Error ? groqError.message : groqError);
    }

    // Fallback to Gemini with its own fallback chain
    try {
        const text = await geminiText(prompt);
        const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? text;
        return JSON.parse(fenced.trim()) as T;
    } catch (geminiError) {
        console.error('[GENERATE_JSON] Both Groq and Gemini failed:', geminiError instanceof Error ? geminiError.message : geminiError);
        throw new Error('All AI providers failed to return valid JSON');
    }
}
