import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

export const isButtonDisabled = (state: SERVICE_TYPE[]): boolean => {
  return !state.length;
};
