import { centerBoxStyle } from "@/core/style/boxStyles";

export const datePickerStyles = {
  textField: {
    width: "10rem",
  },
  input: {
    bgcolor: "transparent",
    "&:hover": {
      bgcolor: "transparent",
    },
    "&.Mui-focused": {
      bgcolor: "transparent",
    },
  },
  inputProps: {
    sx: {
      letterSpacing: ".1rem",
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
      "&::placeholder": {
        letterSpacing: ".3rem",
        color: "black",
        opacity: 1,
        fontWeight: "bold",
      },
    },
  },
};

export const openPickerIconProps = {
  fill: "black" as const,
};

export const openPickerButtonProps = {
  color: "primary" as const,
};

export const textFieldProps = {
  variant: "filled" as const,
  focused: true,
  color: "primary" as const,
};
export const customDatePickerWrapperStyle = {
  ...centerBoxStyle,
  width: "auto",
  gap: ".3rem",
};

export const infoIconStyle = {
  boxSizing: "border-box",
  paddingTop: ".3rem",
  width: "1rem",
  color: "#5F5F5F",
};
