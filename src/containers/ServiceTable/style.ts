import { Box, styled } from "@mui/material";

import { centerBoxStyle, columnBoxStyle } from "@/core/style/boxStyles";
import { SERVICE_STATE_DISPLAY } from "@/providers/GlobalProvider/enums";

import { SVGWrapperProps, StatusPointProps } from "./types";

export const ServiceWrapperStyle = {
  ...columnBoxStyle,
  alignItems: "center",
  gap: ".8rem",
};

export const typoStyle = {
  textWrap: "nowrap",
  color: "#000000",
  fontWeight: "500",
  fontSize: "1rem",
  minWidth: "5rem",
  textAlign: "left" as const,
  display: "inline-block",
};

export const serviceStatusWrapperStyle = {
  ...centerBoxStyle,
  justifyContent: "center",
  gap: ".5rem",
  height: "1.5rem",
};

export const SVGWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== "isActive",
})<SVGWrapperProps>(({ isActive, theme }) => ({
  width: "1.5rem",
  color: isActive ? theme.palette.text.secondary : theme.palette.text.disabled,
}));

export const StatusPoint = styled(Box)<StatusPointProps>(({ status }) => {
  const statusColorMap = {
    [SERVICE_STATE_DISPLAY.ACTIVE]: "#228665",
    [SERVICE_STATE_DISPLAY.INACTIVE]: "#E20037",
    [SERVICE_STATE_DISPLAY.WAITING]: "#FFC900",
  };

  return {
    width: ".7rem",
    height: ".7rem",
    borderRadius: "50%",
    background: statusColorMap[status] || "#FFC900",
  };
});

export const tableSortLabelWrapper = { position: "relative", display: "inline-block" };

export const tableEmptyStyle = { ...centerBoxStyle, width: "100%", fontSize: "1rem", height: "2.5rem" };
