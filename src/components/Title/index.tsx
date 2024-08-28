import { Typography } from "@cgi-learning-hub/ui";
import { FC } from "react";

import { TitleWrapper } from "./style";
import { TitleProps } from "./types";

export const Title: FC<TitleProps> = ({ text, placement = "start" }) => (
  <TitleWrapper placement={placement} data-testid="title-wrapper">
    <Typography variant="h1">{text}</Typography>
  </TitleWrapper>
);
