import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";

import { renderWithProviders } from "@/test/testUtils";

import { CustomDatePicker } from "..";
import { datePickerStyles } from "../style";

jest.mock("@/components/SVG/DatePickerIcon", () => ({
  DatePickerIcon: () => <svg data-testid="date-picker-icon" />,
}));

describe("CustomDatePicker Component", () => {
  it("renders the DatePicker component", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText("--/--/----")).toBeInTheDocument();
  });

  // it("displays the correct date format", () => {
  //   const date = dayjs("2023-05-15");
  //   renderWithProviders(<CustomDatePicker value={date} onChange={jest.fn()} />);
  //   expect(screen.getByDisplayValue("15/05/2023")).toBeInTheDocument();
  // });

  // it("calls onChange when a date is selected", () => {
  //   const onChange = jest.fn();
  //   renderWithProviders(<CustomDatePicker value={null} onChange={onChange} />);

  //   const input = screen.getByPlaceholderText("--/--/----");
  //   fireEvent.change(input, { target: { value: "16/05/2023" } });

  //   expect(onChange).toHaveBeenCalled();
  // });

  it("renders the custom DatePickerIcon", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    const icon = screen.getByTestId("date-picker-icon");
    expect(icon).toBeInTheDocument();
  });

  it("applies custom styles to the input", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    const inputWrapper = screen.getByPlaceholderText("--/--/----").closest(".MuiInputBase-root");
    expect(inputWrapper).toHaveStyle("background-color: transparent");
  });

  it("applies custom styles to the input text", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText("--/--/----");
    expect(window.getComputedStyle(input).letterSpacing).toBe(datePickerStyles.inputProps.sx.letterSpacing);
    expect(window.getComputedStyle(input).textAlign).toBe(datePickerStyles.inputProps.sx.textAlign);
    expect(window.getComputedStyle(input).fontWeight).toBe("700");
    expect(window.getComputedStyle(input).color).toBe(datePickerStyles.inputProps.sx.color);
  });

  it("applies custom props to the open picker button", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiIconButton-colorPrimary");
  });

  it("applies correct variant to the text field", () => {
    renderWithProviders(<CustomDatePicker value={null} onChange={jest.fn()} />);
    const textField = screen.getByPlaceholderText("--/--/----").closest(".MuiFormControl-root");
    expect(textField).toHaveClass("MuiTextField-root");
    const input = screen.getByPlaceholderText("--/--/----");
    expect(input).toHaveClass("MuiFilledInput-input");
  });
});
