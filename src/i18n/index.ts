import i18next, { i18n } from "i18next";

import { dictionaries } from "@/dictionaries";

export const getI18nProvider = (): i18n => {
  loadResourceBundles(i18next);
  return i18next;
};

export const loadResourceBundles = (provider: i18n) => {
  Object.keys(dictionaries).forEach(k => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    provider.addResourceBundle(k, "swarm", (dictionaries as any)[k]);
  });
};

export const getSupportedLanguages = () => Object.keys(dictionaries);

const i18nProvider = {
  getI18nProvider,
  getSupportedLanguages,
  loadResourceBundles,
};

export default i18nProvider;
