import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ServiceCredentialsRow } from "@/components/ServiceCredentialsRow";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import { AdminAccessModalProps } from "@/types";

import { actionButtonsBoxStyle } from "../CreateServicesModal/style";

export const AdminAccessModal: FC<AdminAccessModalProps> = ({ isOpen, adminAccessRow, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="access-admin-modal" aria-describedby="access-admin">
      <Box sx={modalBoxStyle} data-testid="access-admin-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.access.admin.modal.title")}</Typography>
          <Button data-testid="close-access-admin-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Stack spacing={4}>
          {adminAccessRow?.services.map(service => (
            <ServiceCredentialsRow service={service} key={service.id}></ServiceCredentialsRow>
          ))}
        </Stack>
        <Box sx={actionButtonsBoxStyle}>
          <Box sx={defaultWidthButtonWrapper}>
            <Button variant="outlined" data-testid="access-admin-close" onClick={handleClose} fullWidth>
              {t("swarm.close")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
