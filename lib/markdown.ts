/**
 * Simple markdown to HTML converter for email content
 * Supports: bold, italic, headers, lists
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers (### Header -> <h3>Header</h3>)
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-red-800 mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-red-800 mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-red-800 mt-4 mb-2">$1</h1>');

  // Bold (**text** or __text__ -> <strong>text</strong>)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-red-800">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-bold text-red-800">$1</strong>');

  // Italic (*text* or _text_ -> <em>text</em>)
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  // Bullet lists (- item or * item -> <ul><li>item</li></ul>)
  html = html.replace(/^[•\-\*] (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li class="ml-4">.+<\/li>\n?)+/g, '<ul class="list-disc list-inside my-2">$&</ul>');

  // Numbered lists (1. item -> <ol><li>item</li></ol>)
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="my-2">');
  html = '<p class="my-2">' + html + '</p>';

  return html;
}
