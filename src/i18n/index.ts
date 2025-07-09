import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations directly
import enTranslations from "../../public/locales/en/translation.json";
import ruTranslations from "../../public/locales/ru/translation.json";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  resources: {
    en: {
      translation: enTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
});

export default i18n;
