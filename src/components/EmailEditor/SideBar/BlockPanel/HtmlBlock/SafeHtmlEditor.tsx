import { Color } from '@tiptap/extension-color';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    LinkBubbleMenu,
    LinkBubbleMenuHandler,
    MenuButtonBold,
    MenuButtonBulletedList,
    MenuButtonEditLink,
    MenuButtonItalic,
    MenuButtonOrderedList,
    MenuButtonRedo,
    MenuButtonTextColor,
    MenuButtonUndo,
    MenuControlsContainer,
    MenuDivider,
    RichTextEditor,
    RichTextEditorRef,
} from 'mui-tiptap';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sanitizeEmailHtml } from '../../../../../utils/sanitizeEmailHtml';

type EditorMode = 'visual' | 'source';

interface ISafeHtmlEditorProps {
    html: string;
    onChange: (html: string) => void;
}

const EmailLink = Link.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: null,
                parseHTML: (element) => element.getAttribute('style'),
                renderHTML: (attributes) => attributes.style === null ? {} : { style: attributes.style },
            },
        };
    },
});

const StyledBold = Bold.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: null,
                parseHTML: (element) => element.getAttribute('style'),
                renderHTML: (attributes) => attributes.style === null ? {} : { style: attributes.style },
            },
        };
    },
    renderHTML({ HTMLAttributes }) {
        return ['b', HTMLAttributes, 0];
    },
});

const StyledItalic = Italic.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: null,
                parseHTML: (element) => element.getAttribute('style'),
                renderHTML: (attributes) => attributes.style === null ? {} : { style: attributes.style },
            },
        };
    },
    renderHTML({ HTMLAttributes }) {
        return ['i', HTMLAttributes, 0];
    },
});

const StyledTextStyle = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: null,
                parseHTML: (element) => element.getAttribute('style'),
                renderHTML: (attributes) => attributes.style === null ? {} : { style: attributes.style },
            },
        };
    },
});

function withStyleAttribute<T extends typeof BulletList | typeof OrderedList | typeof ListItem>(extension: T) {
    return extension.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                style: {
                    default: null,
                    parseHTML: (element) => element.getAttribute('style'),
                    renderHTML: (attributes) => attributes.style === null ? {} : { style: attributes.style },
                },
            };
        },
    });
}

export const emailEditorExtensions = [
    StarterKit.configure({
        bold: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        heading: false,
        horizontalRule: false,
        italic: false,
        bulletList: false,
        listItem: false,
        orderedList: false,
        strike: false,
    }),
    StyledBold,
    StyledItalic,
    StyledTextStyle,
    Color,
    withStyleAttribute(BulletList),
    withStyleAttribute(OrderedList),
    withStyleAttribute(ListItem),
    EmailLink.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
            rel: 'noopener noreferrer',
            target: '_blank',
        },
    }),
    LinkBubbleMenuHandler,
];

export function SafeHtmlEditor({ html, onChange }: ISafeHtmlEditorProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const editorRef = useRef<RichTextEditorRef>(null);
    const [mode, setMode] = useState<EditorMode>('visual');
    const [sourceHtml, setSourceHtml] = useState(() => sanitizeEmailHtml(html));

    useEffect(() => {
        const sanitizedHtml = sanitizeEmailHtml(html);
        setSourceHtml(sanitizedHtml);

        const editor = editorRef.current?.editor;
        if (editor && !editor.isDestroyed && !editor.isFocused) {
            editor.commands.setContent(sanitizedHtml, false);
        }
    }, [html]);

    function updateHtml(nextHtml: string) {
        const sanitizedHtml = sanitizeEmailHtml(nextHtml);
        setSourceHtml(sanitizedHtml);
        onChange(sanitizedHtml);
    }

    function applySourceHtml() {
        const sanitizedHtml = sanitizeEmailHtml(sourceHtml);

        setSourceHtml(sanitizedHtml);
        onChange(sanitizedHtml);
        editorRef.current?.editor?.commands.setContent(sanitizedHtml, false);
    }

    function handleModeChange(_: React.MouseEvent<HTMLElement>, nextMode: EditorMode | null) {
        if (nextMode === null) {
            return;
        }

        if (nextMode === 'visual') {
            applySourceHtml();
        }

        setMode(nextMode);
    }

    return (
        <Box>
            <ToggleButtonGroup
                exclusive
                fullWidth
                size="small"
                value={mode}
                onChange={handleModeChange}
                sx={{ mb: 1 }}
            >
                <ToggleButton value="visual" title={t('button.visualEditor')}>
                    <EditOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    {t('button.visualEditor')}
                </ToggleButton>
                <ToggleButton value="source" title={t('button.htmlSource')}>
                    <CodeOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    {t('button.htmlSource')}
                </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ display: mode === 'visual' ? 'block' : 'none' }}>
                <RichTextEditor
                    ref={editorRef}
                    content={sanitizeEmailHtml(html)}
                    extensions={emailEditorExtensions}
                    onUpdate={({ editor }) => updateHtml(editor.getHTML())}
                    renderControls={() => (
                        <MenuControlsContainer>
                            <MenuButtonUndo tooltipLabel={t('button.undo')} />
                            <MenuButtonRedo tooltipLabel={t('button.redo')} />
                            <MenuDivider />
                            <MenuButtonBold tooltipLabel={t('button.bold')} />
                            <MenuButtonItalic tooltipLabel={t('button.italic')} />
                            <MenuDivider />
                            <MenuButtonBulletedList tooltipLabel={t('button.bulletList')} />
                            <MenuButtonOrderedList tooltipLabel={t('button.orderedList')} />
                            <MenuDivider />
                            <MenuButtonEditLink tooltipLabel={t('button.editLink')} />
                            <MenuButtonTextColor
                                defaultTextColor={theme.palette.text.primary}
                                tooltipLabel={t('button.textColor')}
                            />
                        </MenuControlsContainer>
                    )}
                >
                    {() => <LinkBubbleMenu />}
                </RichTextEditor>
            </Box>
            <Box sx={{ display: mode === 'source' ? 'block' : 'none' }}>
                <TextField
                    fullWidth
                    multiline
                    minRows={10}
                    value={sourceHtml}
                    onChange={(event) => setSourceHtml(event.target.value)}
                />
                <Button sx={{ mt: 1 }} variant="contained" onClick={applySourceHtml}>
                    {t('button.confirm')}
                </Button>
            </Box>
        </Box>
    );
}
