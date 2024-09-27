import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Checkbox, Divider, FormControlLabel, Modal, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE, SERVICE_STATE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { extractIdsServices, useFormattedServiceMapping } from "@/providers/GlobalProvider/utils";
import { useDeleteServicesMutation } from "@/services/api";
import { ModalProps, OnChange } from "@/types";

import {
  actionButtonsBoxStyle,
  blueDividerStyle,
  checkBoxLabelStyle,
  checkBoxWrapperStyle,
  noHoverCheckBoxStyle,
  serviceStackStyle,
} from "../CreateServicesModal/style";
import { isButtonDisabled } from "./utils";

export const DeleteServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<SERVICE_TYPE[]>([]);
  const [deleteServices] = useDeleteServicesMutation();
  const {
    displayModals: { confirmation },
    handleDisplayModal,
    tableSelected,
  } = useGlobalProvider();
  const formattedServiceMapping = useFormattedServiceMapping(tableSelected);
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
    setInputValue([]);
    handleClose();
  };

  const handleSubmit = async () => {
    const payload = {
      services_ids: extractIdsServices(tableSelected, inputValue),
      state: SERVICE_STATE.DELETION_SCHEDULED,
    };
    try {
      await deleteServices(payload).unwrap();
      toast.success(t("swarm.create.service.modal.deletion.in.progress"), {
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
      onClose={handleCancel}
      aria-labelledby="delete-services-modal"
      aria-describedby="delete-services">
      <Box sx={modalBoxStyle} data-testid="delete-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.delete.service.modal.title")}</Typography>
          <Button data-testid="close-delete-services-modal" onClick={handleCancel}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1">{t("swarm.delete.service.modal.desc")}</Typography>
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
                    checked={inputValue.includes(item.name)}
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
        <Box sx={actionButtonsBoxStyle}>
          <Box sx={defaultWidthButtonWrapper}>
            <Button variant="outlined" data-testid="create-services-cancel" onClick={handleCancel} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={defaultWidthButtonWrapper}>
            <Button
              disabled={isButtonDisabled(inputValue)}
              variant="contained"
              data-testid="create-services-submit"
              onClick={() => handleDisplayModal(MODAL_TYPE.CONFIRMATION)}
              fullWidth>
              {t("swarm.button.delete")}
            </Button>
          </Box>
        </Box>
        <ConfirmationModal
          isOpen={confirmation}
          handleClose={() => handleDisplayModal(MODAL_TYPE.CONFIRMATION)}
          handleConfirm={handleSubmit}
        />
      </Box>
    </Modal>
  );
};
