import sanitizeHtml from "sanitize-html";

/**
 * Strips XSS vectors from model-produced HTML before it reaches the client.
 * Matches the tags we ask the model to use in the system prompt.
 */
export function sanitizeAssistantHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["p", "ul", "ol", "li", "strong", "em", "a", "br", "code"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      a: ["http", "https", "mailto"],
    },
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: attribs.href ?? "",
          target: "_blank",
          rel: "noopener noreferrer nofollow",
        },
      }),
    },
  });
}
