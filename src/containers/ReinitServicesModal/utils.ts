import { InputvalueState } from "./types";

export const initialInputValue: InputvalueState = {
  type: [],
  date: null,
};

export const isButtonDisabled = (state: InputvalueState): boolean => {
  return !state.type.length || !state.date;
};
