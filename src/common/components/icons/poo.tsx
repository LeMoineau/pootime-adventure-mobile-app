import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function Poo({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) {
  return (
    <Svg width={61.936} height={52.477} viewBox="0 0 16.387 13.885" {...props}>
      <Path
        d="M80.646 219.147c1.896 1.919 12.93 1.679 14.625.364.66-1.629.492-2.947-.947-3.788.438-1.106 1.622-2.622-1.727-4.345.802-1.059.36-1.843-1.457-2.502-1.915.916-4.504.066-6.787-1.119-1.032.841-2.113 1.98-.64 3.516-1.02.53-3.167 1.298-1.786 4.092-1.135.85-2.082 1.977-1.281 3.782z"
        fill={fillColor ?? "#c8a000"}
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-79.805 -207.207)"
      />
    </Svg>
  );
}
