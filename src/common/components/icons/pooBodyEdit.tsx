import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function PooBodyEditIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 50.709}
      height={size ?? 44.668}
      viewBox="0 0 13.417 11.818"
      {...props}
    >
      <Path
        d="M78.44 191.516c-.205 4.12-.09 5.038.518 5.007.953-.048.875-3.367 1.466-5.172l2.244-.083c.32 1.75.543 5.65 1.405 5.296.56-.23.65-.355.804-5.331l-.036-2.599c1.98 2.096 2.213 2.401 2.857 2.322 1.08-.3-.722-3.239-2.81-5.298h-6.685c-1.26 1.072-3.122 5.248-2.61 5.496.538.262.531.732 2.988-2.709z"
        fill="#fff"
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.899999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeDasharray="none"
        strokeOpacity="1"
        transform="translate(-75.055 -185.208)"
      />
    </Svg>
  );
}
