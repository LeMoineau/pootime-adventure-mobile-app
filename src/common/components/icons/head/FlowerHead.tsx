import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function FlowerHead({
  size,
  fillColor,
  ...props
}: { size?: number; fillColor?: string } & SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 15.412 21.7" {...props}>
      <Path
        d="M-657.387 99.79c-4.38 5.102 6.465 6.566 3.97.398 3.308 6.575 8.151-1.343 1.917-2.547 6.203 1.252 3.819-5.183-1.124-1.918 7.409-3.64-6.726-8.678-2.99-.832-3-6.862-8.794.521-2.5 1.328-6.494-1.558-4.198 8.461.727 3.572z"
        fill={fillColor}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#020201"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(662.657 -90.18)"
      />
    </Svg>
  );
}
