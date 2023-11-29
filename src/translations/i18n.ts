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
                    },
                    label: {
                        selectLanguage: 'Select Language:',
                    },
                    message: {
                        error:'Error!',
                        noCustomTemplates: 'No custom templates found',
                        noBuiltinTemplates: 'No built-in templates found',
                        customTemplatesLoadingError: "Can't load custom templates from server.",
                        noBuiltinContainers: 'No built-in layout containers found. Contact administrator!',
                    },
                    title: {
                        customTemplates: 'Custom templates',
                        builtinTemplates: 'Built-in templates',
                    },
                    languages: {
                        sk: 'Slovak',
                        en: 'English',
                    },

                    templates: {
                        email_template_settings: 'Email template settings',
                        general: 'General',
                        containers: "Layout containers",
                        template_header: 'Email header',
                        background_color: "Background color",
                        content_background_color: 'Content background color',
                        text_color: 'Text color',
                        content_width: 'Content width',
                        template_name: 'Template name',
                        template_subject_line: 'Subject line',
                        template_preview_line_1: 'Preview line 1',
                        template_preview_line_2: 'Preview line 2',
                        padding_top: 'Padding top',
                        padding_bottom: 'Padding bottom',
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
                    },
                    label: {
                        selectLanguage: 'Vyberte jazyk:',
                    },
                    message: {
                        error:'Chyba!',
                        noCustomTemplates: 'Neboli najdené žiadne uživatelské šablóny',
                        noBuiltinTemplates: 'Neboli najdené žiadne vstavané šablóny',
                        customTemplatesLoadingError: "Nebolo možné načítať uživatelské šablony zo servera.",
                        noBuiltinContainers: 'Neboli nájdené žiadne vstavané šablóny rozloženia obsahu. Kontakujte administrátora!',

                    },
                    title: {
                        customTemplates: 'Uživatelské šablóny',
                        builtinTemplates: 'Vstavané šablóny',
                    },
                    languages: {
                        sk: 'Slovensky',
                        en: 'Anglicky',
                    },
                    templates: {
                        email_template_settings: 'Nastavenia šablóny správy',
                        general: 'Všeobecné',
                        containers: "Rozloženie obsahu",
                        template_header: 'Hlavička správy',
                        background_color: 'Farba pozadia',
                        content_background_color: 'Farba pozadia obsahu',
                        text_color: 'Farba textu',
                        content_width: 'Šírka obsahu',
                        template_name: 'Názov šablóny',
                        template_subject_line: 'Predmet správy',
                        template_preview_line_1: 'Náhľadový riadok 1',
                        template_preview_line_2: 'Náhľadový riadok 2',
                        padding_top: 'Odsadenie z hora',
                        padding_bottom: 'Odsadenie z dola',
                    },

                }
            }
        }
    });