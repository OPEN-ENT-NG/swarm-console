import { ChangeEventHandler, MouseEventHandler } from "react";

import { RowItem } from "./providers/GlobalProvider/types";

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

export interface AdminAccessModalProps extends ModalProps {
  adminAccessRow: RowItem | null;
}

export type OnChange = ChangeEventHandler<HTMLInputElement>;
export type OnClickButton = MouseEventHandler<HTMLButtonElement>;
