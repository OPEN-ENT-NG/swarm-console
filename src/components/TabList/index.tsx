"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { FC, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const TabList: FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const tabs = ["Tableau des sites", "Statistiques", "Paramètres"];
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box data-testid="tab-list-component" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <div>{t("title")}</div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {tabs?.map(label => <Tab key={label} label={label} data-testid={`tab-${label}`} />)}
      </Tabs>
    </Box>
  );
};
