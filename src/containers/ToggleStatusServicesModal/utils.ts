import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";
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

  const servicesToToggle = services.filter(
    service => inputValue.includes(service.type) && shouldToggleService(service, isActivating),
  );

  const newState = isActivating ? SERVICE_STATE.REACTIVATION_SCHEDULED : SERVICE_STATE.DEACTIVATION_SCHEDULED;

  if (servicesToToggle.length === 0) {
    return [];
  }

  return [
    {
      services_ids: servicesToToggle.map(service => service.id),
      state: newState,
    },
  ];
};

const shouldToggleService = (service: Service, isActivating: boolean): boolean => {
  if (isActivating) {
    return service.state === SERVICE_STATE.DISABLED;
  }
  return service.state === SERVICE_STATE.DEPLOYED;
};
