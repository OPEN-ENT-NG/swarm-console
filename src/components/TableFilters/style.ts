import { ListItemText, Menu, MenuItem, Paper, styled } from "@mui/material";

import { flexStartBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import theme from "@/core/style/theme";

export const filtersButtonsWrapperStyle = {
  ...flexStartBoxStyle,
  gap: "1rem",
};

export const StyledMenu = styled(Menu)(({ theme }) => ({
  paddingTop: "0",
  paddingBottom: "0",
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    outline: "none !important",
  },
  "& .MuiList-root": {
    paddingTop: "0",
    paddingBottom: "0",
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  ...spaceBetweenBoxStyle,
  gap: ".5rem",
  flexWrap: "nowrap",
  paddingTop: ".5rem",
  paddingLeft: ".5rem",
  paddingBottom: ".5rem",
  paddingRight: ".5rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiListItemText-primary": {
    color: theme.palette.primary.main,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  "& .MuiListItemText-secondary": {
    color: theme.palette.primary.main,
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontSize: "1rem",
  fontWeight: "400",
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  outline: "none !important",
}));

export const itemBorder = {
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "5%",
    width: "90%",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
};

export const StyledReinitListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "1rem",
    color: theme.palette.grey[500],
    textAlign: "center",
    ...itemBorder,
  },
}));
