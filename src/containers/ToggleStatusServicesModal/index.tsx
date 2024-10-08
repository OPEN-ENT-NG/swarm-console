import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { centerBoxStyle, columnBoxStyle, modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import theme from "@/core/style/theme";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { useFormattedServiceMapping } from "@/providers/GlobalProvider/utils";
import { useToggleServicesMutation } from "@/services/api";
import { ModalProps } from "@/types";

import { noHoverCheckBoxStyle } from "../CreateServicesModal/style";
import { actionButtonsBoxStyle } from "./style";
import { createToggleStatusBody, isButtonDisabled } from "./utils";

export const ToggleStatusServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<SERVICE_TYPE[]>([]);
  const { tableSelected } = useGlobalProvider();
  const [toggleServices] = useToggleServicesMutation();
  const formattedServiceMapping = useFormattedServiceMapping(tableSelected);

  const handleCancel = () => {
    handleClose();
    setInputValue([]);
  };

  const handleSubmit = async (isActivating: boolean) => {
    const payload = createToggleStatusBody(tableSelected, inputValue, isActivating);
    try {
      await toggleServices(payload).unwrap();
      toast.success(t("swarm.toggle.status.service.modal.in.progress"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setInputValue([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleServiceTypeChange = (serviceName: SERVICE_TYPE) => {
    setInputValue(prevState =>
      prevState.includes(serviceName) ? prevState.filter(item => item !== serviceName) : [...prevState, serviceName],
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="toggle-status-services-modal"
      aria-describedby="toggle-status-services">
      <Box sx={modalBoxStyle} data-testid="toggle-status-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.toggle.status.service.modal.title")}</Typography>
          <Button data-testid="close-toggle-status-services-modal" onClick={handleCancel}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {tableSelected.length === 1
            ? t("swarm.modal.users.selected_singular", { count: tableSelected.length })
            : t("swarm.modal.users.selected_plural", { count: tableSelected.length })}
        </Typography>
        <Typography variant="body1">{t("swarm.toggle.service.modal.services.label")}</Typography>
        <Box sx={{ ...centerBoxStyle, gap: "4rem" }}>
          {formattedServiceMapping.map(item => (
            <Box
              key={item.label}
              onClick={e => {
                e.preventDefault();
                handleServiceTypeChange(item.name);
              }}
              sx={{ ...columnBoxStyle, alignItems: "center", justifyContent: "center", width: "fit-content" }}>
              <Box
                sx={{
                  ...columnBoxStyle,
                  fontSize: "2rem",
                  border: `1px solid ${theme.palette.grey[300]}`,
                  width: "9rem",
                  height: "7rem",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1rem",
                  gap: "1rem",
                  cursor: "pointer",
                }}>
                <Box sx={{ height: "2rem" }}>
                  <item.icon fill="black" />
                </Box>
                <Typography fontWeight="bold" variant="body1">
                  {t("swarm.update.service.modal.label", { type: t(item.label) })}
                </Typography>
              </Box>
              <Checkbox
                data-testid={item.name}
                sx={noHoverCheckBoxStyle}
                checked={inputValue.includes(item.name)}
                onChange={() => handleServiceTypeChange(item.name)}
                name={item.name}
                color="primary"
              />
            </Box>
          ))}
        </Box>
        <Box sx={actionButtonsBoxStyle}>
          <Typography variant="body1">{t("swarm.toggle.service.modal.services.actions")}</Typography>
          <Box sx={defaultWidthButtonWrapper}>
            <Button
              variant="contained"
              data-testid="create-services-cancel"
              onClick={() => handleSubmit(false)}
              fullWidth
              disabled={isButtonDisabled(inputValue)}>
              {t("swarm.button.deactivate")}
            </Button>
          </Box>
          <Box sx={defaultWidthButtonWrapper}>
            <Button
              variant="contained"
              data-testid="create-services-submit"
              onClick={() => handleSubmit(true)}
              fullWidth
              disabled={isButtonDisabled(inputValue)}>
              {t("swarm.button.activate")}
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ fontStyle: "italic", marginBottom: "1rem" }}>
          {t("swarm.toggle.status.service.modal.desc")}
        </Typography>
      </Box>
    </Modal>
  );
};
