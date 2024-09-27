import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { UpdateServicesModal } from "..";

describe("UpdateServicesModal Component", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-02-07T00:00:01.123Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByTestId("update-services-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(<UpdateServicesModal isOpen={false} handleClose={mockHandleClose} />);
    expect(screen.queryByTestId("update-services-modal")).not.toBeInTheDocument();
  });

  it("calls handleClose when close button is clicked", () => {
    renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const closeButton = screen.getByTestId("close-update-services-modal");
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  // it("updates date when date picker is changed", async () => {
  //   renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const datePicker = screen.getAllByPlaceholderText("--/--/----")[0];
  //   fireEvent.change(datePicker, { target: { value: "15/05/2025" } });
  //   await waitFor(() => {
  //     expect(datePicker).toHaveValue("15/05/2025");
  //   });
  // });

  // it("Disable the submit button when no dates are selected and enable it when at least one date is selected", async () => {
  //   renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={jest.fn()} />);
  //   const submitButton = screen.getByTestId("create-services-submit");
  //   const datePicker = screen.getAllByPlaceholderText("--/--/----")[0];

  //   expect(submitButton).toBeDisabled();

  //   fireEvent.change(datePicker, { target: { value: "15/05/2025" } });
  //   await waitFor(() => {
  //     expect(submitButton).toBeEnabled();
  //   });

  //   fireEvent.change(datePicker, { target: { value: "" } });
  //   await waitFor(() => {
  //     expect(submitButton).toBeDisabled();
  //   });
  // });

  // it("resets input on cancel", async () => {
  //   renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={mockHandleClose} />);
  //   const cancelButton = screen.getByTestId("create-services-cancel");
  //   const datePicker = screen.getAllByPlaceholderText("--/--/----")[0];

  //   fireEvent.change(datePicker, { target: { value: "15/05/2025" } });
  //   await waitFor(() => {
  //     expect(datePicker).toHaveValue("15/05/2025");
  //   });

  //   fireEvent.click(cancelButton);

  //   await waitFor(() => {
  //     expect(datePicker).toHaveValue("");
  //   });
  //   expect(mockHandleClose).toHaveBeenCalled();
  // });

  it("displays correct number of selected users", () => {
    renderWithProviders(<UpdateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByText("swarm.modal.users.selected")).toBeInTheDocument();
  });
});
