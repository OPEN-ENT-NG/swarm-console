"use client";

import { Loader } from "@cgi-learning-hub/ui";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { FC, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "@/core/style/theme";
import { getI18nProvider } from "@/i18n";
import "@/i18n/client";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { setToken, store } from "@/stores/store";

import "../../core/style/globals.css";
import { ClientLayoutWrapper, LoaderWrapper } from "./style";
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
      <ClientLayoutWrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </ClientLayoutWrapper>
    );
  }

  return (
    <I18nextProvider i18n={getI18nProvider()} defaultNS="swarm">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <ClientLayoutWrapper>
              <GlobalProvider session={session}>{children}</GlobalProvider>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </ClientLayoutWrapper>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};
