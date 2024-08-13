import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { PropsWithChildren } from "react";

import theme from "@/core/style/theme";
import { ClientLayout } from "@/layouts/ClientLayout";

export const renderWithProviders = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    const session = {
      user: { name: "", email: "", image: undefined },
      token: "coucou",
    };
    return <ClientLayout session={session}>{children}</ClientLayout>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithTheme = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
