import { styled } from "@mui/material";

import { TitleWrapperProps } from "./types";

export const TitleWrapper = styled("div")<TitleWrapperProps>(({ placement }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: placement === "start" ? "flex-start" : placement === "end" ? "flex-end" : "center",
  padding: "2.5rem 0 3.5rem 0",
  width: "100%",
}));
