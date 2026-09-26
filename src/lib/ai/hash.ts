import { createHash } from 'node:crypto';

export function sha256(buffer: Uint8Array): string {
    return createHash('sha256').update(buffer).digest('hex');
}

/** Hash a File in browser/client code without relying on Node APIs. */
export async function hashFileBrowser(file: Blob): Promise<string> {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Hash uploaded bytes in server code. Accepts a File/Blob or already-read bytes. */
export async function hashFileServer(file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
    const bytes = file instanceof Uint8Array
        ? file
        : new Uint8Array(file instanceof ArrayBuffer ? file : await file.arrayBuffer());
    return sha256(bytes);
}

export function constantTimeEqual(left: string, right: string): boolean {
    if (left.length !== right.length) return false;
    let result = 0;
    for (let index = 0; index < left.length; index += 1) {
        result |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return result === 0;
}
