import { FC } from "react";

import { CustomSVGProps } from "./types";

export const LinkIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.9361 15.4363H2.06354V2.56373H8.49982V0.724792H2.06354C1.04294 0.724792 0.224609 1.55231 0.224609 2.56373V15.4363C0.224609 16.4477 1.04294 17.2752 2.06354 17.2752H14.9361C15.9475 17.2752 16.775 16.4477 16.775 15.4363V9H14.9361V15.4363ZM10.3388 0.724792V2.56373H13.6396L4.60127 11.6021L5.89772 12.8985L14.9361 3.86018V7.16106H16.775V0.724792H10.3388Z"
      fill={fill || "currentColor"}
    />
  </svg>
);
