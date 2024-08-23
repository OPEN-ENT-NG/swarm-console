import dayjs from "dayjs";

import { InputvalueState } from "./types";

export const initialInputValue: InputvalueState = {
  type: [],
  date: null,
};

export const isButtonDisabled = (state: InputvalueState): boolean => {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  return !state.type.length || !state.date || dayjs(state.date).isBefore(tomorrow);
};
