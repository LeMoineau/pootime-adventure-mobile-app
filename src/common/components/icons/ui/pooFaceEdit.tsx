import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function PooFaceEditIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 29.878}
      height={size ?? 24.31}
      viewBox="0 0 7.905 6.432"
      {...props}
    >
      <Path
        d="M96.971 189.687h.166M100.598 189.735l.224.035M97.231 190.644c1.181 2.341 2.406 1.753 3.65-.047z"
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.499999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-94.935 -187.421)"
      />
    </Svg>
  );
}
