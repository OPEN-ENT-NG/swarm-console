import { render } from "@testing-library/react";
import { PropsWithChildren } from "react";

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
