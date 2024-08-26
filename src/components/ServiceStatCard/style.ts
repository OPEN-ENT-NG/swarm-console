import { columnBoxStyle, flexStartBoxStyle, spaceBetweenBoxStyle } from "@/core/style/boxStyles";
import theme from "@/core/style/theme";

export const serviceStatCardStyle = {
  width: "36rem",
  minWidth: "20rem",
  background: "white",
  borderRadius: ".4rem",
  padding: "3rem 2.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};

export const titleWrapperStyle = { ...flexStartBoxStyle, gap: "1.5rem" };

export const statBoxStyle = {
  ...columnBoxStyle,
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  gap: "1.5rem",
  height: "8rem",
  padding: "1rem 1.5rem",
  borderRadius: ".4rem",
  border: `1px solid ${theme.palette.primary.main}`,
};

export const textWrapperStyle = {
  ...spaceBetweenBoxStyle,
};

export const SVGWrapperStyle = {
  width: "4.7rem",
  height: "4.7rem",
};
