import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { buttonWrapperStyle, confirmationModalBoxStyle, textAndSVGWrapperStyle } from "./style";
import { ConfirmationModalProps } from "./types";

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ label = null, handleConfirm, isOpen, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal open={isOpen} aria-labelledby="confirmation-modal" aria-describedby="confirmation">
      <Box sx={confirmationModalBoxStyle} data-testid="confirmation-modal">
        <Box sx={textAndSVGWrapperStyle}>
          <WarningIcon />
          <Typography variant="h2">{label || t("swarm.confirmation.modal.default")}</Typography>
        </Box>
        <Box sx={buttonWrapperStyle}>
          <Box sx={{ width: "6.6rem" }}>
            <Button variant="outlined" data-testid="confirmation-cancel" onClick={handleClose} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={{ width: "6.6rem" }}>
            <Button
              variant="contained"
              data-testid="confirmation-submit"
              onClick={() => {
                handleConfirm();
                handleClose();
              }}
              fullWidth>
              {t("swarm.button.delete")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
