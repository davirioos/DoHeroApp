import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pt from "./pt.json";

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const savedData = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
    const language =
      savedData || Localization.getLocales()[0]?.languageCode || "pt";
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      pt: pt,
    },
    fallbackLng: "pt",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
