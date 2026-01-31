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

const GradeTier4BronzeIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...SvgUtils.calculateSvgDimension(218.518, 240.325, props)}
    viewBox="0 0 57.833 63.586"
    {...props}
  >
    <Path
      d="m1501.643 283.809-2.525-2.807-.094-7.764 8.7-.187 2.15 2.748h5.52l10.01-8.548 10.57 7.67 8.793.094 3.087-3.087 7.203.188-.28 8.512-4.023 2.806-2.245 25.725 4.116 3.087-.655 6.735-7.67 2.526-3.181-2.339-11.128 4.678-.023 2.46-4.12 2.404-4.77-3.023.518-2.698-9.541-5.706-3.396 3.756-6.642-2.9-.935-6.174 2.9-1.964z"
      fill={"#ef753d"}
      fillOpacity={1}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={0}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
    <Path
      d="m1508.519 308.27-2.385-26.239 4.864 1.403.28-3.648h5.333l5.425-3.987 3.461 3.52 3.087-3.52 4.21 3.52h8.325l-.468 4.209 4.304-.28-1.731 24.929-.234 6.314-17.586 7.916-16.745-9.32z"
      fill={"#0185f2"}
      fillOpacity={1}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={0}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
    <Path
      d="m1548.509 309.16-10.57-1.965 1.59 3.87-11.974 5.168-2.619-2.77-2.245 2.77-10.103-5.168.468-4.525-9.074 3.461-2.9 1.964.935 6.174 6.642 2.9 2.9-1.87 9.119 4.686-.069 2.16 4.771 3.022 4.589-2.732.21-2.03 10.94-5.107 3.18 2.339 7.671-2.526.655-6.735z"
      fill={"#f39265"}
      fillOpacity={1}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={0}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
    <Path
      d="m1513.056 306.54-.77 7.018M1537.939 307.195l2.633 6.506M1506.134 282.031l-2.345-1.189M1544.955 283.247l2.854-.453M1522.69 316.233l-1.57 2.28M1527.555 316.233l1.536 2.28"
      fill={"#fff"}
      fillOpacity={1}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={0}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
    <Path
      d="m1533.986 304.674-9.503-5.235-8.836 4.604 5.438-9.492-4.903-8.955 9.169 5.726 10.856-6.02-7.112 10.213z"
      fill={"#ffc206"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
    <Path
      d="m1512.429 295.553 10.234-3.604 2.45-9.657 3.46 10.378 9.945 2.306-10.378 3.027-2.739 12.108-2.883-12.108z"
      fill={"#fee949"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.8}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(-1498.124 -266.351)"
    />
  </Svg>
);
export default GradeTier4BronzeIcon;
