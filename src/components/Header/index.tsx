import { FC } from "react";

import * as ST from "./style";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ items = [] }) => (
  <ST.HeaderWrapper>
    {items.map((item, index) => (
      <ST.ImgWrapper key={`header-item-${index}`}>
        {typeof item === "string" ? (
          <ST.Img src={item} alt={`Header image ${index}`} />
        ) : (
          <item.component {...item.props} />
        )}
      </ST.ImgWrapper>
    ))}
  </ST.HeaderWrapper>
);
