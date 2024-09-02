import { TextInput } from "@cgi-learning-hub/ui";
import { Box, Button, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DropdownList } from "@/components/DropDownList";
import { ExpandCirclesIcon } from "@/components/SVG/ExpandCirclesIcon";
import { centerBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { MODAL_TYPE } from "@/providers/GlobalProvider/enums";
import { usersAndGroupListData } from "@/test/mocks/datasMock";
import { UsersAndGroups } from "@/types";

import { CreateServicesModal } from "../CreateServicesModal";
import { DeleteServicesModal } from "../DeleteServicesModal";
import { ReinitServicesModal } from "../ReinitServicesModal";
import { SendServicesModal } from "../SendServicesModal";
import { ServiceTable } from "../ServiceTable";
import { ToggleStatusServicesModal } from "../ToggleStatusServicesModal";
import { UpdateServicesModal } from "../UpdateServicesModal";
import {
  buttonWrapperStyle,
  filtersAndButtonsWrapperStyle,
  paperStyle,
  searchAndFilterWrapperStyle,
  tableViewWrapperStyle,
} from "./styles";
import { useCreatedropDownListItems } from "./utils";

export const TableView: FC = () => {
  const { t } = useTranslation();
  const {
    displayModals: {
      createServices,
      deleteServices,
      sendServices,
      toggleStatusServices,
      reinitServices,
      updateServices,
    },
    handleDisplayModal,
    tableSelected,
    tableQueryParams: { query },
    setTableQueryParams,
  } = useGlobalProvider();
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<UsersAndGroups[]>([]);
  const users = usersAndGroupListData;
  const DropDownListItems = useCreatedropDownListItems();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTableQueryParams(prevState => ({ ...prevState, query: value }));
    if (!isListOpen) setIsListOpen(true);
  };

  useEffect(() => {
    const lowercaseSearch = query.toLowerCase();
    const filtered = users.reduce((acc: UsersAndGroups[], user) => {
      if (acc.length < 5 && user.name.toLowerCase().includes(lowercaseSearch)) {
        return [...acc, user];
      }
      return acc;
    }, []);
    setFilteredUsers(filtered);
  }, [query, users]);

  return (
    <Box sx={tableViewWrapperStyle} onClick={() => setIsListOpen(false)}>
      <Typography variant="h2">{t("swarm.table.view.title")}</Typography>
      <Box sx={filtersAndButtonsWrapperStyle}>
        <Box sx={searchAndFilterWrapperStyle}>
          <Box sx={{ width: "20%", position: "relative" }}>
            <Typography variant="body1" sx={{ color: "black", fontWeight: "500" }}>
              Recherche
            </Typography>
            <TextInput
              name="query"
              placeholder={t("swarm.table.view.search.input.placeHolder")}
              fullWidth
              value={query}
              onChange={handleChange}
            />
            {query.length >= 3 && isListOpen && (
              <Paper sx={paperStyle}>
                {filteredUsers.length ? (
                  <List>
                    {filteredUsers.map(item => (
                      <ListItemButton
                        key={item.id}
                        onClick={() => {
                          setTableQueryParams(prevState => ({ ...prevState, query: item.name }));
                          setIsListOpen(false);
                        }}>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ padding: ".5rem" }} variant="body1">
                    {t("swarm.table.view.search.input.empty")}
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        </Box>
        <Box sx={buttonWrapperStyle}>
          {!!tableSelected.length && (
            <>
              <Button
                variant="outlined"
                data-testid="toggle-status-services-button"
                onClick={() => handleDisplayModal(MODAL_TYPE.TOGGLE_STATUS)}>
                {t("swarm.button.activate")}
              </Button>
              <DropdownList
                items={DropDownListItems}
                variant="outlined"
                buttonText={
                  <Box sx={{ ...centerBoxStyle, gap: "1rem" }}>
                    {t("swarm.button.options")}
                    <Box sx={{ height: "1rem" }}>
                      <ExpandCirclesIcon />
                    </Box>
                  </Box>
                }
              />
            </>
          )}
          <Button
            variant="contained"
            data-testid="create-services-button"
            onClick={() => handleDisplayModal(MODAL_TYPE.CREATE)}>
            {t("swarm.create.service.button")}
          </Button>
        </Box>
      </Box>
      <ServiceTable />
      <CreateServicesModal isOpen={createServices} handleClose={() => handleDisplayModal(MODAL_TYPE.CREATE)} />
      <DeleteServicesModal isOpen={deleteServices} handleClose={() => handleDisplayModal(MODAL_TYPE.DELETE)} />
      <SendServicesModal isOpen={sendServices} handleClose={() => handleDisplayModal(MODAL_TYPE.SEND)} />
      <ToggleStatusServicesModal
        isOpen={toggleStatusServices}
        handleClose={() => handleDisplayModal(MODAL_TYPE.TOGGLE_STATUS)}
      />
      <ReinitServicesModal isOpen={reinitServices} handleClose={() => handleDisplayModal(MODAL_TYPE.REINIT)} />
      <UpdateServicesModal isOpen={updateServices} handleClose={() => handleDisplayModal(MODAL_TYPE.UPDATE)} />
    </Box>
  );
};
