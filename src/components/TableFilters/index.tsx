import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Button, Checkbox, ClickAwayListener, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { centerBoxStyle, flexStartBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

import { StyledMenu, StyledMenuItem, StyledReinitListItemText, filtersButtonsWrapperStyle, itemBorder } from "./style";
import { SUBFILTERS_STATE, SubOption, ToggleFiltersState } from "./types";
import { useFiltersMapping } from "./useFiltersMapping";
import { initialToggleFiltersState } from "./utils";

export const TableFilters: FC = () => {
  const [toggleFilters, setToggleFilters] = useState<ToggleFiltersState>(initialToggleFiltersState);
  const [toggleSubFilters, setToggleSubFilters] = useState<SUBFILTERS_STATE | null>(null);
  const { buttonsMapping, filtersOptions, servicesOptions } = useFiltersMapping();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subAnchorEl, setSubAnchorEl] = useState<null | HTMLElement>(null);
  const { services, setTableQueryParams, tableQueryParams } = useGlobalProvider();
  const { t } = useTranslation();

  const handleFilterButtonClick = (event: MouseEvent<HTMLButtonElement>, method: ToggleFiltersState) => {
    setAnchorEl(event.currentTarget);
    setToggleFilters(method);
  };

  const handleFiltersClose = () => {
    setAnchorEl(null);
    setToggleFilters(initialToggleFiltersState);
    setToggleSubFilters(null);
  };
  const handleSubFilterClose = () => {
    setSubAnchorEl(null);
    setToggleSubFilters(null);
  };
  const handleSubFilterSelect = (event: MouseEvent<HTMLLIElement>, sub: SUBFILTERS_STATE) => {
    setSubAnchorEl(event.currentTarget);
    setToggleSubFilters(sub);
  };

  const handleSubOptionToggle = (subOptionId: string, subType: SUBFILTERS_STATE) => {
    setTableQueryParams(prevState => {
      const currentIds = prevState[subType] || [];
      const updatedIds = currentIds.includes(subOptionId)
        ? currentIds.filter(id => id !== subOptionId)
        : [...currentIds, subOptionId];

      return {
        ...prevState,
        [subType]: updatedIds,
      };
    });
  };

  const handleTypeToggle = (type: SERVICE_TYPE) => {
    setTableQueryParams(prevState => {
      const currentIds = prevState.types || [];
      const updatedIds = currentIds.includes(type) ? currentIds.filter(id => id !== type) : [...currentIds, type];

      return {
        ...prevState,
        types: updatedIds,
      };
    });
  };

  const toggleAllSubFilters = (subType: SUBFILTERS_STATE) => {
    setTableQueryParams(prevState => {
      const currentIds = prevState[subType] || [];
      const allOptions =
        subType === SUBFILTERS_STATE.CLASSES
          ? services?.globalInfos?.classes || []
          : services?.globalInfos?.structures || [];

      const allOptionIds = allOptions.map(option => option.id);
      const newIds = currentIds.length === allOptionIds.length ? [] : allOptionIds;

      return {
        ...prevState,
        [subType]: newIds,
      };
    });
  };

  const areAllSubFiltersSelected = (subType: SUBFILTERS_STATE) => {
    const currentIds = tableQueryParams[subType] || [];
    const allOptions =
      subType === SUBFILTERS_STATE.CLASSES
        ? services?.globalInfos?.classes || []
        : services?.globalInfos?.structures || [];

    return currentIds.length === allOptions.length;
  };

  const isMenuOpen = toggleFilters.isFiltersOpen || toggleFilters.isServicesOpen;
  const options = toggleFilters.isFiltersOpen
    ? filtersOptions
    : toggleFilters.isServicesOpen
      ? servicesOptions
      : ([] as SubOption[]);
  const subOptions = services?.globalInfos
    ? toggleSubFilters === SUBFILTERS_STATE.CLASSES
      ? services.globalInfos.classes
      : services.globalInfos.structures
    : [];
  const subFilterToggleAllLabel =
    toggleSubFilters === SUBFILTERS_STATE.STRUCTURES ? t("swarm.filters.all.etabs") : t("swarm.filters.all.classes");

  return (
    <ClickAwayListener onClickAway={handleFiltersClose}>
      <Box sx={filtersButtonsWrapperStyle}>
        {buttonsMapping.map(item => {
          const isFilterOpen = toggleFilters[item.state];
          const method = isFilterOpen ? initialToggleFiltersState : item.method;
          return (
            <Button
              sx={{ paddingLeft: ".5rem", paddingRight: ".5rem" }}
              key={item.label}
              variant="outlined"
              data-testid="toggle-filters-button"
              onClick={event => handleFilterButtonClick(event, method)}>
              <Box sx={{ ...centerBoxStyle, gap: ".5rem" }}>
                <Box sx={{ width: "1.2rem", height: "1.2rem" }}>{item.icon}</Box>
                {item.label}
                {isFilterOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Box>
            </Button>
          );
        })}
        <StyledMenu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleFiltersClose}
          sx={{
            "& .MuiPaper-root": {
              marginTop: ".2rem",
            },
          }}>
          {options === filtersOptions && (
            <Box>
              <MenuItem
                onClick={() =>
                  setTableQueryParams(prevState => ({ ...prevState, groups: [], classes: [], structures: [] }))
                }>
                <StyledReinitListItemText primary={t("swarm.filters.reinit")} />
              </MenuItem>
              {options.map((option, index) => (
                <StyledMenuItem key={index} onClick={event => handleSubFilterSelect(event, option.sub)}>
                  <ListItemIcon sx={{ color: "black" }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.label} />
                  <ListItemIcon sx={{ color: "black" }}>
                    {option.sub === toggleSubFilters ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                  </ListItemIcon>
                </StyledMenuItem>
              ))}
            </Box>
          )}
          {options === servicesOptions &&
            options.map((option, index) => (
              <StyledMenuItem key={index} onClick={() => handleTypeToggle(option.state)}>
                <Box sx={{ ...spaceBetweenBoxStyle, gap: "1rem", flexWrap: "nowrap" }}>
                  <Box sx={{ ...flexStartBoxStyle, flexWrap: "nowrap", gap: ".5rem" }}>
                    <Box sx={{ width: "1.5rem", height: "1.5rem", color: "black" }}>{option.icon}</Box>
                    <ListItemText primary={option.label} />
                  </Box>
                  <Checkbox
                    checked={tableQueryParams.types?.includes(option.state)}
                    onChange={() => handleTypeToggle(option.state)}
                    onClick={e => e.stopPropagation()}
                  />
                </Box>
              </StyledMenuItem>
            ))}
          {!!toggleSubFilters && (
            <StyledMenu
              anchorEl={subAnchorEl}
              open={!!toggleSubFilters}
              onClose={handleSubFilterClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPaper-root": {
                  marginLeft: ".2rem",
                },
              }}>
              <Box>
                {options.length > 1 && (
                  <StyledMenuItem onClick={() => toggleAllSubFilters(toggleSubFilters)} sx={itemBorder}>
                    <Box
                      sx={{
                        ...spaceBetweenBoxStyle,
                        gap: "1rem",
                      }}>
                      <ListItemText primary={subFilterToggleAllLabel} />
                      <Checkbox
                        sx={{ width: "1rem", height: "1rem" }}
                        checked={areAllSubFiltersSelected(toggleSubFilters)}
                        onChange={() => toggleAllSubFilters(toggleSubFilters)}
                        onClick={e => e.stopPropagation()}
                      />
                    </Box>
                  </StyledMenuItem>
                )}
                {subOptions.map(subOption => (
                  <StyledMenuItem
                    onClick={() => handleSubOptionToggle(subOption.id, toggleSubFilters)}
                    key={subOption.id}>
                    <Box sx={{ ...spaceBetweenBoxStyle, flexWrap: "nowrap", gap: "1rem" }}>
                      <ListItemText primary={subOption.name} />
                      <Checkbox
                        sx={{ width: "1rem", height: "1rem" }}
                        checked={tableQueryParams[toggleSubFilters]?.includes(subOption.id)}
                        onChange={() => handleSubOptionToggle(subOption.id, toggleSubFilters)}
                        onClick={e => e.stopPropagation()}
                      />
                    </Box>
                  </StyledMenuItem>
                ))}
              </Box>
            </StyledMenu>
          )}
        </StyledMenu>
      </Box>
    </ClickAwayListener>
  );
};
