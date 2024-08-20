import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3C2386",
    },
    red: {
      main: "#E20037",
    },
    background: {
      default: "#F9F9F9",
    },
    text: {
      primary: "#5F5F5F",
      secondary: "#000000",
    },
  },
  typography: {
    fontFamily: "robotoRegular",
    fontSize: 16,
    h1: {
      fontSize: "1.2rem",
      color: "#3C2386",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.1rem",
      color: "#000000",
    },
    h3: {
      fontSize: "1rem",
      color: "#000000",
    },
    body1: {
      fontSize: ".8rem",
      color: "#5F5F5F",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "robotoRegular",
          textTransform: "none",
          minWidth: "0",
        },
        contained: {
          backgroundColor: "#3C2386",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2A1960",
          },
        },
        outlined: {
          backgroundColor: "#FFFFFF",
          color: "#3C2386",
          borderColor: "#FFFFFF",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            borderColor: "rgba(0, 0, 0, 0.01)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottomColor: "#3C2386",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#3C2386",
          },
          "&.Mui-focused:after": {
            borderBottomColor: "#3C2386",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#3C2386",
          color: "#FFFFFF",
        },
        deleteIcon: {
          color: "#E0E0E0",
          "&:hover": {
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
