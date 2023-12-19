import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
export default function PlusIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 800}
      height={size ?? 800}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 12h12m-6-6v12"
      />
    </Svg>
  );
}
