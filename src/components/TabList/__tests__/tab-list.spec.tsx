import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { TabList } from "@/components/TabList";
import { renderWithProviders } from "@/test/testUtils";

// const tabsData: string[] = ["Tableau des sites", "Statistiques"];

describe("TabList component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<TabList />);
    const component = screen.getByTestId("tab-list-component");
    expect(component).toBeInTheDocument();
  });

  // it("renders 2 tabs", () => {
  //   renderWithProviders(<TabList />);
  //   expect(tabs).toHaveLength(tabsData.length);
  //   tabs.map(tab => {
  //     const currentTab = screen.getByTestId(`tab-${tab.tabValue}`);
  //     expect(currentTab).toBeInTheDocument();
  //   });
  // });
});
