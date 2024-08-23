import { Box, Button, CloseIcon, Typography } from "@cgi-learning-hub/ui";
import { Checkbox, Divider, FormControlLabel, Modal, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { CustomDatePicker } from "@/components/CustomDatePicker";
import { UserSelectionSection } from "@/components/UserSelectionSection";
import { UserSelectionSectionRef } from "@/components/UserSelectionSection/types";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { usersAndGroupListData } from "@/test/mocks/datasMock";
import { ModalProps, OnChange, UsersAndGroups } from "@/types";

import {
  actionButtonsBoxStyle,
  blueDividerStyle,
  checkBoxLabelStyle,
  checkBoxWrapperStyle,
  noHoverCheckBoxStyle,
  serviceStackStyle,
  supressDateWrapperStyle,
} from "./style";
import { InputValueState } from "./types";
import { initialInputValue, isButtonDisabled, serviceMapping } from "./utils";

export const CreateServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<InputValueState>(initialInputValue);
  const userSelectionRef = useRef<UserSelectionSectionRef>(null);
  const { usersAndGroups, date, type } = inputValue;

  const userSelectionTranslations = {
    title: t("swarm.create.service.modal.user.selection"),
    searchPlaceholder: t("swarm.create.service.modal.search.input.placeHolder"),
    noResults: t("swarm.create.service.modal.search.user.filter.empty"),
    emptySelection: t("swarm.create.service.modal.search.user.empty"),
    expandButton: t("swarm.create.service.modal.search.user.expand"),
  };
  const handleSubmit = () => {
    handleClose();
    setInputValue(initialInputValue);
    toast.success(t("swarm.create.service.modal.creation.in.progress"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleCancel = () => {
    handleClose();
    setInputValue(initialInputValue);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setInputValue(prevState => ({
      ...prevState,
      date: newValue ? newValue.startOf("day").format("YYYY-MM-DD HH:mm:ss") : null,
    }));
  };

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

  const handleUserSelectionChange = (newSelectedUsers: UsersAndGroups[]) => {
    setInputValue(prevState => ({
      ...prevState,
      usersAndGroups: newSelectedUsers,
    }));
  };

  const handleModalClick = () => {
    userSelectionRef.current?.closeList();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="create-services-modal"
      aria-describedby="create-services">
      <Box sx={modalBoxStyle} onClick={handleModalClick} data-testid="create-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.create.service.modal.title")}</Typography>
          <Button data-testid="close-create-services-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {t("swarm.create.service.modal.desc")}
        </Typography>
        <UserSelectionSection
          users={usersAndGroupListData}
          selectedUsers={usersAndGroups}
          onUserSelectionChange={handleUserSelectionChange}
          translations={userSelectionTranslations}
          ref={userSelectionRef}
        />
        <Typography variant="h2">{t("swarm.create.service.modal.params.title")}</Typography>
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
          <Typography sx={{ paddingTop: "1.5rem" }} variant="h3">
            {t("swarm.create.service.modal.supress.label")}
          </Typography>
          <CustomDatePicker value={date ? dayjs(date) : null} onChange={handleDateChange} displayInfo />
        </Box>
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
              onClick={handleSubmit}
              fullWidth>
              {t("swarm.create")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
