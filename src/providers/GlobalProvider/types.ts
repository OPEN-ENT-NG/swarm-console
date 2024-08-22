import { Dispatch, ReactNode, SetStateAction } from "react";

import { Session } from "@/types";

import { COLUMN_ID, CURRENTTAB_STATE, MODAL_TYPE, SERVICE_STATUS, SERVICE_TYPE, SORT } from "./enums";

export interface GlobalProviderProps {
  children: ReactNode;
  session: Session;
}
export interface UserState {
  name: string;
  email: string;
  image: string;
}
export type ServicesState = Service[] | null;

export interface DisplayModalsState {
  [MODAL_TYPE.CREATE]: boolean;
  [MODAL_TYPE.DELETE]: boolean;
  [MODAL_TYPE.CONFIRMATION]: boolean;
  [MODAL_TYPE.SEND]: boolean;
}

export type Service = {
  type: SERVICE_TYPE;
  status: SERVICE_STATUS;
  id: number;
  userId: string;
  url: string;
  supressDate: string;
};

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
  page: number;
  rowsPerPage: number;
  orderBy: COLUMN_ID.NAME;
  order: SORT;
}

export type GlobalProviderContextType = {
  services: ServicesState;
  user: UserState;
  displayModals: DisplayModalsState;
  setDisplayModals: Dispatch<SetStateAction<DisplayModalsState>>;
  currentTab: CURRENTTAB_STATE;
  setCurrentTab: Dispatch<SetStateAction<CURRENTTAB_STATE>>;
  tableQueryParams: TableQueryParamsState;
  setTableQueryParams: Dispatch<SetStateAction<TableQueryParamsState>>;
  tableSelected: RowItem[];
  setTableSelected: Dispatch<SetStateAction<RowItem[]>>;
  handleDisplayModal: (modalType: MODAL_TYPE) => void;
};
