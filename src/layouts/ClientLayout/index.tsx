"use client";

import { Loader } from "@cgi-learning-hub/ui";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import theme from "@/core/style/theme";
import { getI18nProvider } from "@/i18n";
import "@/i18n/client";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { setToken, store } from "@/stores/store";

import "../../core/style/globals.css";
import * as ST from "./style";
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
    return (
      <ST.ClientLayoutWrapper>
        <ST.LoaderWrapper>
          <Loader />
        </ST.LoaderWrapper>
      </ST.ClientLayoutWrapper>
    );
  }

  return (
    <I18nextProvider i18n={getI18nProvider()} defaultNS="swarm">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ST.ClientLayoutWrapper>
            <GlobalProvider session={session}>{children}</GlobalProvider>
          </ST.ClientLayoutWrapper>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};
