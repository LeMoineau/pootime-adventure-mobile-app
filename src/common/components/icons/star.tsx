import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function StarIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 24.909}
      height={size ?? 23.862}
      viewBox="0 0 6.591 6.314"
      {...props}
    >
      <Path
        d="M136.138 181.726c-.414-.084.062-1.393.362-2.29-.657-.53-1.697-1.092-1.396-1.587.245-.359 1.157-.144 2.014-.2.237-.714.518-1.726.983-1.656.449-.033.697.957.954 1.655.812.012 1.9-.127 2.03.19.333.577-.735.98-1.39 1.508.298.898.657 2.313.235 2.36-.258.37-1.134-.625-1.843-1.197-.722.58-1.645 1.567-1.949 1.217z"
        fill="#4a9fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.404"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        transform="translate(-134.804 -175.738)"
      />
    </Svg>
  );
}
