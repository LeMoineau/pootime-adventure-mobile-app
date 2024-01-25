import * as React from "react";
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
export default function StatsIcons({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 54.156}
      height={size ?? 54.156}
      viewBox="0 0 14.329 14.329"
      {...props}
    >
      <Defs>
        <LinearGradient id="a">
          <Stop offset={0} stopColor="#ffc001" stopOpacity="1" />
          <Stop offset={1} stopColor="#fff182" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        d="m59.531 190.5 1.323-5.292 1.323 5.292 5.292 1.323-5.292 1.323-1.323 5.292-1.323-5.292-5.291-1.323z"
        fill="url(#a)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-53.69 -184.659)"
      />
    </Svg>
  );
}
