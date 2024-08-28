import { FC } from "react";

import { HeaderWrapper, Img, ImgWrapper } from "./style";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = ({ items = [] }) => (
  <HeaderWrapper>
    {items.map((item, index) => (
      <ImgWrapper key={`header-item-${index + Date.now()}`}>
        {typeof item === "string" ? (
          <Img src={item} alt={`Header image ${index}`} />
        ) : (
          <item.component {...item.props} />
        )}
      </ImgWrapper>
    ))}
  </HeaderWrapper>
);
