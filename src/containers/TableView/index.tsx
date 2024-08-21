import { TextInput } from "@cgi-learning-hub/ui";
import { Box, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { usersAndGroupListData } from "@/test/mocks/datasMock";
import { UsersAndGroups } from "@/types";

import { ServiceTable } from "../ServiceTable";
import { paperStyle, searchAndFilterWrapperStyle, tableViewWrapperStyle } from "./styles";

export const TableView: FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<UsersAndGroups[]>([]);
  const users = usersAndGroupListData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    if (!isListOpen) setIsListOpen(true);
  };

  useEffect(() => {
    const lowercaseSearch = search.toLowerCase();
    const filtered = users.reduce((acc: UsersAndGroups[], user) => {
      if (acc.length < 5 && user.name.toLowerCase().includes(lowercaseSearch)) {
        return [...acc, user];
      }
      return acc;
    }, []);
    setFilteredUsers(filtered);
  }, [search, users]);
  console.log({ search, users, filteredUsers, isListOpen });

  return (
    <Box sx={tableViewWrapperStyle} onClick={() => setIsListOpen(false)}>
      <Typography variant="h2">{t("swarm.table.view.title")}</Typography>
      <Box sx={searchAndFilterWrapperStyle}>
        <Box sx={{ width: "20%", position: "relative" }}>
          <Typography variant="body1" sx={{ color: "black", fontWeight: "500" }}>
            Recherche
          </Typography>
          <TextInput
            name="search"
            placeholder={t("swarm.table.view.search.input.placeHolder")}
            fullWidth
            value={search}
            onChange={handleChange}
          />
          {search.length >= 3 && isListOpen && (
            <Paper sx={paperStyle}>
              {filteredUsers.length ? (
                <List>
                  {filteredUsers.map(item => (
                    <ListItemButton
                      key={item.id}
                      onClick={() => {
                        setSearch(item.name);
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

      <ServiceTable />
    </Box>
  );
};
