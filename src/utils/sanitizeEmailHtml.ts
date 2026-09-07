import DOMPurify from 'dompurify';

const allowedTags = ['a', 'b', 'br', 'em', 'i', 'li', 'ol', 'p', 'span', 'strong', 'ul'];
const allowedAttributes = ['href', 'rel', 'style', 'target'];
const allowedHref = /^(https?|mailto|tel):/i;

function normalizeLegacyTag(element: HTMLElement, tagName: 'b' | 'i') {
    const replacement = document.createElement(tagName);

    Array.from(element.attributes).forEach((attribute) => {
        replacement.setAttribute(attribute.name, attribute.value);
    });
    replacement.append(...Array.from(element.childNodes));
    element.replaceWith(replacement);
}

function keepSafeAttributes(html: string) {
    const container = document.createElement('div');
    container.innerHTML = html;

    container.querySelectorAll<HTMLElement>('strong').forEach((element) => normalizeLegacyTag(element, 'b'));
    container.querySelectorAll<HTMLElement>('em').forEach((element) => normalizeLegacyTag(element, 'i'));

    container.querySelectorAll<HTMLElement>('*').forEach((element) => {
        if (element.tagName !== 'A') {
            return;
        }

        const href = element.getAttribute('href');
        if (href === null || !allowedHref.test(href.trim())) {
            element.removeAttribute('href');
            element.removeAttribute('target');
            element.removeAttribute('rel');
            return;
        }

        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');
    });

    return container.innerHTML;
}

export function sanitizeEmailHtml(html: string) {
    const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
        ALLOWED_URI_REGEXP: allowedHref,
        KEEP_CONTENT: true,
    });

    return keepSafeAttributes(sanitizedHtml);
}
