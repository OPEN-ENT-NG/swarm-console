import "@testing-library/jest-dom";
import React from "react";

import { ServiceStat } from "@/providers/GlobalProvider/types";

jest.mock("@/components/ServiceStatCard", () => ({
  ServiceStatCard: ({ serviceStatItem }: { serviceStatItem: ServiceStat }) => (
    <div data-testid={`stat-card-${serviceStatItem.type}`}>Mocked ServiceStatCard for {serviceStatItem.type}</div>
  ),
}));

describe("StatsView Component", () => {
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

  it("renders all ServiceStatCards correctly", async () => {
    // renderWithProviders(<StatsView />);
    // await waitFor(() => {
    //   expect(screen.getByTestId("stat-card-PRESTASHOP")).toBeInTheDocument();
    //   expect(screen.getByTestId("stat-card-WORDPRESS")).toBeInTheDocument();
    // });
    // expect(screen.getByText("Mocked ServiceStatCard for PRESTASHOP")).toBeInTheDocument();
    // expect(screen.getByText("Mocked ServiceStatCard for WORDPRESS")).toBeInTheDocument();
  });
});
