import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function SheepQueenHead({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) {
  return (
    <Svg width={"100%"} height={"100%"} viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M-670.068 102.313c1.69.547 3.304-2.058 2.24-3.155.96.487 2.634-2.948.08-3.76 1.994-2.906-3.653-4.57-4.192-2.615-.097-2.71-6.73-1.578-5.425 1.26-2.07-.993-3.883 3.97-1.149 4.633-1.818 1.263-.062 3.977 1.514 3.181.272.696 2.02 1.763 3.31.456 1.025 1.605 3.548.815 3.622 0z"
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
        d="m-673.755 93.03-.323-2.899 1.399 1.102 1.35-1.034.74 1.267 1.677-.64-.942 2.772z"
        opacity={1}
        fill={"#fc0"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.524568}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(681.4 -89.23)"
      />
    </Svg>
  );
}
