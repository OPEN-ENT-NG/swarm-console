import { Box, styled } from "@mui/material";

import { centerBoxStyle, columnBoxStyle } from "@/core/style/boxStyles";
import { SERVICE_STATUS } from "@/providers/GlobalProvider/enums";

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

export const SVGWrapper = styled(Box)<SVGWrapperProps>(({ isActive, theme: { palette } }) => ({
  width: "1.5rem",
  color: isActive ? palette.text.secondary : palette.text.disabled,
}));

export const StatusPoint = styled(Box)<StatusPointProps>(({ status }) => ({
  width: ".7rem",
  height: ".7rem",
  borderRadius: "50%",
  background: status === SERVICE_STATUS.ACTIVE ? "#228665" : status === SERVICE_STATUS.INACTIVE ? "#E20037" : "#FFC900",
}));

export const tableSortLabelWrapper = { position: "relative", display: "inline-block" };
