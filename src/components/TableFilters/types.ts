import { ReactNode } from "react";

export interface ToggleFiltersState {
  isFiltersOpen: boolean;
  isServicesOpen: boolean;
}
export enum SUBFILTERS_STATE {
  STRUCTURES = "structures",
  CLASSES = "classes",
  GROUPS = "groups",
}
export type ItemState = keyof ToggleFiltersState;
export type SubOption = {
  icon: ReactNode;
  label: string;
  sub: SUBFILTERS_STATE;
};
