import * as DOMPurify from 'dompurify';

/**
 * XSS sanitize
 * @param {string} markup markup to sanitize
 * @returns {string} sanitized markup
 */
export const xss = (markup) => {
    return DOMPurify.sanitize(markup);
};
