import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { RowItem } from "@/providers/GlobalProvider/types";

export const isButtonDisabled = (state: SERVICE_TYPE[]): boolean => {
  return !state.length;
};

export const extractIdsServices = (tableSelected: RowItem[], inputValue: SERVICE_TYPE[]): string[] => {
  return tableSelected.reduce<string[]>((acc, row) => {
    const idsServicesCorrespondants = row.services
      .filter(service => inputValue.includes(service.type))
      .map(service => service.id);
    return [...acc, ...idsServicesCorrespondants];
  }, []);
};
