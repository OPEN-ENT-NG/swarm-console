import { Box, Button, CloseIcon, Typography } from "@cgi-learning-hub/ui";
import { Checkbox, Divider, FormControlLabel, Modal, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { CustomDatePicker } from "@/components/CustomDatePicker";
import { UserSelectionSection } from "@/components/UserSelectionSection";
import { UserSelectionSectionRef, UsersAndGroups } from "@/components/UserSelectionSection/types";
import { modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { defaultWidthButtonWrapper } from "@/core/style/buttonStyles";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { useCreateServicesMutation, useGetUsersQuery } from "@/services/api";
import { ModalProps, OnChange } from "@/types";

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
import {
  extractIdAndName,
  initialInputValue,
  isButtonDisabled,
  serviceMapping,
  updateInputValueFromUsersAndGroups,
} from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

export const CreateServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const [inputValue, setInputValue] = useState<InputValueState>(initialInputValue);
  const [usersAndGroups, setUsersAndGroups] = useState<UsersAndGroups[]>([]);
  const { t } = useTranslation();
  const { data: usersData } = useGetUsersQuery();
  const [createServices] = useCreateServicesMutation();
  const userSelectionRef = useRef<UserSelectionSectionRef>(null);
  const { deletion_date, types } = inputValue;

  const userSelectionTranslations = {
    title: t("swarm.create.service.modal.user.selection"),
    searchPlaceholder: t("swarm.create.service.modal.search.input.placeHolder"),
    noResults: t("swarm.create.service.modal.search.user.filter.empty"),
    emptySelection: t("swarm.create.service.modal.search.user.empty"),
    expandButton: t("swarm.create.service.modal.search.user.expand"),
  };
  const handleSubmit = async () => {
    try {
      await createServices(inputValue).unwrap();

      toast.success(t("swarm.create.service.modal.creation.in.progress"), {
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

  const handleCancel = () => {
    setInputValue(initialInputValue);
    setUsersAndGroups([]);
    handleClose();
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    const newDate = newValue ? newValue.endOf("day").utc().hour(23).minute(59).second(59).valueOf() : null;
    setInputValue(prevState => ({
      ...prevState,
      deletion_date: newDate,
    }));
  };

  const handleServiceTypeChange = (serviceType: SERVICE_TYPE) => {
    setInputValue(prevState => {
      const newType = prevState.types.includes(serviceType)
        ? prevState.types.filter(type => type !== serviceType)
        : [...prevState.types, serviceType];
      return { ...prevState, types: newType };
    });
  };

  const handleCheckboxChange: OnChange = event => {
    const { name } = event.target;
    handleServiceTypeChange(name as SERVICE_TYPE);
  };

  const handleUserSelectionChange = (newSelectedUsers: UsersAndGroups[]) => {
    setUsersAndGroups(newSelectedUsers);
  };

  const handleModalClick = () => {
    userSelectionRef.current?.closeList();
  };

  useEffect(() => {
    if (!usersData) return;
    setInputValue(prevState => updateInputValueFromUsersAndGroups(prevState, usersAndGroups));
  }, [usersAndGroups]);

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
          users={usersData ? extractIdAndName(usersData) : []}
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
                    checked={types.includes(item.name)}
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
          <Typography sx={{ paddingTop: "1.5rem" }} variant="h3">
            {t("swarm.create.service.modal.supress.label")}
          </Typography>
          <CustomDatePicker
            value={deletion_date ? dayjs(deletion_date) : null}
            onChange={handleDateChange}
            displayInfo
          />
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
