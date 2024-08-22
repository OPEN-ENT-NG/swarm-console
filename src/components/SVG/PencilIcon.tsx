import { FC } from "react";

import { CustomSVGProps } from "./types";

export const PencilIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 11.8754V15H3.12457L12.34 5.78461L9.21539 2.66005L0 11.8754ZM14.7563 3.36828C15.0812 3.04333 15.0812 2.5184 14.7563 2.19345L12.8066 0.243716C12.4816 -0.0812387 11.9567 -0.0812387 11.6317 0.243716L10.1069 1.7685L13.2315 4.89307L14.7563 3.36828Z"
      fill={fill || "currentColor"}
    />
  </svg>
);
