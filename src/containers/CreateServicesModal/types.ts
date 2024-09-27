import { SVGComponent } from "@/components/SVG/types";
import { PROFILE_TYPE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export interface InputValueState {
  users: string[];
  classes: string[];
  groups: string[];
  types: SERVICE_TYPE[];
  deletion_date: number | null | "Invalid Date";
}

export interface ServiceMap {
  name: SERVICE_TYPE;
  label: string;
  icon: SVGComponent;
}

type Class = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  profiles: PROFILE_TYPE;
  structures: string;
  classes: Class[];
  groups: Group[];
};

export type Users = {
  users: User[];
  classes: Class[];
  groups: Group[];
};
