import { ForwardRefExoticComponent, RefAttributes } from "react";

import { UsersAndGroups } from "@/types";

export interface UserSelectionSectionTranslations {
  title: string;
  searchPlaceholder: string;
  noResults: string;
  emptySelection: string;
  expandButton: string;
}

export interface UserSelectionSectionProps {
  users: UsersAndGroups[];
  selectedUsers: UsersAndGroups[];
  onUserSelectionChange: (newSelectedUsers: UsersAndGroups[]) => void;
  minSearchLength?: number;
  translations: UserSelectionSectionTranslations;
}

export interface ChipBoxProps {
  isScrollable: boolean;
  isEmpty: boolean;
}

export interface UserSelectionSectionRef {
  closeList: () => void;
}

export type UserSelectionSectionComponent = ForwardRefExoticComponent<
  UserSelectionSectionProps & RefAttributes<UserSelectionSectionRef>
>;
