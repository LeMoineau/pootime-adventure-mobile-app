import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function WoolIcon({
  ratio,
  size,
  ...props
}: { ratio?: number; size?: number } & SvgProps) {
  return (
    <Svg
      width={ratio ? 129.239 * ratio : size ?? 129.239}
      height={ratio ? 110.467 * ratio : size ?? 110.467}
      viewBox="0 0 34.195 29.228"
      {...props}
    >
      <G transform="translate(340.253 -359.432)">
        <Path
          d="M341.975 233.53h.674M356.742 233.728l.914.148M343.033 237.526c4.81 9.776 9.799 7.319 14.863-.197z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={2.0619}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          strokeOpacity={1}
          transform="scale(1.91167) rotate(9.735 1409.751 184)"
        />
        <Path
          d="M-335.664 380.054c-3.816-.218-4.077-3.962-2.432-6.642-2.83-3.085.291-7.25 3.368-6.548-.362-3.222 3.694-4.59 5.987-3.274 1.964-5.23 8.226-2.582 8.98-.935 3.9-1.736 6.814-1.421 7.483 3.554 5.668-.717 6.07 5.371 3.928 7.525 2.89 3.888.064 7.95-3.366 7.723-.622 4.35-5.511 5.998-8.98 3.742-2.626 4.32-9.613 1.973-9.168-.655-4.267 2.226-7.997-2.243-5.8-4.49z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={2.147}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
        />
        <Path
          d="M-324.953 368.595c1.455-1.957 5.955-1.212 6.174 1.683 3.554-1.485 5.634 1.86 4.537 4.303M-330.191 377.902c-.298-2.936 2.698-3.616 4.443-2.666"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={2.147}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
        />
      </G>
    </Svg>
  );
}
