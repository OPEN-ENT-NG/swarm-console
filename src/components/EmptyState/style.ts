import { styled } from "@mui/material";

export const EmptyStateWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  width: "100%",
}));

export const ImgWrapper = styled("div")(() => ({
  width: "30%",
}));

export const Img = styled("img")(() => ({
  width: "100%",
}));
