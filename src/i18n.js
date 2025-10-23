import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

i18n
    .use(LanguageDetector) // Automatically detects user language
    .use(initReactI18next) // Passes i18n instance to react-i18next
    .init({
        resources: {
            en: { translation: en },
            de: { translation: de },
        },
        fallbackLng: 'en', // Default language
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

export default i18n;
