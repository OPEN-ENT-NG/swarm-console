import { useTranslation } from "react-i18next";

import { Session } from "@/types";

import { CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_STATE, SERVICE_STATE_DISPLAY } from "./enums";
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
  search: "",
  page: 0,
  limit: 10,
  order: ORDER_TYPE.DESC,
  types: [],
  structures: [],
  classes: [],
  groups: [],
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

export const getServiceStateDisplay = (status: SERVICE_STATE): SERVICE_STATE_DISPLAY => {
  switch (status) {
    case SERVICE_STATE.DEPLOYED:
      return SERVICE_STATE_DISPLAY.ACTIVE;

    case SERVICE_STATE.SCHEDULED:
    case SERVICE_STATE.IN_PROGRESS:
    case SERVICE_STATE.RESET_SCHEDULED:
    case SERVICE_STATE.RESET_IN_PROGRESS:
    case SERVICE_STATE.REACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.WAITING;

    case SERVICE_STATE.DELETION_SCHEDULED:
    case SERVICE_STATE.DELETION_IN_PROGRESS:
    case SERVICE_STATE.DEACTIVATION_SCHEDULED:
    case SERVICE_STATE.DISABLED:
      return SERVICE_STATE_DISPLAY.INACTIVE;

    default:
      return SERVICE_STATE_DISPLAY.INACTIVE;
  }
};
