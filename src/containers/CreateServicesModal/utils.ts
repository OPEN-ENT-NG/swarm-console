import dayjs from "dayjs";

import { PrestashopIcon } from "@/components/SVG/PrestashopIcon";
import { WordPressIcon } from "@/components/SVG/WordPressIcon";
import { UsersAndGroups } from "@/components/UserSelectionSection/types";
import { INVALID_DATE } from "@/core/const";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { UsersData } from "@/services/types";

import { InputValueState, ServiceMap } from "./types";

export const initialInputValue: InputValueState = {
  users: [],
  classes: [],
  types: [],
  deletion_date: null,
};

export const serviceMapping: ServiceMap[] = [
  { name: SERVICE_TYPE.WORDPRESS, label: "swarm.wordpress.title", icon: WordPressIcon },
  { name: SERVICE_TYPE.PRESTASHOP, label: "swarm.prestashop.title", icon: PrestashopIcon },
];

export const serviceLabelMapping = {
  [SERVICE_TYPE.WORDPRESS]: "swarm.wordpress.title",
  [SERVICE_TYPE.PRESTASHOP]: "swarm.prestashop.title",
};

export const isButtonDisabled = (state: InputValueState): boolean => {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  const hasSelectedItems = state.users.length > 0 || state.classes.length > 0;

  return (
    !hasSelectedItems ||
    !state.types.length ||
    !state.deletion_date ||
    state.deletion_date === INVALID_DATE ||
    dayjs(state.deletion_date).isBefore(tomorrow)
  );
};

export const extractIdAndName = (data: UsersData): UsersAndGroups[] => {
  const userItems: UsersAndGroups[] = data.map(({ id, firstName, lastName }) => ({
    name: `${firstName} ${lastName}`,
    id,
    usertype: "users",
  }));

  const classItems: UsersAndGroups[] = data.flatMap(user =>
    user.classes.map(({ classId, name }) => ({
      name,
      id: classId,
      usertype: "classes",
    })),
  );

  const allItems = [...userItems, ...classItems];

  return allItems.filter((item, index, array) => index === array.findIndex(t => t.id === item.id));
};

export const updateInputValueFromUsersAndGroups = (
  prevState: InputValueState,
  usersAndGroups: UsersAndGroups[],
): InputValueState => {
  const { users, classes } = usersAndGroups.reduce(
    (acc, item) => {
      const key = item.usertype as string;
      return { ...acc, [key]: [...acc[key], item.id] };
    },
    { users: [], classes: [] } as Record<string, string[]>,
  );

  return {
    ...prevState,
    users,
    classes,
  };
};
