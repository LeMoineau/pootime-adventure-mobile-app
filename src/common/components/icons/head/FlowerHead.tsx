import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function FlowerHead({
  size,
  fillColor,
  ...props
}: { size?: number; fillColor?: string } & SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M149.77 200.33c-6.753 5.44 7.32 8.045 3.374.1 3.205 8.128 8.377-.545 2.15-1.853 6.203 1.252 4.05-5.877-.893-2.613 7.409-3.64-6.958-7.983-3.22-.137-2.762-8.558-10.4.301-2.502 1.328-6.671-1.342-4.78 9.214 1.092 3.175z"
        fill={fillColor ?? "#fff"}
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#020201"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-143.59 -190.275)"
      />
    </Svg>
  );
}
