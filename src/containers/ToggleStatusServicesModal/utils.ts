import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";
import { RowItem } from "@/providers/GlobalProvider/types";
import { ToggleStatusBody } from "@/services/types";

export const getServicesStates = (
  tableSelected: RowItem[],
  selectedTypes: SERVICE_TYPE[],
): {
  allActive: boolean;
  allInactive: boolean;
} => {
  const services = tableSelected.flatMap(row => row.services);
  const selectedServices = services.filter(service => selectedTypes.includes(service.type));

  if (selectedServices.length === 0) {
    return { allActive: false, allInactive: false };
  }

  const allActive = selectedServices.every(service => service.state === SERVICE_STATE.DEPLOYED);

  const allInactive = selectedServices.every(service => service.state === SERVICE_STATE.DISABLED);

  return { allActive, allInactive };
};

export const isButtonDisabled = (
  selectedTypes: SERVICE_TYPE[],
  tableSelected: RowItem[],
  isActivateButton: boolean,
): boolean => {
  if (!selectedTypes.length) {
    return true;
  }

  const { allActive, allInactive } = getServicesStates(tableSelected, selectedTypes);
  return isActivateButton ? allActive : allInactive;
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
