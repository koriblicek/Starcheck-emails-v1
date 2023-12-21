import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    button: {
                        createCopyTemplate: 'Create copy',
                        editTemplate: 'Edit',
                        removeTemplate: 'Delete',
                        discardSaveTemplate: 'Exit without save',
                        confirmSaveTemplate: 'Save template',
                        confirmExportTemplate: 'Export to HTML',
                        desktop: 'Desktop',
                        mobile: 'Mobile',
                        delete: 'Delete',
                        duplicate: 'Duplicate',
                        default_value: 'Default value',
                        delete_value: 'Delete value',
                        browse_images: 'Browse image',
                        align_left: 'Align left',
                        align_center: 'Align center',
                        align_right: 'Align right',
                        align_justify: 'Justify',
                        email: 'Email',
                        block: 'Block',
                        container: 'Container',
                        add_block: 'Add block',
                        text: 'Text',
                        html: 'Html',
                        image: 'Image',
                        heading: 'Heading',
                        send_preview_mail: 'Send preview email',
                        divider: 'Divider',
                        confirm: 'Confirm',
                        discard: 'Discard',
                        move_up: 'Move up',
                        move_down: 'Move down',
                        button:'Button',
                    },
                    label: {
                        selectLanguage: 'Select Language:',
                    },
                    message: {
                        error: 'Error!',
                        noCustomTemplates: 'No custom templates found',
                        noBuiltinTemplates: 'No built-in templates found',
                        customTemplatesLoadingError: "Can't load custom templates from server.",
                        noBuiltinContainers: 'No built-in layout containers found. Contact administrator!',
                        noBuiltinBlock: 'No built-in block elements found. Contact administrator!',
                        noContainerInTemplate: 'No content in your email. Use "Layout Containers" items to add content.',
                        yourTextHere: 'Your text...',
                        yourHtmlHere: 'Your html code...',
                        yourHeadingHere: 'Your heading...',
                        yourButtonTextHere: 'Your button text...',
                        dropContainerHere: 'Drop container here',
                        dropBlockHere: 'Drop here',
                        imageLoadingError: 'Image loading error. Wrong URL?'
                    },
                    title: {
                        customTemplates: 'Custom templates',
                        builtinTemplates: 'Built-in templates',
                        selectImage: 'Select image',
                    },
                    languages: {
                        sk: 'Slovak',
                        en: 'English',
                    },
                    controls: {
                        template_name: 'Template name',
                        template_subject_line: 'Subject line',
                        template_preview_line_1: 'Preview line 1',
                        template_preview_line_2: 'Preview line 2',
                        background_color: "Background color",
                        content_background_color: 'Content background color',
                        text_color: 'Text color',
                        not_set: '-not set-',
                        content_width: 'Content width',
                        padding: 'Padding',
                        padding_top: 'Padding from top',
                        padding_bottom: 'Padding from bottom',
                        padding_left_right: 'Padding from sides',
                        border_width: 'Border width',
                        border_radius: 'Border radius',
                        border_color: 'Border color',
                        border_style: 'Border style',
                        border_type_solid: 'Solid',
                        border_type_dashed: 'Dashed',
                        border_type_dotted: 'Dotted',
                        columns_width: 'Columns width',
                        background_image_source_url: 'Background image URL',
                        image_source_url: 'Image URL',
                        image_width: 'Image width',
                        mobile_image_width: 'Image width on mobile',
                        align_type: 'Alignment',
                        align_type_left: 'Left',
                        align_type_center: 'Center',
                        align_type_right: 'Right',
                        image_alternate_text: 'Image alternate text',
                        font_family: 'Font family',
                        font_size: 'Font size',
                        line_height: 'Line height',
                        font_weight: 'Font weight',
                        text_align: 'Text align',
                        text: 'Text',
                        control_font_weight_normal: 'Normal',
                        control_font_weight_bold: "Bold",
                        control_font_weight_100: 'Thin',
                        control_font_weight_200: 'Extra Light',
                        control_font_weight_300: 'Light',
                        control_font_weight_400: 'Normal (Regular)',
                        control_font_weight_500: 'Medium',
                        control_font_weight_600: 'Semi Bold',
                        control_font_weight_700: 'Bold',
                        control_font_weight_800: 'Extra Bold',
                        control_font_weight_900: 'Black (Heavy)',
                        control_font_weight_950: 'Extra Black',
                        heading: 'Heading',
                        html_code: 'HTML code',
                        image_anchor: 'Image link',
                        image_anchor_target: 'Open link in',
                        control_a_target_blank: 'New tab',
                        control_a_target_self: 'The same tab',
                        divider_width: 'Divider width',
                        line_width: 'Line width',
                        line_color: 'Line color',
                        line_style: 'Line style',
                        button_text: 'Button text',
                        button_background_color: 'Button background color',
                        button_text_color: 'Button text color',
                        button_text_horizontal_padding: 'Button text horizontal padding',
                        button_text_vertical_padding: 'Button text vertical padding',
                        button_anchor: 'Button link',
                        button_anchor_target: 'Open link in',
                    },
                    templates: {
                        email_template_settings: 'Email template settings',
                        general: 'General',
                        containers: "Layout containers",
                        template_header: 'Header',
                        sender_adress: 'Sender\'s address',
                        preview_email_adress: 'Preview email recepient',
                    },
                    containers: {
                        container_settings: 'Container settings',
                        general: 'General',
                        columns: 'Columns',
                        column: 'Column',
                        blocks: 'Blocks',
                    },
                    blocks: {
                        block_settings: 'Block element settings',
                        general: 'General',
                        element: 'Element',
                    },
                }
            },
            sk: {
                translation: {
                    button: {
                        createCopyTemplate: 'Vytvoriť kópiu',
                        editTemplate: 'Upraviť',
                        removeTemplate: 'Zmazať',
                        discardSaveTemplate: 'Zatvoriť bez uloženia',
                        confirmSaveTemplate: 'Uložiť šablónu',
                        confirmExportTemplate: 'Exportovať do HTML',
                        desktop: 'Desktop',
                        mobile: 'Mobil',
                        delete: 'Vymazať',
                        duplicate: 'Duplikovať',
                        default_value: 'Pôvodná hodnota',
                        delete_value: 'Vymazať hodnotu',
                        browse_images: 'Vyhľadaj obrázok',
                        align_left: 'Zarovnať vľavo',
                        align_center: 'Zarovnť na stred',
                        align_right: 'Zarovnť do prava',
                        align_justify: 'Do bloku',
                        email: 'Správa',
                        block: 'Prvok',
                        container: 'Obsah',
                        add_block: 'Pridať prvok',
                        text: 'Text',
                        html: 'Html',
                        image: 'Obrázok',
                        heading: 'Hlavička',
                        send_preview_mail: 'Odoslať skúšobný email',
                        divider: 'Oddelovač',
                        confirm: 'Potvrdiť',
                        discard: 'Zrušiť',
                        move_up: 'Presunúť hore',
                        move_down: 'Presunúť dole',
                        button:'Tlačidlo',
                    },
                    label: {
                        selectLanguage: 'Vyberte jazyk:',
                    },
                    message: {
                        error: 'Chyba!',
                        noCustomTemplates: 'Neboli najdené žiadne uživatelské šablóny',
                        noBuiltinTemplates: 'Neboli najdené žiadne vstavané šablóny',
                        customTemplatesLoadingError: "Nebolo možné načítať uživatelské šablony zo servera.",
                        noBuiltinContainers: 'Neboli nájdené žiadne vstavané šablóny rozloženia obsahu. Kontakujte administrátora!',
                        noBuiltinBlock: 'Neboli nájdené žiadne vstavané šablóny prvkov. Kontakujte administrátora!',
                        noContainerInTemplate: 'Zatial nie je žiaden obsah v tvojej správe. Na pridanie obsahu použi prvky "Rozloženia Obsahu"',
                        yourTextHere: 'Váš text...',
                        yourHtmlHere: 'Váš html kód...',
                        yourHeadingHere: 'Váša hlavička...',
                        yourButtonTextHere: 'Váš text na tlačidle...',
                        dropContainerHere: 'Pustite šablónu obsahu tu',
                        dropBlockHere: 'Pustite tu',
                        imageLoadingError: 'Obrazok nie je možné načítať. Chybná URL cesta?',
                    },
                    title: {
                        customTemplates: 'Uživatelské šablóny',
                        builtinTemplates: 'Vstavané šablóny',
                        selectImage: 'Vyberte obrázok',
                    },
                    languages: {
                        sk: 'Slovensky',
                        en: 'Anglicky',
                    },
                    controls: {
                        template_name: 'Názov šablóny',
                        template_subject_line: 'Predmet správy',
                        template_preview_line_1: 'Náhľadový riadok 1',
                        template_preview_line_2: 'Náhľadový riadok 2',
                        background_color: 'Farba pozadia',
                        content_background_color: 'Farba pozadia obsahu',
                        text_color: 'Farba textu',
                        not_set: '-nenastavená-',
                        padding: 'Odsadenie',
                        padding_top: 'Odsadenie zhora',
                        padding_bottom: 'Odsadenie zdola',
                        padding_left_right: 'Odsadenie z okrajov',
                        border_width: 'Šírka okraja',
                        border_radius: 'Zaokruhlenie okraja',
                        border_color: 'Farba okraja',
                        border_style: 'Typ okraja',
                        border_type_solid: 'Plná čiara',
                        border_type_dashed: 'Čiarky',
                        border_type_dotted: 'Bodky',
                        content_width: 'Šírka obsahu',
                        columns_width: 'Šírka stĺpcov',
                        background_image_source_url: 'URL cesta k pozadiu',
                        image_source_url: 'URL cesta k obrázku',
                        image_width: 'Šírka obrázka',
                        mobile_image_width: 'Šírka obrázka na mobile',
                        align_type: 'Zarovnanie',
                        align_type_left: 'Do ľava',
                        align_type_center: 'Na stred',
                        align_type_right: 'Do prava',
                        image_alternate_text: 'Alternatívny text',
                        font_family: 'Typ písma',
                        font_size: 'Veľkosť písma',
                        line_height: 'Veľkosť riadku',
                        font_weight: 'Hrúbka písma',
                        text_align: 'Zarovnanie textu',
                        text: 'Text',
                        control_font_weight_normal: 'Základné',
                        control_font_weight_bold: "Tučné",
                        control_font_weight_100: 'Tenké',
                        control_font_weight_200: 'Extra ľahké',
                        control_font_weight_300: 'Ľahké',
                        control_font_weight_400: 'Základné',
                        control_font_weight_500: 'Stredné',
                        control_font_weight_600: 'Polotučné',
                        control_font_weight_700: 'Tučné',
                        control_font_weight_800: 'Extra tučné',
                        control_font_weight_900: 'Tmavé (Ťažké)',
                        control_font_weight_950: 'Extra tmavé',
                        heading: 'Hlavička',
                        html_code: 'HTML kód',
                        image_anchor: 'Odkaz z obrázka',
                        image_anchor_target: 'Otvoriť odkaz v',
                        control_a_target_blank: 'Nová záložka',
                        control_a_target_self: 'Rovnaké okno',
                        divider_width: 'Šírka oddelovača',
                        line_width: 'Šírka čiary',
                        line_color: 'Farba čiary',
                        line_style: 'Typ čiary',
                        button_text: 'Text na tlačidle',
                        button_background_color: 'Farba pozadia tlačidla',
                        button_text_color: 'Farba textu na tlačidle',
                        button_text_horizontal_padding: 'Horizontálne odsadenie textu',
                        button_text_vertical_padding: 'Vertikálne odsadenie textu',
                        button_anchor: 'Odkaz z tlačidla',
                        button_anchor_target: 'Otvoriť odkaz v',
                    },
                    templates: {
                        email_template_settings: 'Nastavenia šablóny správy',
                        general: 'Všeobecné',
                        containers: "Šablóny obsahu",
                        template_header: 'Hlavička',
                        sender_adress: 'Adresa odosielateľa',
                        preview_email_adress: 'Adresa prijímateľa skúšobného emailu',
                    },
                    containers: {
                        container_settings: 'Nastavenia rozloženia obsahu',
                        general: 'Všeobecné',
                        columns: 'Stĺpce',
                        column: 'Stĺpec',
                        blocks: 'Prvky',
                    },
                    blocks: {
                        block_settings: 'Nastavenia blokového prvku',
                        general: 'Všeobecné',
                        element: 'Prvok',
                    },
                }
            }
        }
    });