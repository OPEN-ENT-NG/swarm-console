import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import React from "react";

import { SVGComponent } from "@/components/SVG/types";
import { IMAGE_FLAG_OF_EUROPE } from "@/core/const";
import { renderWithTheme } from "@/test/testUtils";

import { EmptyState } from "..";

const MockSVG: SVGComponent = ({ fill = "black" }) => (
  <svg data-testid="mock-svg" fill={fill}>
    <rect width="100" height="100" />
  </svg>
);

describe("EmptyState Component", () => {
  it("renders correctly with string SVG", () => {
    const testImg = IMAGE_FLAG_OF_EUROPE;
    const testText = "Test Empty State";
    renderWithTheme(<EmptyState imageOrSVG={testImg} text={testText} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toBe(testImg);

    const text = screen.getByText(testText);
    expect(text).toBeInTheDocument();
  });

  it("renders correctly with SVG component", () => {
    const testSVG = { component: MockSVG, props: { fill: "red" } };
    const testText = "Test Empty State";
    renderWithTheme(<EmptyState imageOrSVG={testSVG} text={testText} />);
    const svg = screen.getByTestId("mock-svg");
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("fill")).toBe("red");

    const text = screen.getByText(testText);
    expect(text).toBeInTheDocument();
  });
});
