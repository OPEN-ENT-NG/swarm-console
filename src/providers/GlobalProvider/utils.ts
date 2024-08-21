import { useTranslation } from "react-i18next";

import { Session } from "@/types";

import { COLUMN_ID, CURRENTTAB_STATE, DisplayModalsState, SORT, TableQueryParamsState } from "./types";

export const initialDisplayModalsState: DisplayModalsState = {
  createServices: false,
};

export const initialCurrentTab: CURRENTTAB_STATE = CURRENTTAB_STATE.MAIN;

export const initialTableQueryParamsState: TableQueryParamsState = {
  page: 0,
  rowsPerPage: 10,
  orderBy: COLUMN_ID.NAME,
  order: SORT.DESC,
};

export const prepareUser = (session: Session) => {
  const {
    user: { name, email, image },
    token,
  } = session;
  return { name, email, image: image || "", token };
};

export const useTabs = () => {
  const { t } = useTranslation();
  return [
    { tabValue: CURRENTTAB_STATE.MAIN, label: t("swarm.tab.main") },
    { tabValue: CURRENTTAB_STATE.STATS, label: t("swarm.tab.stats") },
  ];
};
