import { centerBoxStyle, columnBoxStyle } from "@/core/style/boxStyles";

export const toggleWrapperStyle = {
  ...columnBoxStyle,
  padding: ".2rem",
  alignitems: "center",
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.01)" },
  height: "100%",
  gap: "1.5rem",
};

export const SVGWrapper = {
  height: "1.8rem",
  width: "1.8rem",
};

export const toggleServiceStackStyle = {
  width: "100%",
  marginTop: "2rem",
};

export const textAndSVGWrapper = { ...centerBoxStyle, gap: "1rem" };
