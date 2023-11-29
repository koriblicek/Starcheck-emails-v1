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
                    },
                    label: {
                        selectLanguage: 'Select Language:',
                    },
                    message: {
                        noCustomTemplates: 'No custom templates found',
                        noBuiltinTemplates: 'No built-in templates found',
                        customTemplatesLoadingError: "Can't load custom templates from server.",
                    },
                    title: {
                        customTemplates: 'Custom templates',
                        builtinTemplates: 'Built-in templates',
                    },
                    languages: {
                        sk: 'Slovak',
                        en: 'English',
                    },
                }
            },
            sk: {
                translation: {
                    button: {
                        createCopyTemplate: 'Vytvoriť kópiu',
                        editTemplate: 'Upraviť',
                        removeTemplate: 'Odstrániť',
                        discardSaveAndCloseTemplate: 'Zatvoriť bez ukladania',
                        confirmSaveAndCloseTemplate: 'Uložiť a zatvoriť',
                    },
                    label: {
                        selectLanguage: 'Vyberte jazyk:',
                    },
                    message: {
                        noCustomTemplates: 'Neboli najdené žiadne uživatelské šablóny',
                        noBuiltinTemplates: 'Neboli najdené žiadne vstavané šablóny',
                        customTemplatesLoadingError: "Nebolo možné načítať uživatelské šablony zo servera.",
                    },
                    title: {
                        customTemplates: 'Uživatelské šablóny',
                        builtinTemplates: 'Vstavané šablóny',
                    },
                    languages: {
                        sk: 'Slovensky',
                        en: 'Anglicky',
                    },

                }
            }
        }
    });