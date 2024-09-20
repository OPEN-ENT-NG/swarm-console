import { FC } from "react";

import { CustomSVGProps } from "./types";

export const FiltersIcon: FC<CustomSVGProps> = ({ fill }) => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.239353 2.41831C2.52425 5.08601 6.74338 10.03 6.74338 10.03V16.21C6.74338 16.7765 7.25239 17.24 7.87452 17.24H10.1368C10.7589 17.24 11.2679 16.7765 11.2679 16.21V10.03C11.2679 10.03 15.4758 5.08601 17.7606 2.41831C18.3375 1.73851 17.8059 0.76001 16.8671 0.76001H1.13295C0.194107 0.76001 -0.337527 1.73851 0.239353 2.41831Z"
      fill={fill ?? "black"}
    />
  </svg>
);
