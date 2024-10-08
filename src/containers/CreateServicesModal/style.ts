import { centerBoxStyle, flexEndBoxStyle } from "@/core/style/boxStyles";
import theme from "@/core/style/theme";

export const blueDividerStyle = {
  backgroundColor: theme.palette.primary.main,
  width: "2px",
};
export const checkBoxWrapperStyle = {
  ...centerBoxStyle,
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.01)" },
  height: "100%",
};

export const noHoverCheckBoxStyle = {
  "&:hover": { bgcolor: "transparent" },
  "& .MuiSvgIcon-root": {
    "&:hover": { bgcolor: "transparent" },
  },
};

export const checkBoxLabelStyle = {
  ...centerBoxStyle,
  gap: ".5rem",
  height: "1.25rem",
  userSelect: "none",
};

export const serviceStackStyle = {
  width: "100%",
  height: "4rem",
};

export const suppressDateTypographyStyle = {
  paddingTop: "1.5rem",
};

export const actionButtonsBoxStyle = {
  ...flexEndBoxStyle,
  gap: "1rem",
  marginTop: "2rem",
};

export const supressDateWrapperStyle = { ...centerBoxStyle, gap: ".5rem" };
