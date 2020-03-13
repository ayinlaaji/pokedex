import { CSSProperties } from "react";

export const form = {
  zIndex: 1,
  paddingLeft: "2.3em"
};

export const inputDropDown = (isHighlighted: boolean): CSSProperties => ({
  padding: "5px",
  background: isHighlighted ? "lightgray" : "white"
});
