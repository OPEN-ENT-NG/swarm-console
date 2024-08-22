import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { ConfirmationModal } from "..";

describe("ConfirmationModal Component", () => {
  const mockHandleClose = jest.fn();
  const mockHandleConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={true} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={false} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    expect(screen.queryByTestId("confirmation-modal")).not.toBeInTheDocument();
  });

  it("displays the default label when no label is provided", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={true} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    expect(screen.getByText("swarm.confirmation.modal.default")).toBeInTheDocument();
  });

  it("displays the custom label when provided", () => {
    const customLabel = "Custom confirmation message";
    renderWithProviders(
      <ConfirmationModal
        isOpen={true}
        handleClose={mockHandleClose}
        handleConfirm={mockHandleConfirm}
        label={customLabel}
      />,
    );
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });

  it("calls handleClose when cancel button is clicked", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={true} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    const cancelButton = screen.getByTestId("confirmation-cancel");
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("calls handleConfirm and handleClose when confirm button is clicked", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={true} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    const confirmButton = screen.getByTestId("confirmation-submit");
    fireEvent.click(confirmButton);
    expect(mockHandleConfirm).toHaveBeenCalled();
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("displays the correct button labels", () => {
    renderWithProviders(
      <ConfirmationModal isOpen={true} handleClose={mockHandleClose} handleConfirm={mockHandleConfirm} />,
    );
    expect(screen.getByText("swarm.cancel")).toBeInTheDocument();
    expect(screen.getByText("swarm.button.delete")).toBeInTheDocument();
  });
});
