import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";

import { buttonWrapperStyle, confirmationModalBoxStyle, textAndSVGWrapperStyle } from "./style";
import { ConfirmationModalProps } from "./types";

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  label = null,
  handleConfirm,
  isOpen,
  handleClose,
  confirmButtonLabel = null,
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={isOpen} aria-labelledby="confirmation-modal" aria-describedby="confirmation">
      <Box sx={confirmationModalBoxStyle} data-testid="confirmation-modal">
        <Box sx={textAndSVGWrapperStyle}>
          <WarningIcon />
          <Typography variant="h2">{label ?? t("swarm.confirmation.modal.default")}</Typography>
        </Box>
        <Box sx={buttonWrapperStyle}>
          <Box sx={defaultWidthButtonWrapper}>
            <Button variant="outlined" data-testid="confirmation-cancel" onClick={handleClose} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={defaultWidthButtonWrapper}>
            <Button
              variant="contained"
              data-testid="confirmation-submit"
              onClick={() => {
                handleConfirm();
                handleClose();
              }}
              fullWidth>
              {confirmButtonLabel ?? t("swarm.button.delete")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
