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
                        discardSaveAndCloseTemplate: 'Close without save',
                        confirmSaveAndCloseTemplate: 'Close and save',
                        desktop: 'Desktop',
                        mobile: 'Mobile',
                        delete: 'Delete',
                        duplicate: 'Duplicate',
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
                        noContainerInTemplate: 'No content in your email. Use "Layout Containers" items to add content.',
                    },
                    title: {
                        customTemplates: 'Custom templates',
                        builtinTemplates: 'Built-in templates',
                    },
                    languages: {
                        sk: 'Slovak',
                        en: 'English',
                    },
                    controls: {
                        background_color: "Background color",
                        content_background_color: 'Content background color',
                        text_color: 'Text color',
                        content_width: 'Content width',
                        template_name: 'Template name',
                        template_subject_line: 'Subject line',
                        template_preview_line_1: 'Preview line 1',
                        template_preview_line_2: 'Preview line 2',
                        padding: 'Padding',
                        padding_top: 'Padding top',
                        padding_bottom: 'Padding bottom',
                        border_width: 'Border width',
                        border_color: 'Border color',
                        border_style: 'Border style',
                        border_type_solid: 'Solid',
                        border_type_dashed: 'Dashed',
                        border_type_dotted: 'Dotted',
                        columns_width: 'Columns width',
                        image_source_url: 'Image source URL',
                        image_width: 'Image width',
                        align_type: 'Alignment',
                        align_type_left: 'Left',
                        align_type_center: 'Center',
                        align_type_right:'Right',
                        image_alternate_text:'Image alternate text',
                        
                    },
                    templates: {
                        email_template_settings: 'Email template settings',
                        general: 'General',
                        containers: "Layout containers",
                        template_header: 'Email header',
                    },
                    containers: {
                        container_settings: 'Container settings',
                        general: 'General',
                        columns: 'Columns',
                        column: 'Column',
                    },
                    blocks: {
                        block_settings:'Block element settings',
                        general: 'General',
                    },

                }
            },
            sk: {
                translation: {
                    button: {
                        createCopyTemplate: 'Vytvoriť kópiu',
                        editTemplate: 'Upraviť',
                        removeTemplate: 'Zmazať',
                        discardSaveAndCloseTemplate: 'Zatvoriť bez ukladania',
                        confirmSaveAndCloseTemplate: 'Uložiť a zatvoriť',
                        desktop: 'Desktop',
                        mobile: 'Mobil',
                        delete: 'Vymazať',
                        duplicate: 'Duplikovať',
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
                        noContainerInTemplate: 'Zatial nie je žiaden obsah v tvojej správe. Na pridanie obsahu použi prvky "Rozloženia Obsahu"',

                    },
                    title: {
                        customTemplates: 'Uživatelské šablóny',
                        builtinTemplates: 'Vstavané šablóny',
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
                        padding: 'Odsadenie',
                        padding_top: 'Odsadenie z hora',
                        padding_bottom: 'Odsadenie z dola',
                        border_width: 'Šírka okraja',
                        border_color: 'Farba okraja',
                        border_style: 'Typ okraja',
                        border_type_solid: 'Plná čiara',
                        border_type_dashed: 'Čiarky',
                        border_type_dotted: 'Bodky',
                        content_width: 'Šírka obsahu',
                        columns_width: 'Šírka stĺpcov',
                        image_source_url: 'URL cesta k obrázku',
                        image_width: 'Šírka obrázka',
                        align_type: 'Zarovnanie',
                        align_type_left: 'Do ľava',
                        align_type_center: 'Na stred',
                        align_type_right:'Do prava',
                        image_alternate_text:'Alternatívny text',
                    },
                    templates: {
                        email_template_settings: 'Nastavenia šablóny správy',
                        general: 'Všeobecné',
                        containers: "Rozloženie obsahu",
                        template_header: 'Hlavička správy',
                    },
                    containers: {
                        container_settings: 'Nastavenia rozloženia obsahu',
                        general: 'Všeobecné',
                        columns: 'Stĺpce',
                        column: 'Stĺpec',
                    },
                    blocks: {
                        block_settings:'Nastavenia blokového prvku',
                        general: 'Všeobecné',
                    },
                }
            }
        }
    });