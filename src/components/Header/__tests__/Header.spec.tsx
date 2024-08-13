import { screen } from "@testing-library/react";
import React from "react";

import { SVGComponent } from "@/components/SVG/types";
import { IMAGE_NOUVELLE_AQUITAINE } from "@/core/const";
import { renderWithTheme } from "@/test/testUtils";

import { Header } from "..";

const MockSVG: SVGComponent = ({ fill = "black" }) => (
  <svg data-testid="mock-svg" fill={fill}>
    <rect width="100" height="100" />
  </svg>
);

describe("Header Component", () => {
  it("renders only images correctly", () => {
    const items = [IMAGE_NOUVELLE_AQUITAINE, IMAGE_NOUVELLE_AQUITAINE];
    renderWithTheme(<Header items={items} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0].getAttribute("src")).toBe(items[0]);
    expect(images[1].getAttribute("src")).toBe(items[1]);
  });

  it("renders only SVG components correctly", () => {
    const items = [
      { component: MockSVG, props: { fill: "red" } },
      { component: MockSVG, props: { fill: "blue" } },
    ];
    renderWithTheme(<Header items={items} />);

    const svgs = screen.getAllByTestId("mock-svg");
    expect(svgs).toHaveLength(2);
    expect(svgs[0].getAttribute("fill")).toBe("red");
    expect(svgs[1].getAttribute("fill")).toBe("blue");
  });

  it("renders a mix of images and SVG components correctly", () => {
    const items = [IMAGE_NOUVELLE_AQUITAINE, { component: MockSVG, props: { fill: "green" } }];
    renderWithTheme(<Header items={items} />);

    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toBe(items[0]);

    const svg = screen.getByTestId("mock-svg");
    expect(svg.getAttribute("fill")).toBe("green");
  });
});
