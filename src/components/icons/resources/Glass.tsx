import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../types/CustomSvgProps";
import { MathUtils } from "../../../utils/math-utils";
const GlassIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...MathUtils.calculateSvgDimension(41.235, 106.809, props)}
    viewBox="0 0 10.91 28.26"
    {...props}
  >
    <Path
      d="M-195.474 334.548c-.746-.82-1.512-1.745-3.506-2.845-3.746-1.602-2.424-10.75-2.613-16.37l4.068-7.045c1.311 2.79 2.714 5.489 4.763 7.54-2.855 6.755-2.342 15.373-2.712 18.72z"
      opacity={1}
      fill={"#83d6f6"}
      fillOpacity={0.458824}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(202.672 -307.288)"
    />
    <Path
      d="m-197.525 308.288-.125 11.921-1.33 11.494"
      opacity={1}
      fill={"none"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(202.672 -307.288)"
    />
    <Path
      d="m-194.859 324.452-2.791-4.243.125-11.921c1.45 2.536 2.355 5.163 4.763 7.54-.811 1.697-1.459 5.11-2.097 8.624z"
      opacity={1}
      fill={"#83d6f6"}
      fillOpacity={0.536785}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(202.672 -307.288)"
    />
    <Path
      d="m-197.65 320.209 2.791 4.243c-.412 5.197-.564 7.29-.615 10.096-.928-1.069-1.887-2.122-3.506-2.845z"
      opacity={1}
      fill={"#fff"}
      fillOpacity={0.536785}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(202.672 -307.288)"
    />
  </Svg>
);
export default GlassIcon;
