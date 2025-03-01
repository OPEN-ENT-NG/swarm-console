import { FC } from "react";

import { CustomSVGProps } from "./types";

export const TrashIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM11 0.777778H8.25L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778Z"
      fill={fill ?? "currentColor"}
    />
  </svg>
);
