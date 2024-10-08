import dayjs from "dayjs";

import { INVALID_DATE } from "@/core/const";

import { InputvalueState } from "./types";

export const initialInputValue: InputvalueState = {
  type: [],
  deletion_date: null,
};

export const isButtonDisabled = (state: InputvalueState): boolean => {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  return (
    !state.type.length ||
    !state.deletion_date ||
    dayjs(state.deletion_date).isBefore(tomorrow) ||
    state.deletion_date === INVALID_DATE
  );
};
