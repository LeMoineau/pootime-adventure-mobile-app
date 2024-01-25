import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function PooBody({
  fillColor,
  ...props
}: {
  fillColor: string;
} & SvgProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M148.474 208.596c-.204 4.12-.09 5.037.519 5.006.952-.048.875-3.367 1.465-5.172l2.244-.082c.32 1.749.543 5.649 1.405 5.295.56-.23.65-.355.804-5.33l-.035-2.6c1.98 2.097 2.213 2.402 2.856 2.323 1.08-.3-.722-3.24-2.81-5.299h-6.685c-1.26 1.073-3.121 5.248-2.61 5.496.538.262.532.733 2.988-2.708z"
        fill={fillColor}
        fillOpacity="1"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="0.7"
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
