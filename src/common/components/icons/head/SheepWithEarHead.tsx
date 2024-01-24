import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function SheepWithEarHead({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) {
  return (
    <Svg width={"100%"} height={"100%"} viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M-670.068 102.313c.295.91 2.41-.067 1.83-1.259 2.067-.143 1.156-2.583.519-2.865.503.593 2.385-1.947-.03-2.792 1.995-2.905-3.652-4.57-4.19-2.614-.098-2.71-6.73-1.578-5.426 1.26-2.07-.993-3.883 3.97-1.149 4.633-1.818 1.263-.062 3.977 1.514 3.181.272.696 2.02 1.763 3.31.456 1.025 1.605 3.548.815 3.622 0z"
        fill={fillColor ?? "#e5ffff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(681.4 -89.23)"
      />
      <Path
        d="M-676.376 96.667c-.648-.536-3.126-.198-2.503-2.595 2.408-1.206 2.076 1.092 3.435 1.425M-669.464 96.779c.647-.536 3.126-.197 2.503-2.594-2.409-1.207-2.077 1.092-3.435 1.425"
        fill={"#e59cd4"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(681.4 -89.23)"
      />
    </Svg>
  );
}
