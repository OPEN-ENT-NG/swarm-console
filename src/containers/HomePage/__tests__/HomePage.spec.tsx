import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import React from "react";

// import { SERVICE_STATUS, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { api } from "@/services/api";
import { store } from "@/stores/store";
import { createHandlers } from "@/test/handlers";
import { renderWithProviders } from "@/test/testUtils";

import { HomePage } from "..";

jest.mock("@/containers/MainView", () => ({
  MainView: () => <div data-testid="main-view">Main View</div>,
}));
jest.mock("@/containers/NoServicesView", () => ({
  NoServicesView: () => <div data-testid="no-services-view">No Services View</div>,
}));

describe("HomePage Component", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  // it("display MainView when services", async () => {
  //   server.use(
  //     ...createHandlers({
  //       services: [
  //         {
  //           type: SERVICE_TYPE.PRESTASHOP,
  //           status: SERVICE_STATUS.ACTIVE,
  //           id: 1,
  //           userId: "USER1001",
  //           url: "https://boutiquemarie.com",
  //           supressDate: "2025-12-31",
  //         },
  //       ],
  //     }),
  //   );
  //   renderWithProviders(<HomePage />);
  //   await waitFor(() => {
  //     expect(screen.getByTestId("main-view")).toBeInTheDocument();
  //     expect(screen.queryByTestId("no-services-view")).not.toBeInTheDocument();
  //   });
  // });

  it("display NoServicesView when no services", async () => {
    server.use(
      ...createHandlers({
        services: [],
      }),
    );
    store.dispatch(api.util.invalidateTags(["Services"]));
    renderWithProviders(<HomePage />);
    await waitFor(() => {
      expect(screen.getByTestId("no-services-view")).toBeInTheDocument();
      expect(screen.queryByTestId("main-view")).not.toBeInTheDocument();
    });
  });
});
