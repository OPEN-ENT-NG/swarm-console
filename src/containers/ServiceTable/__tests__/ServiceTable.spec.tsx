import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { itemRowsMock } from "@/test/mocks/itemRowsMock";
import { renderWithProviders } from "@/test/testUtils";

import { ServiceTable } from "..";

describe("ServiceTable Component", () => {
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

  it("renders the table with correct headers", async () => {
    renderWithProviders(<ServiceTable />);

    await waitFor(() => {
      expect(screen.getByText("swarm.table.column.name")).toBeInTheDocument();
      expect(screen.getByText("swarm.table.column.class")).toBeInTheDocument();
      expect(screen.getByText("swarm.table.column.etab")).toBeInTheDocument();
      expect(screen.getByText("swarm.table.column.services")).toBeInTheDocument();
      expect(screen.getByText("swarm.table.column.status")).toBeInTheDocument();
      expect(screen.getByText("swarm.table.column.supressDate")).toBeInTheDocument();
    });
  });

  it("selects all rows when header checkbox is clicked", async () => {
    renderWithProviders(<ServiceTable />);

    const headerCheckbox = await screen.findByRole("checkbox", { name: "select all services" });
    fireEvent.click(headerCheckbox);

    await waitFor(() => {
      const rowCheckboxes = screen.getAllByRole("checkbox").slice(1);
      rowCheckboxes.forEach(checkbox => expect(checkbox).toBeChecked());
    });
  });

  it("renders suppression dates correctly", async () => {
    renderWithProviders(<ServiceTable />);

    await waitFor(() => {
      itemRowsMock.forEach(item => {
        item.services.forEach(service => {
          if (service.supressDate) {
            const dateCell = screen.getByText(service.supressDate);
            expect(dateCell).toBeInTheDocument();
          }
        });
      });
    });
  });

  it("renders user names correctly", async () => {
    renderWithProviders(<ServiceTable />);

    await waitFor(() => {
      itemRowsMock.forEach(item => {
        const nameCell = screen.getByText(`${item.lastName} ${item.firstName}`);
        expect(nameCell).toBeInTheDocument();
      });
    });
  });
});
