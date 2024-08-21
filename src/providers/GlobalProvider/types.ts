import { Dispatch, ReactNode, SetStateAction } from "react";

import { Session } from "@/types";

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
  createServices: boolean;
}
export enum CURRENTTAB_STATE {
  MAIN = "main",
  STATS = "stats",
}
export enum SERVICE_TYPE {
  PRESTASHOP = "prestashop",
  WORDPRESS = "wordpress",
}
export enum SERVICE_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  WAITING = "waiting",
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
export enum COLUMN_ID {
  SELECT = "select",
  NAME = "name",
  CLASS = "class",
  ETAB = "etab",
  SERVICES = "services",
  STATUS = "status",
  SUPRESSDATE = "supressDate",
}

export enum SORT {
  ASC = "asc",
  DESC = "desc",
}

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
  tableSelected: string[];
  setTableSelected: Dispatch<SetStateAction<string[]>>;
};
