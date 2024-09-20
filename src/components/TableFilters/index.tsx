import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Button, Checkbox, ClickAwayListener, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { FC, MouseEvent, useState } from "react";

import { centerBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { SERVICE_TYPE } from "@/providers/GlobalProvider/enums";

import { filtersButtonsWrapperStyle } from "./style";
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
  const reinitOneSubFilter = (subType: SUBFILTERS_STATE) => {
    setTableQueryParams(prevState => ({ ...prevState, [subType]: [] }));
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
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleFiltersClose}>
          {options === filtersOptions && (
            <Box>
              <MenuItem
                onClick={() =>
                  setTableQueryParams(prevState => ({ ...prevState, groups: [], classes: [], structures: [] }))
                }
                sx={{ borderBottom: `1px solid gray` }}>
                <ListItemText primary="Réinitialiser les filtres" />
              </MenuItem>
              {options.map((option, index) => (
                <MenuItem key={index} onClick={event => handleSubFilterSelect(event, option.sub)}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.label} />
                  <ListItemIcon>
                    {option.sub === toggleSubFilters ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                  </ListItemIcon>
                </MenuItem>
              ))}
            </Box>
          )}
          {options === servicesOptions &&
            options.map((option, index) => (
              <MenuItem key={index} onClick={() => handleTypeToggle(option.state)}>
                <Box sx={{ ...spaceBetweenBoxStyle, flexWrap: "nowrap" }}>
                  <Box sx={{ width: "1.5rem", height: "1.5rem" }}>{option.icon}</Box>
                  <ListItemText primary={option.label} />
                  <Checkbox
                    checked={tableQueryParams.types?.includes(option.state)}
                    onChange={() => handleTypeToggle(option.state)}
                    onClick={e => e.stopPropagation()}
                  />
                </Box>
              </MenuItem>
            ))}
          {!!toggleSubFilters && (
            <Menu
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
              }}>
              <Box>
                <MenuItem onClick={() => reinitOneSubFilter(toggleSubFilters)} sx={{ borderBottom: `1px solid gray` }}>
                  <ListItemText primary="Réinitialiser les filtres" />
                </MenuItem>
                {subOptions.map(subOption => (
                  <MenuItem onClick={() => handleSubOptionToggle(subOption.id, toggleSubFilters)} key={subOption.id}>
                    <Box sx={{ ...spaceBetweenBoxStyle, flexWrap: "nowrap" }}>
                      <ListItemText primary={subOption.name} />
                      <Checkbox
                        checked={tableQueryParams[toggleSubFilters]?.includes(subOption.id)}
                        onChange={() => handleSubOptionToggle(subOption.id, toggleSubFilters)}
                        onClick={e => e.stopPropagation()}
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          )}
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};
