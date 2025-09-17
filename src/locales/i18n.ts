import * as Localization from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import pt from "./pt.json";

const userDeviceLanguage = Localization.getLocales()[0]?.languageCode;

i18next.use(initReactI18next).init({
  resources: {
    en: en,
    pt: pt,
  },
  lng: userDeviceLanguage || undefined,
  fallbackLng: "pt",

  // --- A CORREÇÃO ESTÁ AQUI ---
  // A versão mais recente da biblioteca espera 'v4'.
  compatibilityJSON: "v4",

  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
