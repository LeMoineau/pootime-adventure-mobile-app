import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { MathUtils } from "../../../common/utils/math-utils";
import { CustomSvgProps } from "../../../types/CustomSvgProps";

export default function PooTropheeIcon(props: SvgProps & CustomSvgProps) {
  return (
    <Svg
      {...MathUtils.calculateSvgDimension(52.756, 66.355, props)}
      viewBox="0 0 13.958 17.556"
      {...props}
    >
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
        strokeDasharray="none"
        strokeOpacity={1}
        transform="translate(-161.02 -124.527)"
      />
      <Path
        d="m166.707 135.945-.016 1.637c-1.977.554-2.962.997-2.696 4.002l7.987-.066c.24-2.703-.5-3.482-2.629-3.903l.017-1.654z"
        opacity={1}
        fill="#d6a837"
        fillOpacity={1}
        fillRule="evenodd"
        stroke="#000"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}
        transform="translate(-161.02 -124.527)"
      />
    </Svg>
  );
}
