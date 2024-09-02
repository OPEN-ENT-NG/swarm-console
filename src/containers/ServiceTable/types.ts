import { SERVICE_STATE_DISPLAY } from "@/providers/GlobalProvider/enums";

export interface SVGWrapperProps {
  isActive: boolean;
}

export interface StatusPointProps {
  status: SERVICE_STATE_DISPLAY;
}

export type LowerCaseOrder = "asc" | "desc";
