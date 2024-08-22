import { centerBoxStyle } from "@/core/style/boxStyles";

export const confirmationModalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  background: "white",
  borderRadius: ".2rem",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
};

export const textAndSVGWrapperStyle = {
  ...centerBoxStyle,
  gap: ".5rem",
  height: "1.8rem",
};

export const buttonWrapperStyle = {
  ...centerBoxStyle,
  gap: "1rem",
};
