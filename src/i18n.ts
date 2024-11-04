import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "hu",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          message: "Welcome to React and react-i18next",
          comment: {
            creator: "Create a comment",
          },
        },
      },
      hu: {
        translation: {
          message: "Üdvözöllek a React és a react-i18next világában",
          comment: {
            creator: "Hozz létre egy hozzászólást",
          },
        },
      },
    },
  });
