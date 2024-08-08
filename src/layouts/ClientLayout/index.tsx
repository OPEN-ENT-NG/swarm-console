"use client";

import { FC, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { getI18nProvider } from "@/i18n";
import "@/i18n/client";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { setToken, store } from "@/stores/store";

import { ClientLayoutProps } from "./types";

export const ClientLayout: FC<ClientLayoutProps> = ({ session, children }) => {
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (session?.token) {
      store.dispatch(setToken(session.token));
      setIsTokenSet(true);
    }
  }, [session]);

  if (!isTokenSet) {
    return <div>Chargement...</div>;
  }

  return (
    <I18nextProvider i18n={getI18nProvider()} defaultNS="swarm">
      <Provider store={store}>
        <GlobalProvider session={session}>{children}</GlobalProvider>
      </Provider>
    </I18nextProvider>
  );
};
