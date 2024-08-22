import { screen, waitFor } from "@testing-library/react";
import React from "react";

import { renderWithTheme } from "@/test/testUtils";

import { Title } from "..";

describe("Title Component", () => {
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
  it("renders the text correctly", async () => {
    renderWithTheme(<Title text="Hello World" />);
    await waitFor(() => {
      const titleElement = screen.getByText("Hello World");
      expect(titleElement).toBeTruthy();
    });
  });

  it('applies "start" placement by default', async () => {
    renderWithTheme(<Title text="Default Placement" />);
    await waitFor(() => {
      const wrapper = screen.getByTestId("title-wrapper");
      const computedStyle = window.getComputedStyle(wrapper);
      expect(computedStyle.justifyContent).toBe("flex-start");
    });
  });

  it('applies "center" placement correctly', async () => {
    renderWithTheme(<Title text="Centered Title" placement="center" />);
    await waitFor(() => {
      const wrapper = screen.getByTestId("title-wrapper");
      const computedStyle = window.getComputedStyle(wrapper);
      expect(computedStyle.justifyContent).toBe("center");
    });
  });

  it('applies "end" placement correctly', async () => {
    renderWithTheme(<Title text="End Title" placement="end" />);
    await waitFor(() => {
      const wrapper = screen.getByTestId("title-wrapper");
      const computedStyle = window.getComputedStyle(wrapper);
      expect(computedStyle.justifyContent).toBe("flex-end");
    });
  });

  it("wraps the text in a span", async () => {
    renderWithTheme(<Title text="Span Test" />);
    await waitFor(() => {
      const span = screen.getByText("Span Test");
      expect(span.tagName).toBe("H1");
    });
  });
});
