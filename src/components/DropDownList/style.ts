import { Button, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { StyledProps } from "./types";

export const DropdownWrapper = styled("div")({
  position: "relative",
});

export const DropdownButton = styled(Button)(() => ({
  justifyContent: "space-between",
}));

export const DropdownListWrapper = styled(Paper)<StyledProps>(({ theme, styledvariant }) => ({
  position: "absolute",
  width: "fit-content",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 10,
  overflowY: "auto",
  marginTop: theme.spacing(1),
  backgroundColor: styledvariant === "contained" ? theme.palette.primary.main : theme.palette.background.paper,
  color: styledvariant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
  fontSize: "1rem",
  fontWeight: "400",
  border:
    styledvariant === "outlined"
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "& .MuiListItem-root": {
    "&:hover": {
      backgroundColor: styledvariant === "contained" ? theme.palette.primary.dark : theme.palette.action.hover,
    },
  },
  "& .MuiListItemText-primary": {
    color: styledvariant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
  },
  "& .MuiListItemText-secondary": {
    color: styledvariant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
  },
  outline: "none !important",
  "&.MuiPaper-root": {
    outline: "none !important",
    border: "none !important",
  },
  "&:focus": {
    outline: "none !important",
    border: "none !important",
    boxShadow: "none !important",
  },
  "&::before, &::after": {
    display: "none !important",
  },
  transition: "none !important",
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  wrap: "0.5rem",
  "& .MuiListItemText-primary": {
    marginRight: theme.spacing(1),
  },
}));

export const SVGWrapperStyle = {
  width: "1rem",
  ml: 1,
};
