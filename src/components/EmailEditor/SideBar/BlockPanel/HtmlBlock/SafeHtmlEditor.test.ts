import { Editor } from '@tiptap/core';
import { afterEach, describe, expect, it } from 'vitest';
import { emailEditorExtensions } from './SafeHtmlEditor';

describe('emailEditorExtensions', () => {
    let editor: Editor | undefined;

    afterEach(() => {
        editor?.destroy();
        editor = undefined;
    });

    it('preserves a link style when another text is made bold', () => {
        editor = new Editor({
            extensions: emailEditorExtensions,
            content: '<p><a href="https://starcheck.sk" style="color: #ff0000;">odkaz</a> text</p>',
        });

        editor.commands.setTextSelection({ from: 8, to: 12 });
        editor.commands.toggleBold();

        const html = editor.getHTML();

        expect(html).toContain('href="https://starcheck.sk"');
        expect(html).toContain('style="color: rgb(255, 0, 0);"');
    });

    it('preserves inline styles on formatting marks', () => {
        editor = new Editor({
            extensions: emailEditorExtensions,
            content: '<b style="color: red">tučné</b><i style="background: black">kurzíva</i><span style="font-size: 18px">text</span>',
        });

        const html = editor.getHTML();

        expect(html).toContain('<b style="color: red;">tučné</b>');
        expect(html).toContain('<i style="background: black;">kurzíva</i>');
        expect(html).toContain('<span style="font-size: 18px;">text</span>');
    });

    it('preserves inline styles on list elements', () => {
        editor = new Editor({
            extensions: emailEditorExtensions,
            content: '<ul style="color: red"><li style="background: black">Položka</li></ul>',
        });

        const html = editor.getHTML();

        expect(html).toContain('<ul style="color: red;">');
        expect(html).toContain('<li style="background: black;">');
    });
});
