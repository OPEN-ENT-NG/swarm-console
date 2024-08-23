import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export interface InputvalueState {
  type: SERVICE_TYPE[];
  date: number | null;
}
