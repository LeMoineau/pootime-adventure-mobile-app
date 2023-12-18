import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function PooCoinIcon({
  size,
  width,
  height,
  ...props
}: { size?: number; width?: number; height?: number } & SvgProps) {
  return (
    <Svg
      width={width ?? size ?? 26.349}
      height={height ?? size ?? 22.324}
      viewBox="0 0 6.971 5.907"
      {...props}
    >
      <Path
        d="M144.246 181.315c.807.816 5.501.714 6.222.155.28-.693.21-1.254-.403-1.611.187-.471.69-1.116-.734-1.849.34-.45.153-.784-.62-1.064-.815.39-1.916.028-2.887-.476-.44.358-.9.842-.273 1.496-.434.225-1.347.552-.76 1.74-.482.362-.886.841-.545 1.609z"
        fill="#ffe25e"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.467956"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-143.888 -176.236)"
      />
    </Svg>
  );
}
