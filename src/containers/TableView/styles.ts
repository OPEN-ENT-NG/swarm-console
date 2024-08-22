import { columnBoxStyle, flexEndBoxStyle, flexStartBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import theme from "@/core/style/theme";

export const tableViewWrapperStyle = {
  ...columnBoxStyle,
  gap: "1rem",
};

export const paperStyle = {
  position: "absolute",
  marginTop: theme.spacing(1),
  left: 0,
  right: 0,
  zIndex: 10,
};

export const searchAndFilterWrapperStyle = {
  ...flexStartBoxStyle,
};

export const filtersAndButtonsWrapperStyle = {
  ...spaceBetweenBoxStyle,
};

export const buttonWrapperStyle = {
  ...flexEndBoxStyle,
  gap: ".5rem",
};
