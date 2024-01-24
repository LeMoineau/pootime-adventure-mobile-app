import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export default function SheepHead({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) {
  return (
    <Svg width={"100%"} height={"100%"} viewBox="0 0 16.387 23.83" {...props}>
      <Path
        d="M-676.754 101.693c-1.953 1.12-3.833-1.786-1.76-3.017-3.423-.636-1.446-5.605 1.15-4.633-1.306-2.838 5.327-3.97 5.424-1.26.539-1.955 6.187-.29 4.192 2.614 2.178-.163 2.428 4.964-.206 4.65.154 2.125-1.901 1.685-2.114 1.646m-6.686 0v0c-.768.242-.23 4.02-.23 4.02-1.305.207-1.333 2.715-.205 2.974-.773 2.145 2.606 1.754 2.505 1.098 1.223 2.042 3.144.574 2.88-.383-.01.892 2.945.807 1.902-1.206 1.412.138 1.049-2.849-.273-2.486-.074.02.998-3.98.107-4.017h0"
        fill={fillColor}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(681.4 -89.23)"
      />
    </Svg>
  );
}
