import { FC } from "react";

import { CustomSVGProps } from "./types";

export const ShareIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.00714285 12.5L15 6.5L0.00714285 0.5L0 5.16667L10.7143 6.5L0 7.83333L0.00714285 12.5Z"
      fill={fill ?? "currentColor"}
    />
  </svg>
);
