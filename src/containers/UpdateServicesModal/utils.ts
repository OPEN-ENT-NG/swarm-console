import dayjs from "dayjs";

import { INVALID_DATE } from "@/core/const";

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
