import { Box } from "@cgi-learning-hub/ui";
import { DatePicker } from "@mui/x-date-pickers";
import { FC } from "react";

import { DatePickerIcon } from "../SVG/DatePickerIcon";
import { InfoIcon } from "../SVG/InfoIcon";
import {
  customDatePickerWrapperStyle,
  datePickerStyles,
  infoIconStyle,
  openPickerButtonProps,
  openPickerIconProps,
  textFieldProps,
} from "./style";
import { CustomDatePickerProps } from "./types";

export const CustomDatePicker: FC<CustomDatePickerProps> = ({ value, onChange, displayInfo = false }) => {
  return (
    <Box sx={customDatePickerWrapperStyle}>
      <DatePicker
        format="DD/MM/YYYY"
        value={value}
        onChange={onChange}
        slots={{
          openPickerIcon: DatePickerIcon,
        }}
        slotProps={{
          openPickerIcon: openPickerIconProps,
          openPickerButton: openPickerButtonProps,
          textField: {
            ...textFieldProps,
            sx: datePickerStyles.textField,
            InputProps: {
              sx: datePickerStyles.input,
            },
            inputProps: {
              ...datePickerStyles.inputProps,
              placeholder: "--/--/----",
            },
          },
        }}
      />
      {displayInfo && (
        <Box sx={infoIconStyle}>
          <InfoIcon />
        </Box>
      )}
    </Box>
  );
};