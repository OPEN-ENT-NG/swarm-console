import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { ReinitServicesModal } from "..";

describe("ReinitServicesModal Component", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-02-07T00:00:01.123Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the modal when isOpen is true", () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByTestId("reinit-services-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(<ReinitServicesModal isOpen={false} handleClose={mockHandleClose} />);
    expect(screen.queryByTestId("reinit-services-modal")).not.toBeInTheDocument();
  });

  it("calls handleClose when close button is clicked", () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const closeButton = screen.getByTestId("close-reinit-services-modal");
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("updates checkbox state when clicked", async () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const wordpressCheckbox = screen.getByTestId("WORDPRESS");
    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });
  });

  it("updates date when date picker is changed", async () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const datePicker = screen.getByPlaceholderText("--/--/----");
    fireEvent.change(datePicker, { target: { value: "15/05/2023" } });
    await waitFor(() => {
      expect(datePicker).toHaveValue("15/05/2023");
    });
  });

  it("Disable the submit button when the conditions are not met and enable it when they are", async () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={jest.fn()} />);
    const submitButton = screen.getByTestId("create-services-submit");
    const wordpressCheckbox = screen.getByTestId("WORDPRESS");
    const datePicker = screen.getByPlaceholderText("--/--/----");

    expect(submitButton).toBeDisabled();

    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });
    expect(submitButton).toBeDisabled();

    fireEvent.change(datePicker, { target: { value: "15/05/2030" } });
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).not.toBeChecked();
    });
    expect(submitButton).toBeDisabled();
  });

  it("resets input on cancel", async () => {
    renderWithProviders(<ReinitServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const cancelButton = screen.getByTestId("create-services-cancel");
    const wordpressCheckbox = screen.getByTestId("WORDPRESS");

    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).not.toBeChecked();
    });
  });
});
