import * as React from "react";
import Svg, {
  SvgProps,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
export default function PooUltiIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 83.098}
      height={size ?? 77.916}
      viewBox="0 0 21.986 20.615"
      {...props}
    >
      <Defs>
        <LinearGradient id="a">
          <Stop offset={0} stopColor="#ffc001" stopOpacity="1" />
          <Stop offset={1} stopColor="#fff182" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path
        d="m98.36 151.53 1.037-3.605 3.505 1.914 3.567-2.779 1.468 3.576h4.575l-1.417 3.401 3.795 2.217-2.926 2.978 1.695 3.161-3.589.656-.985 3.324-3.556-2.678-3.384 3.076-1.875-3.678-4.895.966 1.221-4.122-2.788-1.956 3.086-2.424-1.957-2.744z"
        fill="url(#a)"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.903999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        transform="translate(-93.356 -146.608)"
      />
      <Path
        d="M97.979 160.603c1.615 1.634 11.014 1.43 12.457.31.562-1.387.42-2.51-.806-3.226.373-.943 1.381-2.234-1.471-3.701.683-.902.307-1.57-1.241-2.132-1.631.78-3.837.057-5.781-.952-.88.716-1.8 1.687-.545 2.995-.87.45-2.698 1.105-1.522 3.485-.966.724-1.774 1.683-1.091 3.22z"
        fill="#c8a000"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.936956"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-93.356 -146.608)"
      />
    </Svg>
  );
}
