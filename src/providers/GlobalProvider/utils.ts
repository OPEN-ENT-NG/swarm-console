import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { SVGComponent } from "@/components/SVG/types";
import { serviceMapping } from "@/containers/CreateServicesModal/utils";
import { ServiceStatsRaw } from "@/services/types";
import { Session } from "@/types";

import { CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_STATE, SERVICE_STATE_DISPLAY, SERVICE_TYPE } from "./enums";
import { DisplayModalsState, RowItem, ServiceStat, TableQueryParamsState } from "./types";

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
        const serviceStateDisplay = getServiceStateDisplay(service.state);
        if (
          !acc.includes(service.type) &&
          (serviceStateDisplay === SERVICE_STATE_DISPLAY.ACTIVE ||
            serviceStateDisplay === SERVICE_STATE_DISPLAY.INACTIVE)
        ) {
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
    case SERVICE_STATE.SCHEDULED:
    case SERVICE_STATE.IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.CREATION;

    case SERVICE_STATE.DEPLOYED:
    case SERVICE_STATE.DEACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.ACTIVE;

    case SERVICE_STATE.DEPLOYMENT_IN_ERROR:
    case SERVICE_STATE.DELETION_IN_ERROR:
    case SERVICE_STATE.RESET_IN_ERROR:
    case SERVICE_STATE.DEACTIVATION_IN_ERROR:
    case SERVICE_STATE.REACTIVATION_IN_ERROR:
      return SERVICE_STATE_DISPLAY.ERROR;

    case SERVICE_STATE.DELETION_SCHEDULED:
    case SERVICE_STATE.DELETION_IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.DELETION;

    case SERVICE_STATE.RESET_SCHEDULED:
    case SERVICE_STATE.RESET_IN_PROGRESS:
      return SERVICE_STATE_DISPLAY.REINIT;

    case SERVICE_STATE.DISABLED:
    case SERVICE_STATE.REACTIVATION_SCHEDULED:
      return SERVICE_STATE_DISPLAY.INACTIVE;

    default:
      return SERVICE_STATE_DISPLAY.ERROR;
  }
};

const serviceIconMap: Record<SERVICE_TYPE, SVGComponent> = {
  [SERVICE_TYPE.WORDPRESS]: WordPressIcon,
  [SERVICE_TYPE.PRESTASHOP]: PrestashopIcon,
};

export const transformServiceStats = (rawStats: ServiceStatsRaw): ServiceStat[] => {
  return rawStats.map(stat => ({
    type: stat.type,
    icon: serviceIconMap[stat.type],
    total: stat.nbCreatedService,
    active: stat.nbActiveService,
    inactive: stat.nbInactiveService,
    toDelete: stat.nbDeletedSoonService,
  }));
};
