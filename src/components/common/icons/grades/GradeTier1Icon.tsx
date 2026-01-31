import * as React from "react";
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { SvgUtils } from "../../../../utils/svg-utils";
import { ColorValue } from "react-native";
import { gradeColors } from "../../../../constants/online/grade-colors";

const GradeTier1Icon = (
  props: {
    color: "bronze" | "silver" | "gold";
  } & SvgProps &
    CustomSvgProps,
) => {
  const { iconColor, backColor, borderColor } = gradeColors[props.color];
  return (
    <Svg
      {...SvgUtils.calculateSvgDimension(133.427, 152.49, props)}
      viewBox="0 0 35.303 40.346"
      {...props}
    >
      <Path
        d="m1573.173 108.7-.132-24.673 2.778-2.381 25.863-.132 2.381 2.381-.132 24.408-14.817 7.21z"
        fill={backColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.149 -80.614)"
      />
      <Path
        d="m1589.114 115.513.05 4.547-17.115-7.59 1.257-3.77z"
        fill={borderColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.149 -80.614)"
      />
      <Path
        d="m1589.114 115.513.05 4.547 16.387-8.285-1.752-3.538z"
        fill={iconColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.149 -80.614)"
      />
      <Path
        d="m1572.049 112.47.992-28.443M1605.551 111.775l-1.488-27.88"
        fill={iconColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.149 -80.614)"
      />
      <Path
        d="M1577.666 102.485c-2.493 4.244 5 5.724 11.421 5.762 6.31.037 12.436-1.222 10.266-5.222"
        fill={borderColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.149 -80.614)"
      />
      <Path
        d="M1577.666 102.485c2.812 2.846 19.173 2.49 21.687.54.978-2.415.73-4.369-1.404-5.616.65-1.64 2.405-3.888-2.56-6.443 1.188-1.57.534-2.732-2.161-3.71-2.84 1.358-6.679.098-10.064-1.659-1.53 1.247-3.134 2.937-.95 5.214-1.513.784-4.695 1.924-2.647 6.067-1.683 1.26-3.088 2.93-1.9 5.607z"
        fill={iconColor}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-1571.149 -80.614)"
      />
    </Svg>
  );
};
export default GradeTier1Icon;
