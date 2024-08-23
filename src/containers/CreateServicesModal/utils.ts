import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

import { InputValueState, ServiceMap } from "./types";

export const initialInputValue: InputValueState = {
  usersAndGroups: [],
  type: [],
  date: null,
};

export const serviceMapping: ServiceMap[] = [
  { name: SERVICE_TYPE.WORDPRESS, label: "swarm.wordpress.title", icon: WordPressIcon },
  { name: SERVICE_TYPE.PRESTASHOP, label: "swarm.prestashop.title", icon: PrestashopIcon },
];

export const isButtonDisabled = (state: InputValueState): boolean => {
  return !state.usersAndGroups.length || !state.type.length || !state.date;
};
