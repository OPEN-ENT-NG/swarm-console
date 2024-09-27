import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export type ServiceTypeAndDate = { type: SERVICE_TYPE; date: number | null | "Invalid Date" };
export type InputValueState = ServiceTypeAndDate[];
