import { styled } from "@mui/material";

import { TitleWrapperProps } from "./types";

export const TitleWrapper = styled("div")<TitleWrapperProps>(({ placement }) => {
  const justifyContentMap = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
  };

  const justifyContent = justifyContentMap[placement] || "center";

  return {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent,
    padding: "2.5rem 0 3.5rem 0",
    width: "100%",
  };
});
