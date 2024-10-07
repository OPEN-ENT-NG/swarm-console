import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Divider, Modal, Stack, Switch, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { useFormattedServiceMapping } from "@/providers/GlobalProvider/utils";
import { useToggleServicesMutation } from "@/services/api";
import { ModalProps } from "@/types";

import { actionButtonsBoxStyle, blueDividerStyle } from "../CreateServicesModal/style";
import { SVGWrapper, textAndSVGWrapper, toggleServiceStackStyle, toggleWrapperStyle } from "./style";
import { createToggleStatusBody } from "./utils";

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

  const handleSubmit = async () => {
    const payload = createToggleStatusBody(tableSelected, inputValue);
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
      handleCancel();
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
      onClose={handleClose}
      aria-labelledby="toggle-status-services-modal"
      aria-describedby="toggle-status-services">
      <Box sx={modalBoxStyle} data-testid="toggle-status-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.toggle.status.service.modal.title")}</Typography>
          <Button data-testid="close-toggle-status-services-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1">{t("swarm.toggle.status.service.modal.desc")}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {tableSelected.length === 1
            ? t("swarm.modal.users.selected_singular", { count: tableSelected.length })
            : t("swarm.modal.users.selected_plural", { count: tableSelected.length })}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={blueDividerStyle} />}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexWrap="nowrap"
          sx={toggleServiceStackStyle}>
          {formattedServiceMapping.map(item => (
            <Box
              key={item.label}
              sx={toggleWrapperStyle}
              onClick={e => {
                e.preventDefault();
                handleServiceTypeChange(item.name);
              }}>
              <Box sx={textAndSVGWrapper}>
                <Box sx={SVGWrapper}>
                  <item.icon fill="black" />
                </Box>
                <Typography fontWeight="bold" variant="h2">
                  {t(`${item.label}`)}
                </Typography>
              </Box>
              <Box sx={textAndSVGWrapper}>
                <Typography variant="h2" fontWeight={500}>
                  {t("swarm.toggle.status.service.modal.activate")}
                </Typography>
                <Switch
                  checked={inputValue.includes(item.name)}
                  onChange={() => handleServiceTypeChange(item.name)}
                  name={item.name}
                  color="primary"
                  data-testid={item.name}
                />
              </Box>
            </Box>
          ))}
        </Stack>
        <Box sx={actionButtonsBoxStyle}>
          <Box sx={defaultWidthButtonWrapper}>
            <Button variant="outlined" data-testid="create-services-cancel" onClick={handleCancel} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={defaultWidthButtonWrapper}>
            <Button variant="contained" data-testid="create-services-submit" onClick={() => handleSubmit()} fullWidth>
              {t("swarm.button.activate")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
