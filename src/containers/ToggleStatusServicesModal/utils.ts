import { SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { RowItem } from "@/providers/GlobalProvider/types";
import { ToggleStatusBody } from "@/services/types";

// export const isButtonDisabled = (state: SERVICE_TYPE[]): boolean => {
//   return !state.length;
// };

export const createToggleStatusBody = (tableSelected: RowItem[], inputValue: SERVICE_TYPE[]): ToggleStatusBody => {
  const { toActivate, toDeactivate } = tableSelected
    .flatMap(row => row.services)
    .reduce<{ toActivate: string[]; toDeactivate: string[] }>(
      (acc, service) => {
        if (inputValue.includes(service.type)) {
          return { ...acc, toActivate: [...acc.toActivate, service.id] };
        } else {
          return { ...acc, toDeactivate: [...acc.toDeactivate, service.id] };
        }
      },
      { toActivate: [], toDeactivate: [] },
    );

  return [
    ...(toActivate.length > 0 ? [{ services_ids: toActivate, state: SERVICE_STATE.REACTIVATION_SCHEDULED }] : []),
    ...(toDeactivate.length > 0 ? [{ services_ids: toDeactivate, state: SERVICE_STATE.DEACTIVATION_SCHEDULED }] : []),
  ] as ToggleStatusBody;
};
