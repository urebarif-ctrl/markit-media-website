/**
 * Lightweight server-safe HTML sanitizer.
 *
 * Strips script tags, event-handler attributes, javascript: URIs, and
 * inline iframes from HTML strings.  Designed to run in edge/serverless
 * environments (no DOM required) as a defence-in-depth layer for CMS
 * content rendered via dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, 'blocked:')
    .replace(/<iframe\b[^>]*>/gi, '');
}
