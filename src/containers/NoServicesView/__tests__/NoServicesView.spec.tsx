import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";

import { EmptyState } from "@/components/EmptyState";
import { EmptyStateIcon } from "@/components/SVG/EmptyStateIcon";
import { renderWithProviders } from "@/test/testUtils";

import { NoServicesView } from "..";

jest.mock("@/components/EmptyState", () => ({
  EmptyState: jest.fn(() => <div data-testid="mock-empty-state" />),
}));

jest.mock("@/components/SVG/EmptyStateIcon", () => ({
  EmptyStateIcon: jest.fn(),
}));

describe("NoServicesView Component", () => {
  it("renders correctly", () => {
    renderWithProviders(<NoServicesView />);
    expect(screen.getByTestId("no-services-view-wrapper")).toBeInTheDocument();
    expect(EmptyState).toHaveBeenCalledWith(
      {
        imageOrSVG: { component: EmptyStateIcon },
        text: "swarm.empty.services",
      },
      expect.anything(),
    );
    const button = screen.getByTestId("create-services-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("swarm.create.service");
  });
});
