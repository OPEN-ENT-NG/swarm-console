import { Tab, styled } from "@mui/material";

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));
