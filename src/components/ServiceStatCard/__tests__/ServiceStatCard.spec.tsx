import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import React from "react";

import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { renderWithProviders } from "@/test/testUtils";

import { ServiceStatCard } from "..";

jest.mock("../utils", () => ({
  usePrepareStatTitle: (type: SERVICE_TYPE) => `Prepared ${type}`,
}));

describe("ServiceStatCard Component", () => {
  const mockServiceStatItem = {
    type: SERVICE_TYPE.PRESTASHOP,
    icon: () => <svg data-testid="mock-icon" />,
    total: 100,
    active: 80,
    inactive: 20,
    toDelete: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.useFakeTimers({
    now: new Date("2024-02-07T00:00:01.123Z"),
  });
  const start = performance.now();

  jest.advanceTimersByTime(1234.5678);
  const end = performance.now();

  expect(end - start).toBe(1234.5678);

  it("renders correctly with provided props", async () => {
    renderWithProviders(<ServiceStatCard serviceStatItem={mockServiceStatItem} />);

    await waitFor(() => {
      expect(screen.getByText("Prepared prestashop")).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(screen.getByText("swarm.stats.total")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("swarm.stats.active")).toBeInTheDocument();
      expect(screen.getByText("80")).toBeInTheDocument();
      expect(screen.getByText("swarm.stats.inactive")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("swarm.stats.delete")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("has the correct test id", async () => {
    renderWithProviders(<ServiceStatCard serviceStatItem={mockServiceStatItem} />);
    await waitFor(() => {
      expect(screen.getByTestId("stat-card-prestashop")).toBeInTheDocument();
    });
  });

  it("displays the delete description", async () => {
    renderWithProviders(<ServiceStatCard serviceStatItem={mockServiceStatItem} />);
    await waitFor(() => {
      expect(screen.getByText("swarm.stats.delete.desc")).toBeInTheDocument();
    });
  });
});
