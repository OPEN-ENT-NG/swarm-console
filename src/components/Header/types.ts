import { SVGProp } from "../SVG/types";

export type HeaderItem = string | SVGProp;

export interface HeaderProps {
  items?: HeaderItem[];
}
