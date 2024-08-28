import { FC } from "react";

import { CustomSVGProps } from "./types";

export const DatePickerIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="2rem" height="2rem" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.25 3H19V0.5H16.5V3H6.5V0.5H4V3H2.75C1.3625 3 0.2625 4.125 0.2625 5.5L0.25 23C0.25 24.375 1.3625 25.5 2.75 25.5H20.25C21.625 25.5 22.75 24.375 22.75 23V5.5C22.75 4.125 21.625 3 20.25 3ZM20.25 23H2.75V10.5H20.25V23ZM7.75 15.5H5.25V13H7.75V15.5ZM12.75 15.5H10.25V13H12.75V15.5ZM17.75 15.5H15.25V13H17.75V15.5ZM7.75 20.5H5.25V18H7.75V20.5ZM12.75 20.5H10.25V18H12.75V20.5ZM17.75 20.5H15.25V18H17.75V20.5Z"
      fill={fill ?? "currentColor"}
    />
  </svg>
);
