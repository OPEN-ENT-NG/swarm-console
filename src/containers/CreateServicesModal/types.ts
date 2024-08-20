import { Dayjs } from "dayjs";

import { SVGComponent } from "@/components/SVG/types";
import { UsersAndGroups } from "@/types";

export interface CreateServicesModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface InputValueState {
  usersAndGroups: UsersAndGroups[];
  wordpress: boolean;
  prestashop: boolean;
  supressDate: Dayjs | null;
}

export interface ServiceMap {
  name: "prestashop" | "wordpress";
  label: string;
  icon: SVGComponent;
}
