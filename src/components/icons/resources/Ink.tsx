import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../types/CustomSvgProps";
import { MathUtils } from "../../../common/utils/math-utils";
const InkIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...MathUtils.calculateSvgDimension(72.541, 116.81, props)}
    viewBox="0 0 19.193 30.906"
    {...props}
  >
    <Path
      d="M-77.708 305.633c-.212.044-.762 1.028-.942 1.659-2.647 9.237-7.103 12.816-7.593 17.967-.669 11.421 16.975 12.824 17.028.219-.652-5.541-5.574-11.3-7.515-18.187-.165-.587-.548-1.734-.978-1.658z"
      fill={"#8b3f6e"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2.147}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(87.334 -304.556)"
    />
    <Path
      d="M-82.64 323.017c-1.783 5.606 2.544 10.293 7.953 7.729-3.615-1.315-6.665-4.978-7.953-7.729z"
      fill={"#bb6a9c"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.678}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(87.334 -304.556)"
    />
  </Svg>
);
export default InkIcon;
