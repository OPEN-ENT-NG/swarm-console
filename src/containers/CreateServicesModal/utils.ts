import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";

import { InputValueState, ServiceMap } from "./types";

export const initialInputValue: InputValueState = {
  usersAndGroups: [],
  wordpress: false,
  prestashop: false,
  supressDate: null,
};

export const serviceMapping: ServiceMap[] = [
  { name: "wordpress", label: "swarm.wordpress.title", icon: WordPressIcon },
  { name: "prestashop", label: "swarm.prestashop.title", icon: PrestashopIcon },
];

export const isButtonDisabled = (state: InputValueState): boolean => {
  return state.usersAndGroups.length === 0 || (!state.wordpress && !state.prestashop) || state.supressDate === null;
};
