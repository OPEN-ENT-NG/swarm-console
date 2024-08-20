import { Box, Button, CloseIcon, Typography } from "@cgi-learning-hub/ui";
import { Checkbox, Divider, FormControlLabel, Modal, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { CustomDatePicker } from "@/components/CustomDatePicker";
import { UserSelectionSection } from "@/components/UserSelectionSection";
import { UserSelectionSectionRef } from "@/components/UserSelectionSection/types";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { initialDisplayModalsState } from "@/providers/GlobalProvider/utils";
import { usersAndGroupListData } from "@/test/mocks/datasMock";
import { OnChange, UsersAndGroups } from "@/types";

import {
  actionButtonsBoxStyle,
  blueDividerStyle,
  checkBoxLabelStyle,
  checkBoxWrapperStyle,
  noHoverCheckBoxStyle,
  serviceStackStyle,
  supressDateWrapperStyle,
} from "./style";
import { CreateServicesModalProps, InputValueState } from "./types";
import { initialInputValue, serviceMapping } from "./utils";

export const CreateServicesModal: FC<CreateServicesModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const { setDisplayModals } = useGlobalProvider();
  const [inputValue, setInputValue] = useState<InputValueState>(initialInputValue);
  const userSelectionRef = useRef<UserSelectionSectionRef>(null);
  const { usersAndGroups, supressDate } = inputValue;

  const userSelectionTranslations = {
    title: t("swarm.create.service.modal.user.selection"),
    searchPlaceholder: t("swarm.create.service.modal.search.input.placeHolder"),
    noResults: t("swarm.create.service.modal.search.user.filter.empty"),
    emptySelection: t("swarm.create.service.modal.search.user.empty"),
    expandButton: t("swarm.create.service.modal.search.user.expand"),
  };
  const handleSubmit = () => {
    setDisplayModals(initialDisplayModalsState);
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
    setDisplayModals(initialDisplayModalsState);
    setInputValue(initialInputValue);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setInputValue(prevState => ({
      ...prevState,
      supressDate: newValue,
    }));
  };

  const createHandleClick = (name: "wordpress" | "prestashop") => () => {
    setInputValue(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleCheckboxChange: OnChange = event => {
    const { name, checked } = event.target;
    setInputValue(prevState => ({
      ...prevState,
      [name]: checked,
    }));
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
            <Box key={item.label} onClick={createHandleClick(item.name)} sx={checkBoxWrapperStyle}>
              <FormControlLabel
                control={
                  <Checkbox
                    data-testid={item.name}
                    sx={noHoverCheckBoxStyle}
                    checked={inputValue[item.name]}
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
                      createHandleClick(item.name);
                    }}>
                    <Typography variant="body1">{t(`${item.label}`)}</Typography>
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
          <CustomDatePicker value={supressDate} onChange={handleDateChange} displayInfo />
        </Box>
        <Box sx={actionButtonsBoxStyle}>
          <Box sx={{ width: "6.6rem" }}>
            <Button variant="outlined" data-testid="create-services-cancel" onClick={handleCancel} fullWidth>
              {t("swarm.cancel")}
            </Button>
          </Box>
          <Box sx={{ width: "6.6rem" }}>
            <Button variant="contained" data-testid="create-services-submit" onClick={handleSubmit} fullWidth>
              {t("swarm.create")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
