import dayjs from "dayjs";

import { INVALID_DATE } from "@/core/const";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { Service } from "@/providers/GlobalProvider/serviceType";
import { RowItem } from "@/providers/GlobalProvider/types";
import { UpdateBody } from "@/services/types";

import { InputValueState } from "./types";

export const isButtonDisabled = (state: InputValueState): boolean => {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  return (
    state.length === 0 ||
    state.some(item => !item.date) ||
    state.some(item => dayjs(item.date).isBefore(tomorrow)) ||
    state.some(item => item.date === INVALID_DATE)
  );
};

export const createUpdateBody = (tableSelected: RowItem[], inputValue: InputValueState): UpdateBody => {
  const servicesByType = tableSelected
    .flatMap(row => row.services)
    .reduce<Partial<Record<SERVICE_TYPE, Service[]>>>(
      (acc, service) => ({
        ...acc,
        [service.type]: [...(acc[service.type] || []), service],
      }),
      {},
    );

  return inputValue
    .filter(({ date }) => date !== null && date !== "Invalid Date")
    .map(({ type, date }) => ({
      services_ids: servicesByType[type]?.map(service => service.id) ?? [],
      deletion_date: date as number,
    }))
    .filter(item => item.services_ids.length > 0);
};
