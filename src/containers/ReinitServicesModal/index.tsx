import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Checkbox, Divider, FormControlLabel, Modal, Stack, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { ModalProps, OnChange } from "@/types";

import {
  actionButtonsBoxStyle,
  blueDividerStyle,
  checkBoxLabelStyle,
  checkBoxWrapperStyle,
  noHoverCheckBoxStyle,
  serviceStackStyle,
  supressDateWrapperStyle,
} from "../CreateServicesModal/style";
import { serviceMapping } from "../CreateServicesModal/utils";
import { InputvalueState } from "./types";
import { initialInputValue, isButtonDisabled } from "./utils";

export const ReinitServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<InputvalueState>(initialInputValue);
  const { date, type } = inputValue;
  const {
    displayModals: { confirmation },
    handleDisplayModal,
    tableSelected,
  } = useGlobalProvider();

  const handleServiceTypeChange = (serviceType: SERVICE_TYPE) => {
    setInputValue(prevState => {
      const newType = prevState.type.includes(serviceType)
        ? prevState.type.filter(t => t !== serviceType)
        : [...prevState.type, serviceType];
      return { ...prevState, type: newType };
    });
  };

  const handleCheckboxChange: OnChange = event => {
    const { name } = event.target;
    handleServiceTypeChange(name as SERVICE_TYPE);
  };

  const handleCancel = () => {
    handleClose();
    setInputValue(initialInputValue);
  };
  const handleDateChange = (newValue: Dayjs | null) => {
    setInputValue(prevState => ({
      ...prevState,
      date: newValue ? newValue.unix() : null,
    }));
  };
  const handleSubmit = () => {
    handleClose();
    setInputValue(initialInputValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="reinit-services-modal"
      aria-describedby="reinit-services">
      <Box sx={modalBoxStyle} data-testid="reinit-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.reinit.service.modal.title")}</Typography>
          <Button data-testid="close-reinit-services-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1">{t("swarm.reinit.service.modal.desc")}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("swarm.modal.users.selected", { count: tableSelected.length })}
        </Typography>
        <Typography variant="body1">{t("swarm.reinit.service.modal.label")}</Typography>
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
                    checked={type.includes(item.name)}
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
        <Box sx={supressDateWrapperStyle}>
          <CustomDatePicker value={date ? dayjs.unix(date) : null} onChange={handleDateChange} />
        </Box>
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
              onClick={() => handleDisplayModal(MODAL_TYPE.CONFIRMATION)}
              fullWidth>
              {t("swarm.button.reinit")}
            </Button>
          </Box>
        </Box>
        <ConfirmationModal
          isOpen={confirmation}
          handleClose={() => handleDisplayModal(MODAL_TYPE.CONFIRMATION)}
          handleConfirm={handleSubmit}
          confirmButtonLabel={t("swarm.button.reinit")}
        />
      </Box>
    </Modal>
  );
};
