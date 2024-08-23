import { ModalProps } from "@/types";

export interface ConfirmationModalProps extends ModalProps {
  label?: string | null;
  confirmButtonLabel?: string | null;
  handleConfirm: () => void;
}
