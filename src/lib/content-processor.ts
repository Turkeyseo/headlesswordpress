/**
 * Content Processor for WordPress Galleries
 * Pre-processes HTML content to detect and wrap gallery patterns
 * before they are parsed by html-react-parser
 */

/**
 * Processes WordPress content to detect and wrap gallery patterns
 * This runs BEFORE html-react-parser so that gutenberg.tsx can detect galleries
 */
export function processContentForGalleries(content: string): string {
    if (!content) return '';

    let processed = content;

    // Pattern 1: Multiple images inside a single paragraph
    // Example: <p><img src="..." /><br /><img src="..." /></p>
    // This is common in classic editor when users paste multiple images
    const multipleImagesInParagraph = /<p\b[^>]*>(?:\s*(?:<a[^>]*>)?\s*<img[^>]+>\s*(?:<\/a>)?\s*(?:<br\s*\/?>)?\s*){2,}\s*<\/p>/gi;

    processed = processed.replace(multipleImagesInParagraph, (match) => {
        const imgCount = (match.match(/<img/gi) || []).length;
        if (imgCount > 1) {
            return `<div class="detected-gallery">${match}</div>`;
        }
        return match;
    });

    // Pattern 2: Consecutive single-image paragraphs
    // Example: <p><img src="1.jpg" /></p><p><img src="2.jpg" /></p>
    // This detects 2+ consecutive paragraphs that each contain only an image
    const singleImageParagraph = String.raw`<p\b[^>]*>\s*(?:<a[^>]*>)?\s*<img[^>]+>\s*(?:<\/a>)?\s*<\/p>`;
    const whitespace = String.raw`\s*`;
    const consecutiveImageParagraphs = new RegExp(`(?:${singleImageParagraph}${whitespace}){2,}`, 'gi');

    processed = processed.replace(consecutiveImageParagraphs, (match) => {
        // Avoid double-wrapping
        if (match.includes('detected-gallery')) {
            return match;
        }
        return `<div class="detected-gallery">${match}</div>`;
    });

    return processed;
}

/**
 * Strips HTML tags from content (useful for excerpts)
 */
export function stripHtmlTags(content: string): string {
    if (!content) return '';
    return content.replace(/<[^>]*>/g, '').trim();
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 160): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}
