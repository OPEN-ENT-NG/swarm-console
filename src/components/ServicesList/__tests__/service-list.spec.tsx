import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";

import { ServiceList } from "@/components/ServicesList";
import { createHandlers } from "@/test/handlers";
import { renderWithProviders } from "@/test/testUtils";

import { servicesMock } from "../../../test/mocks/datasMock";

const server = setupServer(...createHandlers());

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("ServiceList component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<ServiceList />);
    const component = screen.getByTestId("service-list-component");
    expect(component).toBeInTheDocument();
  });

  it("renders services from mocked API", async () => {
    renderWithProviders(<ServiceList />);
    await screen.findByTestId("service-list-component");
    await waitFor(() => {
      servicesMock.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });
});
