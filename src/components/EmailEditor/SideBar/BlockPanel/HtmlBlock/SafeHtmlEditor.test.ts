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
});
