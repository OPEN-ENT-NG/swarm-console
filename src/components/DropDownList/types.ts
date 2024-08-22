import { ReactNode } from "react";

export type DropDownListItem = { primary: ReactNode; secondary: ReactNode; OnClick: () => void };

export interface DropdownListProps {
  variant?: "outlined" | "contained";
  items: DropDownListItem[];
  buttonText: ReactNode;
}

export interface StyledProps {
  styledvariant: "outlined" | "contained";
}
