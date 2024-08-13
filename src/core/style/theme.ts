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
    },
    body1: {
      fontSize: ".8rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "robotoRegular",
          textTransform: "none",
        },
        contained: {
          backgroundColor: "#3C2386",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2A1960",
          },
        },
      },
    },
  },
});

export default theme;
