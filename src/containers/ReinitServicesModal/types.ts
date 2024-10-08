import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export interface InputvalueState {
  type: SERVICE_TYPE[];
  deletion_date: number | null | "Invalid Date";
}
