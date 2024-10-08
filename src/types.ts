import { ChangeEventHandler, MouseEventHandler } from "react";

export type Session = {
  user: { name: string; email: string; image: string | undefined };
  token: string;
  error?: string;
  isManager: boolean;
};

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export type OnChange = ChangeEventHandler<HTMLInputElement>;
export type OnClickButton = MouseEventHandler<HTMLButtonElement>;
