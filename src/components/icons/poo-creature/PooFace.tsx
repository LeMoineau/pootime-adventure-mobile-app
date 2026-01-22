import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function PooFace({
  fillColor,
  ...props
}: {
  fillColor: string;
} & SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M148.51 198.69c.047-3.52 6.625-3.519 6.784-.113.422 2.77-6.279 4.614-6.783.113z"
        fill={fillColor}
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.9"
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
