import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const AureoledPooHead = ({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) => (
  <Svg width={"100%"} height={"100%"} viewBox="0 0 16.387 23.83" {...props}>
    <Path
      d="M26.082 212.95a.993 3.08 89.468 0 1 .56-1.394.993 3.08 89.468 0 1 4.31.137.993 3.08 89.468 0 1-.515 1.395.993 3.08 89.468 0 1-4.315-.123m-2.511.708a2.011 6.239 89.468 0 1 1.133-2.823 2.011 6.239 89.468 0 1 8.732.278 2.011 6.239 89.468 0 1-1.042 2.826 2.011 6.239 89.468 0 1-8.743-.249"
      fill={"#fc0"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={0.528177}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(-20.425 -198.786)"
    />
    <Path
      d="M21.266 210.726c1.896 1.919 12.93 1.679 14.625.364.66-1.629.492-2.947-.947-3.788.438-1.106 1.622-2.622-1.727-4.345.802-1.059.36-1.843-1.457-2.502-1.915.916-4.504.066-6.787-1.119-1.032.841-2.113 1.98-.64 3.516-1.021.53-3.167 1.298-1.786 4.092-1.135.85-2.082 1.977-1.281 3.782z"
      fill={fillColor ?? "#fff"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={0.9}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      strokeOpacity={1}
      transform="translate(-20.425 -198.786)"
    />
  </Svg>
);
export default AureoledPooHead;
