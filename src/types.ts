import { ChangeEventHandler, MouseEventHandler } from "react";

export type Session = {
  user: { name: string; email: string; image: string | undefined };
  token: string;
};

export type UsersAndGroups = {
  id: string;
  name: string;
  type: "user" | "group" | "class";
};

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export type OnChange = ChangeEventHandler<HTMLInputElement>;
export type OnClickButton = MouseEventHandler<HTMLButtonElement>;
