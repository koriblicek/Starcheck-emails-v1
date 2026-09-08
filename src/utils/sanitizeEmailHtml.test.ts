import { describe, expect, it } from 'vitest';
import { sanitizeEmailHtml } from './sanitizeEmailHtml';

describe('sanitizeEmailHtml', () => {
    it('preserves allowed email-safe formatting', () => {
        const html = sanitizeEmailHtml('<p><b>Text</b> <i>kurzíva</i> <a href="https://starcheck.sk" target="_blank">odkaz</a></p><ul><li>Položka</li></ul>');

        expect(html).toContain('<b>Text</b>');
        expect(html).toContain('<i>kurzíva</i>');
        expect(html).toContain('href="https://starcheck.sk"');
        expect(html).toContain('rel="noopener noreferrer"');
        expect(html).toContain('<ul><li>Položka</li></ul>');
        expect(html).not.toContain('<p>');
    });

    it('preserves inline styles while removing unsafe markup and links', () => {
        const html = sanitizeEmailHtml('<p onclick="alert(1)" style="color: #ff0000; background: black; text-align: center">Text<script>alert(1)</script></p><a href="javascript:alert(1)">zle</a><iframe src="https://example.com"></iframe>');

        expect(html).toContain('color: #ff0000;');
        expect(html).toContain('background: black;');
        expect(html).toContain('text-align: center');
        expect(html).not.toContain('onclick');
        expect(html).not.toContain('script');
        expect(html).not.toContain('javascript:');
        expect(html).not.toContain('iframe');
    });

    it('normalizes legacy strong and em tags to b and i', () => {
        const html = sanitizeEmailHtml('<p><strong>Text</strong> <em>kurzíva</em></p>');

        expect(html).toBe('<b>Text</b> <i>kurzíva</i>');
    });

    it('replaces paragraph boundaries with br while preserving existing br tags', () => {
        const html = sanitizeEmailHtml('<p>Prvý<br>riadok</p><p><b>Druhý</b></p>');

        expect(html).toBe('Prvý<br>riadok<br><b>Druhý</b>');
    });
});
