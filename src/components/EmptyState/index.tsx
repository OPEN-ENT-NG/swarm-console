import { Typography } from "@cgi-learning-hub/ui";
import { FC } from "react";

import { EmptyStateWrapper, Img, ImgWrapper } from "./style";
import { EmptyStateProps } from "./types";

export const EmptyState: FC<EmptyStateProps> = ({ imageOrSVG, text }) => (
  <EmptyStateWrapper data-testid="empty-state">
    <ImgWrapper>
      {typeof imageOrSVG === "string" ? <Img src={imageOrSVG} /> : <imageOrSVG.component {...imageOrSVG.props} />}
    </ImgWrapper>
    <Typography variant="body1" textAlign="center">
      {text}
    </Typography>
  </EmptyStateWrapper>
);
