import { useTranslation } from "react-i18next";

import { Session } from "@/types";

import { COLUMN_ID, CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_STATE_DISPLAY, SERVICE_STATUS } from "./enums";
import { DisplayModalsState, TableQueryParamsState } from "./types";

export const initialDisplayModalsState: DisplayModalsState = {
  [MODAL_TYPE.CREATE]: false,
  [MODAL_TYPE.DELETE]: false,
  [MODAL_TYPE.CONFIRMATION]: false,
  [MODAL_TYPE.SEND]: false,
  [MODAL_TYPE.TOGGLE_STATUS]: false,
  [MODAL_TYPE.REINIT]: false,
  [MODAL_TYPE.UPDATE]: false,
};

export const initialCurrentTab: (pathname: string) => CURRENTTAB_STATE = pathname =>
  pathname === "/stats" ? CURRENTTAB_STATE.STATS : CURRENTTAB_STATE.MAIN;

export const initialTableQueryParamsState: TableQueryParamsState = {
  query: "",
  page: 0,
  limit: 10,
  orderBy: COLUMN_ID.NAME,
  order: ORDER_TYPE.DESC,
  type: [],
};

export const prepareUser = (session: Session) => {
  const {
    user: { name, email, image },
    token,
  } = session;
  return { name, email, image: image ?? "", token };
};

export const useTabs = () => {
  const { t } = useTranslation();
  return [
    { tabValue: CURRENTTAB_STATE.MAIN, label: t("swarm.tab.main") },
    { tabValue: CURRENTTAB_STATE.STATS, label: t("swarm.tab.stats") },
  ];
};

export const getServiceStateDisplay = (status: SERVICE_STATUS): SERVICE_STATE_DISPLAY => {
  switch (status) {
    case SERVICE_STATUS.DEPLOYED:
      return SERVICE_STATE_DISPLAY.ACTIVE;

    case SERVICE_STATUS.SCHEDULED:
    case SERVICE_STATUS.IN_PROGRESS:
    case SERVICE_STATUS.RESET_SCHEDULED:
    case SERVICE_STATUS.RESET_IN_PROGRESS:
    case SERVICE_STATUS.REACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.WAITING;

    case SERVICE_STATUS.DELETION_SCHEDULED:
    case SERVICE_STATUS.DELETION_IN_PROGRESS:
    case SERVICE_STATUS.DEACTIVATION_SCHEDULED:
    case SERVICE_STATUS.DISABLED:
      return SERVICE_STATE_DISPLAY.INACTIVE;

    default:
      return SERVICE_STATE_DISPLAY.INACTIVE;
  }
};
