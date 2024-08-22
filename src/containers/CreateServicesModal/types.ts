import { SVGComponent } from "@/components/SVG/types";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { UsersAndGroups } from "@/types";

export interface InputValueState {
  usersAndGroups: UsersAndGroups[];
  type: SERVICE_TYPE[];
  supressDate: number | null;
}

export interface ServiceMap {
  name: SERVICE_TYPE;
  label: string;
  icon: SVGComponent;
}
