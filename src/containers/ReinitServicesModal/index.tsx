import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Checkbox, Divider, FormControlLabel, Modal, Stack, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { extractIdsServices, useFormattedServiceMapping } from "@/providers/GlobalProvider/utils";
import { useResetServicesMutation } from "@/services/api";
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
import { InputvalueState } from "./types";
import { initialInputValue, isButtonDisabled } from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

export const ReinitServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<InputvalueState>(initialInputValue);
  const { deletion_date, type } = inputValue;
  const {
    displayModals: { confirmation },
    handleDisplayModal,
    tableSelected,
  } = useGlobalProvider();
  const [resetServices] = useResetServicesMutation();
  const formattedServiceMapping = useFormattedServiceMapping(tableSelected);

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
      deletion_date: newValue ? newValue.endOf("day").local().valueOf() : null,
    }));
  };
  const handleSubmit = async () => {
    if (!deletion_date || deletion_date === "Invalid Date") return;
    const payload = {
      services_ids: extractIdsServices(tableSelected, inputValue.type),
      deletion_date,
    };
    try {
      await resetServices(payload).unwrap();
      toast.success(t("swarm.reinit.service.modal.reinit.in.progress"), {
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
          {formattedServiceMapping.map(item => (
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
                  <Box sx={checkBoxLabelStyle}>
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
          <Typography variant="body1" sx={{ fontWeight: "600", paddingTop: "1rem" }}>
            {t("swarm.table.column.supressDate")}
          </Typography>
          <CustomDatePicker
            value={deletion_date ? dayjs(deletion_date) : null}
            onChange={handleDateChange}
            displayInfo
          />
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
