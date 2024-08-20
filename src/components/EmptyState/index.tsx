import { Typography } from "@cgi-learning-hub/ui";
import { FC } from "react";

import * as ST from "./style";
import { EmptyStateProps } from "./types";

export const EmptyState: FC<EmptyStateProps> = ({ imageOrSVG, text }) => (
  <ST.EmptyStateWrapper data-testid="empty-state">
    <ST.ImgWrapper>
      {typeof imageOrSVG === "string" ? <ST.Img src={imageOrSVG} /> : <imageOrSVG.component {...imageOrSVG.props} />}
    </ST.ImgWrapper>
    <Typography variant="body1" textAlign="center">
      {text}
    </Typography>
  </ST.EmptyStateWrapper>
);
