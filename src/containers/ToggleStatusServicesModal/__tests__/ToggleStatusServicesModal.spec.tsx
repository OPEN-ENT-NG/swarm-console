import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { ToggleStatusServicesModal } from "..";

describe("ToggleStatusServicesModal Component", () => {
  const mockHandleClose = jest.fn();
  jest.useFakeTimers({
    now: new Date("2024-02-07T00:00:01.123Z"),
  });
  const start = performance.now();

  jest.advanceTimersByTime(1234.5678);
  const end = performance.now();

  expect(end - start).toBe(1234.5678);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the modal when isOpen is true", () => {
    renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByTestId("toggle-status-services-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(<ToggleStatusServicesModal isOpen={false} handleClose={mockHandleClose} />);
    expect(screen.queryByTestId("toggle-status-services-modal")).not.toBeInTheDocument();
  });

  it("calls handleClose when close button is clicked", () => {
    renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const closeButton = screen.getByTestId("close-toggle-status-services-modal");
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  // it("updates switch state when clicked", async () => {
  //   renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const wordpressSwitch = screen.getByTestId("WORDPRESS");
  //   const switchInput = wordpressSwitch.querySelector('input[type="checkbox"]');
  //   expect(switchInput).not.toBeChecked();
  //   fireEvent.click(wordpressSwitch);
  //   await waitFor(() => {
  //     expect(switchInput).toBeChecked();
  //   });
  // });

  // it("disables the activate button when no service is selected", () => {
  //   renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const activateButton = screen.getByText("swarm.button.activate");
  //   expect(activateButton).toBeDisabled();
  // });

  // it("enables the activate button when at least one service is selected", async () => {
  //   renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const wordpressSwitch = screen.getByTestId("WORDPRESS");
  //   const activateButton = screen.getByText("swarm.button.activate");

  //   expect(activateButton).toBeDisabled();

  //   fireEvent.click(wordpressSwitch);

  //   await waitFor(() => {
  //     expect(activateButton).toBeEnabled();
  //   });
  // });

  // it("resets input on cancel", async () => {
  //   renderWithProviders(<ToggleStatusServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const cancelButton = screen.getByText("swarm.cancel");
  //   const wordpressSwitch = screen.getByTestId("WORDPRESS");
  //   const switchInput = wordpressSwitch.querySelector('input[type="checkbox"]');

  //   fireEvent.click(wordpressSwitch);
  //   await waitFor(() => {
  //     expect(switchInput).toBeChecked();
  //   });

  //   fireEvent.click(cancelButton);

  //   await waitFor(() => {
  //     expect(switchInput).not.toBeChecked();
  //   });
  //   expect(mockHandleClose).toHaveBeenCalled();
  // });
});
