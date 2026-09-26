import { fromBuffer } from 'pdf2pic';

export async function rasterizePdf(pdf: Buffer, maxPages = 100): Promise<Buffer[]> {
    const converter = fromBuffer(pdf, {
        density: 180,
        format: 'png',
        width: 1600,
        height: 2200,
        saveFilename: 'page',
        savePath: process.cwd(),
    });
    const pages = await converter.bulk(-1, { responseType: 'buffer' });
    return pages.slice(0, maxPages).map((page) => {
        if (!page.buffer) throw new Error('PDF rasterizer returned no image data');
        return page.buffer;
    });
}
