import { Dispatch, ReactNode, SetStateAction } from "react";

import { SVGComponent } from "@/components/SVG/types";
import { Session } from "@/types";

import { COLUMN_ID, CURRENTTAB_STATE, MODAL_TYPE, ORDER_TYPE, SERVICE_TYPE } from "./enums";
import { Service, Services } from "./serviceType";

export interface GlobalProviderProps {
  children: ReactNode;
  session: Session;
}
export interface UserState {
  name: string;
  email: string;
  image: string;
}

export interface DisplayModalsState {
  [MODAL_TYPE.CREATE]: boolean;
  [MODAL_TYPE.DELETE]: boolean;
  [MODAL_TYPE.CONFIRMATION]: boolean;
  [MODAL_TYPE.SEND]: boolean;
  [MODAL_TYPE.TOGGLE_STATUS]: boolean;
  [MODAL_TYPE.REINIT]: boolean;
  [MODAL_TYPE.UPDATE]: boolean;
  [MODAL_TYPE.ADMIN_ACCESS]: boolean;
}

export type RowItem = {
  userId: string;
  lastName: string;
  firstName: string;
  className: string;
  classId: string;
  etabName: string;
  etabId: string;
  services: Service[];
};

export interface Column {
  id: COLUMN_ID;
  label: string;
  width?: string;
}

export interface TableQueryParamsState {
  search: string;
  structures: string[];
  classes: string[];
  groups: string[];
  page: number;
  limit: number;
  order: ORDER_TYPE;
  types: SERVICE_TYPE[];
}

export type ServiceStat = {
  type: SERVICE_TYPE;
  icon: SVGComponent;
  total: number;
  active: number;
  inactive: number;
  toDelete: number;
};

export type GlobalProviderContextType = {
  services: Services | null;
  user: UserState;
  displayModals: DisplayModalsState;
  setDisplayModals: Dispatch<SetStateAction<DisplayModalsState>>;
  currentTab: CURRENTTAB_STATE;
  setCurrentTab: Dispatch<SetStateAction<CURRENTTAB_STATE>>;
  tableQueryParams: TableQueryParamsState;
  setTableQueryParams: Dispatch<SetStateAction<TableQueryParamsState>>;
  tableSelected: RowItem[];
  setTableSelected: Dispatch<SetStateAction<RowItem[]>>;
  servicesStats: ServiceStat[];
  setServicesStats: Dispatch<SetStateAction<ServiceStat[]>>;
  handleDisplayModal: (modalType: MODAL_TYPE) => void;
};
