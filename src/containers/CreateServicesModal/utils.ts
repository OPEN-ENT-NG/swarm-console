import dayjs from "dayjs";

import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { UsersAndGroups } from "@/components/UserSelectionSection/types";
import { INVALID_DATE } from "@/core/const";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

import { InputValueState, ServiceMap, Users } from "./types";

export const initialInputValue: InputValueState = {
  users: [],
  groups: [],
  classes: [],
  types: [],
  deletion_date: null,
};

export const serviceMapping: ServiceMap[] = [
  { name: SERVICE_TYPE.WORDPRESS, label: "swarm.wordpress.title", icon: WordPressIcon },
  { name: SERVICE_TYPE.PRESTASHOP, label: "swarm.prestashop.title", icon: PrestashopIcon },
];

export const isButtonDisabled = (state: InputValueState): boolean => {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  const hasSelectedItems = state.users.length > 0 || state.groups.length > 0 || state.classes.length > 0;

  return (
    !hasSelectedItems ||
    !state.types.length ||
    !state.deletion_date ||
    state.deletion_date === INVALID_DATE ||
    dayjs(state.deletion_date).isBefore(tomorrow)
  );
};

export const extractIdAndName = (data: Users): UsersAndGroups[] => {
  const { users, classes, groups } = data;

  const userItems = users.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    id,
    usertype: "users",
  }));

  const classItems = classes.map(({ id, name }) => ({
    name,
    id,
    usertype: "classes",
  }));

  const groupItems = groups.map(({ id, name }) => ({
    name,
    id,
    usertype: "groups",
  }));

  return [...userItems, ...classItems, ...groupItems];
};

export const updateInputValueFromUsersAndGroups = (
  prevState: InputValueState,
  usersAndGroups: UsersAndGroups[],
): InputValueState => {
  const { users, groups, classes } = usersAndGroups.reduce(
    (acc, item) => {
      const key = item.usertype as string;
      return { ...acc, [key]: [...acc[key], item.id] };
    },
    { users: [], groups: [], classes: [] } as Record<string, string[]>,
  );

  return {
    ...prevState,
    users,
    groups,
    classes,
  };
};
