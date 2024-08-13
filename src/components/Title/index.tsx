import { Typography } from "@cgi-learning-hub/ui";
import { FC } from "react";

import * as ST from "./style";
import { TitleProps } from "./types";

export const Title: FC<TitleProps> = ({ text, placement = "start" }) => (
  <ST.TitleWrapper placement={placement} data-testid="title-wrapper">
    <Typography variant="h1" color="primary" fontWeight="bold">
      {text}
    </Typography>
  </ST.TitleWrapper>
);
