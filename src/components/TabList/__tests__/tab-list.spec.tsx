import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { TabList } from "@/components/TabList";

import { tabs } from "./mocks/tabs";

const tabsData: string[] = ["Tableau des sites", "Statistiques", "Paramètres"];

describe("TabList component", () => {
  it("renders without crashing", () => {
    render(<TabList />);
    const component = screen.getByTestId("tab-list-component");
    expect(component).toBeInTheDocument();
  });

  it("renders 2 tabs", () => {
    render(<TabList />);
    expect(tabs).toHaveLength(tabsData.length);
    tabs.map(tab => {
      const currentTab = screen.getByTestId(`tab-${tab}`);
      expect(currentTab).toBeInTheDocument();
    });
  });
});
