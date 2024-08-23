import { Box, Divider, List, ListItem } from "@mui/material";
import React, { FC, useState } from "react";

import { DropdownButton, DropdownListWrapper, DropdownWrapper, SVGWrapperStyle, StyledListItemText } from "./style";
import { DropdownListProps } from "./types";

export const DropdownList: FC<DropdownListProps> = ({ items, variant = "contained", buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (OnClick: () => void) => {
    OnClick();
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={handleToggle} variant={variant}>
        {buttonText}
      </DropdownButton>
      {isOpen && (
        <DropdownListWrapper styledvariant={variant}>
          <List sx={{ paddingTop: "0", paddingBottom: "0" }}>
            {items.map((item, index) => (
              <>
                {item.divider && <Divider />}
                <ListItem key={`option-${index}`} onClick={() => handleItemClick(item.OnClick)}>
                  <StyledListItemText
                    primary={<Box sx={SVGWrapperStyle}>{item.primary}</Box>}
                    secondary={item.secondary}
                  />
                </ListItem>
              </>
            ))}
          </List>
        </DropdownListWrapper>
      )}
    </DropdownWrapper>
  );
};