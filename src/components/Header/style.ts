import { styled } from "@mui/material";

export const HeaderWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: ".4rem 1rem",
  gap: "1rem",
  backgroundColor: theme.palette.red.main,
  width: "100%",
  height: "3.5rem",
}));

export const ImgWrapper = styled("div")(() => ({
  height: "100%",
}));
export const Img = styled("img")(() => ({
  height: "100%",
  width: "100%",
}));
