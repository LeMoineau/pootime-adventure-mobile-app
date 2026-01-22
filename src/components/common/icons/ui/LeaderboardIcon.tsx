import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { SvgUtils } from "../../../../utils/svg-utils";

export default function LeaderboardIcon(props: SvgProps & CustomSvgProps) {
  return (
    <Svg
      {...SvgUtils.calculateSvgDimension(75.609, 54.695, props)}
      viewBox="0 0 20.005 14.471"
      {...props}
    >
      <Path
        d="M59.39 265.612c-1.667 2.12-12.657 3.13-14.49 2.015-.84-1.543-.822-2.872.512-3.87-.56-1.05-1.907-2.422 1.225-4.513-.916-.962-.566-1.79 1.165-2.65 2.006.693 4.483-.444 6.617-1.88 1.12.72 2.324 1.73 1.033 3.422 1.075.41 3.294.931 2.238 3.863 1.223.716 2.292 1.729 1.7 3.613z"
        fill={"#ff6ec9"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-43.778 -254.165)"
      />
      <Path
        d="M48.258 263.121c-.353-3.503 6.183-4.246 6.726-.88.733 2.706-5.716 5.295-6.726.88z"
        fill={"#e5e3b3"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-43.778 -254.165)"
      />
      <Path
        d="M161.736 134.697c1.616 1.635 11.014 1.43 12.458.31.562-1.387.42-2.51-.806-3.226.372-.943 1.381-2.234-1.471-3.701.682-.902.307-1.57-1.242-2.131-1.63.78-3.836.056-5.78-.953-.88.716-1.8 1.687-.546 2.995-.87.45-2.697 1.105-1.521 3.485-.967.724-1.774 1.683-1.092 3.22z"
        fill={"#e5c949"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.936956}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="rotate(10.694 446.754 -402.88) scale(.59104)"
      />
      <Path
        d="m166.707 135.945-.016 1.637c-1.977.554-2.962.997-2.696 4.002l7.987-.066c.24-2.703-.5-3.482-2.629-3.903l.017-1.654z"
        opacity={1}
        fill={"#d6a837"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="rotate(10.694 446.754 -402.88) scale(.59104)"
      />
      <Path
        d="m200.128 223.472.48.844M203.286 224.398l.579-.942"
        fill={"#fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.499999}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="rotate(-11.511 -966.763 1079.944)"
      />
      <Path
        d="M200.806 226.2c1.084-5.226 1.646-2.011 2.215-.131"
        fill={"none"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.499999}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="rotate(-11.511 -966.763 1079.944)"
      />
    </Svg>
  );
}
