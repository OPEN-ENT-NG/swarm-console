"use client";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent } from "react";

import { useGlobalProvider } from "@/providers/GlobalProvider";
import { CURRENTTAB_STATE } from "@/providers/GlobalProvider/enums";

import { StyledTab } from "./style";
import { useTabs } from "./utils";

export const TabList: FC = () => {
  const { currentTab, setCurrentTab } = useGlobalProvider();

  const handleChange = (event: SyntheticEvent, newValue: CURRENTTAB_STATE) => {
    setCurrentTab(newValue);
  };

  const tabs = useTabs();

  return (
    <Box data-testid="tab-list-component">
      <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
        {tabs.map(item => (
          <StyledTab
            key={item.tabValue}
            label={item.label}
            value={item.tabValue}
            data-testid={`tab-${item.tabValue}`}
          />
        ))}
      </Tabs>
    </Box>
  );
};
