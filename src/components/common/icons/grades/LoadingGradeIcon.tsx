import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { SvgUtils } from "../../../../utils/svg-utils";
import { colors } from "../../../../constants/style/colors";

const LOADING_FILL_COLOR = colors.gray[200];

const LoadingGradeIcon = (props: SvgProps & CustomSvgProps) => {
  return (
    <Svg
      {...SvgUtils.calculateSvgDimension(163.123, 220.349, props)}
      viewBox="0 0 43.16 58.301"
      {...props}
    >
      <Path
        d="m1574.607 204.93 18.147 8.044 18.71-8.7.467-30.495-4.21-4.958h-4.864l-9.448-6.08-10.29 6.36-5.238-.093-3.93 3.555z"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.413 -161.84)"
      />
      <Path
        d="m1574.607 204.93-2.294 3.146 20.628 11.166-.187-6.268z"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.413 -161.84)"
      />
      <Path
        d="m1592.754 212.974 18.71-8.7 2.21 3.09-20.733 11.878z"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.413 -161.84)"
      />
      <Path
        d="m1611.93 173.779 1.743 33.586-2.21-3.09z"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.413 -161.84)"
      />
      <Path
        d="m1573.952 172.563-1.639 35.513 2.294-3.147zM1582.057 193.42c-2.494 4.244 5 5.724 11.42 5.762 6.311.037 12.437-1.222 10.267-5.222"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1571.413 -161.84)"
      />
      <Path
        d="M1582.057 193.42c2.812 2.846 19.173 2.49 21.687.54.978-2.415.729-4.369-1.404-5.617.649-1.64 2.405-3.887-2.56-6.442 1.187-1.57.533-2.732-2.162-3.71-2.84 1.358-6.678.098-10.063-1.659-1.531 1.247-3.134 2.937-.95 5.214-1.513.784-4.695 1.924-2.648 6.067-1.682 1.26-3.088 2.93-1.9 5.607z"
        fill={LOADING_FILL_COLOR}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={LOADING_FILL_COLOR}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-1571.413 -161.84)"
      />
    </Svg>
  );
};
export default LoadingGradeIcon;
