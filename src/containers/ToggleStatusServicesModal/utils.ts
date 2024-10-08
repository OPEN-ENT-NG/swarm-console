import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { RowItem } from "@/providers/GlobalProvider/types";
import { ToggleStatusBody } from "@/services/types";

export const isButtonDisabled = (state: SERVICE_TYPE[]): boolean => {
  return !state.length;
};

export const createToggleStatusBody = (
  tableSelected: RowItem[],
  inputValue: SERVICE_TYPE[],
  isActivating: boolean,
): ToggleStatusBody => {
  const services = tableSelected.flatMap(row => row.services);
  const servicesToToggle = services.filter(service => inputValue.includes(service.type));

  const newState = isActivating ? SERVICE_STATE.REACTIVATION_SCHEDULED : SERVICE_STATE.DEACTIVATION_SCHEDULED;

  return [
    {
      services_ids: servicesToToggle.map(service => service.id),
      state: newState,
    },
  ];
};
