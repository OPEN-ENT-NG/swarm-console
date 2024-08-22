import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Checkbox, Divider, FormControlLabel, Modal, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { ModalProps, OnChange } from "@/types";

import {
  actionButtonsBoxStyle,
  blueDividerStyle,
  checkBoxLabelStyle,
  checkBoxWrapperStyle,
  noHoverCheckBoxStyle,
  serviceStackStyle,
} from "../CreateServicesModal/style";
import { serviceMapping } from "../CreateServicesModal/utils";
import { isButtonDisabled } from "./utils";

export const SendServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<SERVICE_TYPE[]>([]);
  const { tableSelected } = useGlobalProvider();

  const handleServiceTypeChange = (serviceType: SERVICE_TYPE) => {
    setInputValue(prevState => {
      const newType = prevState.includes(serviceType)
        ? prevState.filter(t => t !== serviceType)
        : [...prevState, serviceType];
      return newType;
    });
  };

  const handleCheckboxChange: OnChange = event => {
    const { name } = event.target;
    handleServiceTypeChange(name as SERVICE_TYPE);
  };

  const handleCancel = () => {
    handleClose();
    setInputValue([]);
  };

  const handleSubmit = () => {
    handleClose();
    setInputValue([]);
  };
  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="send-services-modal" aria-describedby="send-services">
      <Box sx={modalBoxStyle} data-testid="send-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.send.service.modal.title")}</Typography>
          <Button data-testid="close-send-services-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1">{t("swarm.send.service.modal.desc")}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("swarm.modal.users.selected", { count: tableSelected.length })}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={blueDividerStyle} />}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexWrap="nowrap"
          sx={serviceStackStyle}>
          {serviceMapping.map(item => (
            <Box
              key={item.label}
              onClick={e => {
                e.preventDefault();
                handleServiceTypeChange(item.name);
              }}
              sx={checkBoxWrapperStyle}>
              <FormControlLabel
                control={
                  <Checkbox
                    data-testid={item.name}
                    sx={noHoverCheckBoxStyle}
                    checked={inputValue.includes(item.name)}
                    onChange={handleCheckboxChange}
                    name={item.name}
                    color="primary"
                  />
                }
                label={
                  <Box
                    sx={checkBoxLabelStyle}
                    onClick={e => {
                      e.preventDefault();
                      handleServiceTypeChange(item.name);
                    }}>
                    <Typography fontWeight="bold" variant="body1">
                      {t(`${item.label}`)}
                    </Typography>
                    <item.icon fill="black" />
                  </Box>
                }
              />
            </Box>
          ))}
        </Stack>
        <Box sx={actionButtonsBoxStyle}>
          <Box sx={{ width: "6.6rem" }}>
            <Button variant="outlined" data-testid="create-services-cancel" onClick={handleCancel} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={{ width: "6.6rem" }}>
            <Button
              disabled={isButtonDisabled(inputValue)}
              variant="contained"
              data-testid="create-services-submit"
              onClick={() => handleSubmit()}
              fullWidth>
              {t("swarm.button.send")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
