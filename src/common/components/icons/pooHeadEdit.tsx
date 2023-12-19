import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function PooHeadEditIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 61.936}
      height={size ?? 52.477}
      viewBox="0 0 16.387 13.885"
      {...props}
    >
      <Path
        d="M110.784 195.166c1.896 1.92 12.93 1.68 14.625.364.66-1.628.492-2.946-.947-3.788.438-1.106 1.622-2.621-1.727-4.344.802-1.06.36-1.843-1.457-2.502-1.915.916-4.504.066-6.787-1.119-1.032.84-2.113 1.98-.64 3.516-1.02.529-3.167 1.298-1.786 4.092-1.135.85-2.082 1.976-1.281 3.781z"
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-109.943 -183.227)"
      />
    </Svg>
  );
}
