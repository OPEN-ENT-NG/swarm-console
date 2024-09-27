import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { serviceMapping } from "@/containers/CreateServicesModal/utils";
import { Session } from "@/types";

import { CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_STATE, SERVICE_STATE_DISPLAY, SERVICE_TYPE } from "./enums";
import { DisplayModalsState, RowItem, TableQueryParamsState } from "./types";

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

export const useFormattedServiceMapping = (tableSelected: RowItem[]) => {
  const formattedServiceMapping = useMemo(() => {
    const presentServiceTypes = tableSelected.reduce((acc: SERVICE_TYPE[], item: RowItem) => {
      item.services.forEach(service => {
        if (!acc.includes(service.type)) {
          acc.push(service.type);
        }
      });
      return acc;
    }, []);

    return serviceMapping.filter(item => presentServiceTypes.includes(item.name));
  }, [tableSelected]);
  return formattedServiceMapping;
};

export const extractIdsServices = (tableSelected: RowItem[], inputValue: SERVICE_TYPE[]): string[] => {
  return tableSelected.reduce<string[]>((acc, row) => {
    const idsServicesCorrespondants = row.services
      .filter(service => inputValue.includes(service.type))
      .map(service => service.id);
    return [...acc, ...idsServicesCorrespondants];
  }, []);
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
