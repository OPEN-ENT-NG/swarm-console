import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { render } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import theme from "@/core/style/theme";
import { getI18nProvider } from "@/i18n";
import { ClientLayout } from "@/layouts/ClientLayout";

export const renderWithProviders = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    const session = {
      user: { name: "", email: "", image: undefined },
      token: "coucou",
      isManager: true,
    };
    return <ClientLayout session={session}>{children}</ClientLayout>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithTheme = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return (
      <I18nextProvider i18n={getI18nProvider()} defaultNS="swarm">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
        </ThemeProvider>
      </I18nextProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
