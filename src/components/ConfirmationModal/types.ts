import { ModalProps } from "@/types";

export interface ConfirmationModalProps extends ModalProps {
  label?: string | null;
  handleConfirm: () => void;
}
