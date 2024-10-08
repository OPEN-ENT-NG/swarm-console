import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { DeleteServicesModal } from "..";

describe("DeleteServicesModal Component", () => {
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
    renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByTestId("delete-services-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(<DeleteServicesModal isOpen={false} handleClose={mockHandleClose} />);
    expect(screen.queryByTestId("delete-services-modal")).not.toBeInTheDocument();
  });

  it("calls handleClose when close button is clicked", () => {
    renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const closeButton = screen.getByTestId("close-delete-services-modal");
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  // it("updates checkbox state when clicked", async () => {
  //   renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const wordpressCheckbox = screen.getByTestId("WORDPRESS");
  //   fireEvent.click(wordpressCheckbox);
  //   await waitFor(() => {
  //     expect(wordpressCheckbox.querySelector("input")).toBeChecked();
  //   });
  // });

  it("disables the delete button when no service is selected", () => {
    renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const deleteButton = screen.getByText("swarm.button.delete");
    expect(deleteButton).toBeDisabled();
  });

  // it("enables the delete button when at least one service is selected", async () => {
  //   renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const wordpressCheckbox = screen.getByTestId("WORDPRESS");
  //   const deleteButton = screen.getByText("swarm.button.delete");

  //   expect(deleteButton).toBeDisabled();

  //   fireEvent.click(wordpressCheckbox);

  //   await waitFor(() => {
  //     expect(deleteButton).toBeEnabled();
  //   });
  // });

  // it("resets input on cancel", async () => {
  //   renderWithProviders(<DeleteServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const cancelButton = screen.getByText("swarm.cancel");
  //   const wordpressCheckbox = screen.getByTestId("WORDPRESS");

  //   fireEvent.click(wordpressCheckbox);
  //   await waitFor(() => {
  //     expect(wordpressCheckbox.querySelector("input")).toBeChecked();
  //   });

  //   fireEvent.click(cancelButton);

  //   await waitFor(() => {
  //     expect(wordpressCheckbox.querySelector("input")).not.toBeChecked();
  //   });
  //   expect(mockHandleClose).toHaveBeenCalled();
  // });
});
