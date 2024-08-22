import { FC } from "react";

import { CustomSVGProps } from "./types";

export const ExpandCirclesIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 3 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.25" cy="5.25" r="1.25" fill={fill || "currentColor"} />
    <circle cx="1.25" cy="1.25" r="1.25" fill={fill || "currentColor"} />
    <circle cx="1.25" cy="9.25" r="1.25" fill={fill || "currentColor"} />
  </svg>
);
