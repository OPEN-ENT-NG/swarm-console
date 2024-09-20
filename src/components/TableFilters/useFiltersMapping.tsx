import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import { useTranslation } from "react-i18next";

import { FiltersIcon } from "../SVG/FiltersIcon";
import { PrestashopIcon } from "../SVG/PrestashopIcon";
import { ServicesIcon } from "../SVG/ServicesIcon";
import { WordPressIcon } from "../SVG/WordPressIcon";
import { ItemState, SUBFILTERS_STATE } from "./types";
import { filtersOpen, servicesOpen } from "./utils";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export const useFiltersMapping = () => {
  const { t } = useTranslation();

  const buttonsMapping = [
    {
      icon: <FiltersIcon />,
      label: t("swarm.button.filters"),
      method: filtersOpen,
      state: "isFiltersOpen" as ItemState,
    },
    {
      icon: <ServicesIcon />,
      label: t("swarm.table.column.services"),
      method: servicesOpen,
      state: "isServicesOpen" as ItemState,
    },
  ];

  const filtersOptions = [
    {
      icon: <HomeIcon />,
      label: t("swarm.button.etabs"),
      sub: SUBFILTERS_STATE.STRUCTURES,
    },
    {
      icon: <SchoolIcon />,
      label: t("swarm.button.classes"),
      sub: SUBFILTERS_STATE.CLASSES,
    },
  ];

  const servicesOptions = [
    { label: t("swarm.wordpress.title"), icon: <WordPressIcon />, state: SERVICE_TYPE.WORDPRESS },
    { label: t("swarm.prestashop.title"), icon: <PrestashopIcon />, state: SERVICE_TYPE.PRESTASHOP },
  ];

  return { buttonsMapping, filtersOptions, servicesOptions };
};
