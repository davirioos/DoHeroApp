import en from "./en.json";
import pt from "./pt.json";

export const resources = {
  pt: pt,
  en: en,
} as const;

export type AvailableLanguages = keyof typeof resources;
