"use client";

import { ThemeProvider } from "@mui/material";
import "dayjs/locale/fr";
import { FC } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ErrorLayoutContainer } from "@/containers/ErrorLayoutContainer";
import theme from "@/core/style/theme";
import { getI18nProvider } from "@/i18n";
import "@/i18n/client";
import { store } from "@/stores/store";

import "../../core/style/globals.css";
import { ErrorLayoutProps } from "./types";

export const ErrorLayout: FC<ErrorLayoutProps> = ({ errorType }) => {
  return (
    <I18nextProvider i18n={getI18nProvider()} defaultNS="swarm">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ErrorLayoutContainer errorType={errorType}></ErrorLayoutContainer>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};
