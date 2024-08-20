import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface CustomDatePickerProps {
  value: Dayjs | null;
  onChange: DatePickerProps<Dayjs>["onChange"];
  displayInfo?: boolean;
}
