import { CloseIcon } from "@cgi-learning-hub/ui";
import { Box, Button, Modal, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { columnBoxStyle, flexStartBoxStyle, modalBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE, SERVICE_TYPE } from "@/providers/GlobalProvider/enums";
import { ModalProps } from "@/types";

import { actionButtonsBoxStyle, supressDateWrapperStyle } from "../CreateServicesModal/style";
import { serviceMapping } from "../CreateServicesModal/utils";
import { SVGWrapper } from "./style";
import { InputValueState } from "./types";
import { isButtonDisabled } from "./utils";

export const UpdateServicesModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<InputValueState>([]);
  const {
    displayModals: { confirmation },
    handleDisplayModal,
    tableSelected,
  } = useGlobalProvider();

  const handleCancel = () => {
    handleClose();
    setInputValue([]);
  };

  const handleDateChange = (type: SERVICE_TYPE, newValue: Dayjs | null) => {
    setInputValue(prevState => {
      if (newValue === null) {
        return prevState.filter(item => item.type !== type);
      }
      const newDate = newValue.startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const existingIndex = prevState.findIndex(item => item.type === type);
      if (existingIndex !== -1) {
        return prevState.map((item, index) => (index === existingIndex ? { ...item, date: newDate } : item));
      } else {
        return [...prevState, { type, date: newDate }];
      }
    });
  };

  const handleSubmit = () => {
    handleClose();
    setInputValue([]);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="update-services-modal"
      aria-describedby="update-services">
      <Box sx={modalBoxStyle} data-testid="update-services-modal">
        <Box sx={spaceBetweenBoxStyle}>
          <Typography variant="h1">{t("swarm.update.service.modal.title")}</Typography>
          <Button data-testid="close-update-services-modal" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("swarm.modal.users.selected", { count: tableSelected.length })}
        </Typography>
        <Box sx={{ ...columnBoxStyle, gap: "1rem" }}>
          {serviceMapping.map(item => {
            const date = inputValue.find(value => value.type === item.name)?.date;
            return (
              <Box sx={columnBoxStyle} key={item.name}>
                <Box sx={{ ...flexStartBoxStyle, gap: ".5rem" }}>
                  <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    {t("swarm.update.service.modal.label", { type: t(item.label) })}
                  </Typography>
                  <Box sx={SVGWrapper}>
                    <item.icon />
                  </Box>
                  <Typography variant="body1">{":"}</Typography>
                </Box>
                <Box sx={{ ...supressDateWrapperStyle, justifyContent: "flex-start" }}>
                  <Typography variant="body1" sx={{ fontWeight: "600", paddingTop: "1rem", marginLeft: "4rem" }}>
                    {t("swarm.table.column.supressDate")} :
                  </Typography>
                  <CustomDatePicker
                    value={date ? dayjs(date) : null}
                    onChange={newValue => handleDateChange(item.name, newValue)}
                  />
                </Box>
              </Box>
            );
          })}
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
