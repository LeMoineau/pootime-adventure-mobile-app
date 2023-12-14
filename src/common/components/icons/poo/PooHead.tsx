import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function PooHead(props: SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M144.431 202.214c1.897 1.92 12.93 1.68 14.626.364.66-1.628.492-2.946-.947-3.788.438-1.106 1.622-2.622-1.727-4.344.802-1.06.36-1.843-1.457-2.503-1.915.917-4.504.066-6.787-1.118-1.032.84-2.114 1.98-.64 3.516-1.021.529-3.167 1.298-1.786 4.092-1.135.85-2.083 1.976-1.282 3.781z"
        fill="#c8a000"
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
