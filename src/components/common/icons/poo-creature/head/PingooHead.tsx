import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../../../types/CustomSvgProps";
import { MathUtils } from "../../../../../utils/math-utils";
const PingooHead = (
  props: { fillColor?: string } & SvgProps & CustomSvgProps,
) => (
  <Svg width={"100%"} height={"100%"} viewBox="0 0 16.387 23.83" {...props}>
    <Path
      d="M-29.443 168.1c.92-13.213 12.977-15.575 14.626.365-4.21 1.077-8.576 1.871-14.626-.364z"
      fill={props.fillColor}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={0.9}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(30.332 -155.086)"
    />
    <Path
      d="M-25.513 169.047c2.077-1.926 4.788-2.076 6.689.024-1.858.574-4.68.495-6.689-.024z"
      fill={"#fff"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={0.9}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(30.332 -155.086)"
    />
  </Svg>
);
export default PingooHead;
