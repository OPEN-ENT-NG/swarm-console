import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { CreateServicesModal } from "..";

describe("CreateServicesModal Component", () => {
  const mockHandleClose = jest.fn();
  jest.useFakeTimers({
    now: new Date("2024-02-07T00:00:01.123Z"),
  });
  const start = performance.now();

  jest.advanceTimersByTime(1234.5678);
  const end = performance.now();

  expect(end - start).toBe(1234.5678);
  it("renders the modal when isOpen is true", () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    expect(screen.getByTestId("create-services-modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    renderWithProviders(<CreateServicesModal isOpen={false} handleClose={mockHandleClose} />);
    expect(screen.queryByTestId("create-services-modal")).not.toBeInTheDocument();
  });

  it("calls handleClose when close button is clicked", () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const closeButton = screen.getByTestId("close-create-services-modal");
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("updates checkbox state when clicked", async () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const wordpressCheckbox = screen.getByTestId("wordpress");
    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });
  });

  it("updates date when date picker is changed", async () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const datePicker = screen.getByPlaceholderText("--/--/----");
    fireEvent.change(datePicker, { target: { value: "15/05/2023" } });
    await waitFor(() => {
      expect(datePicker).toHaveValue("15/05/2023");
    });
  });

  it("resets input on submit", async () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const submitButton = screen.getByText("swarm.create");
    const wordpressCheckbox = screen.getByTestId("wordpress");

    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).not.toBeChecked();
    });
  });

  it("resets input on cancel", async () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const cancelButton = screen.getByText("swarm.cancel");
    const wordpressCheckbox = screen.getByTestId("wordpress");

    fireEvent.click(wordpressCheckbox);
    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).toBeChecked();
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(wordpressCheckbox.querySelector("input")).not.toBeChecked();
    });
  });

  it("updates user selection when a user is selected", async () => {
    renderWithProviders(<CreateServicesModal isOpen={true} handleClose={mockHandleClose} />);
    const userInput = screen.getByPlaceholderText("swarm.create.service.modal.search.input.placeHolder");
    fireEvent.change(userInput, { target: { value: "John" } });
    const userOption = await screen.findByText("John Doe");
    fireEvent.click(userOption);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});