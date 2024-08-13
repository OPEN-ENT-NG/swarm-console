type placementType = "start" | "center" | "end";

export interface TitleProps {
  text: string;
  placement?: placementType;
}

export interface TitleWrapperProps {
  placement: placementType;
}
