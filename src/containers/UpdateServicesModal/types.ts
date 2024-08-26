import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export type ServiceTypeAndDate = { type: SERVICE_TYPE; date: string | null };
export type InputValueState = ServiceTypeAndDate[];
