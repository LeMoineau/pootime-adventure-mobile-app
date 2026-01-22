import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { MathUtils } from "../../../../common/utils/math-utils";
const UnderConstructionIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...MathUtils.calculateSvgDimension(303.234, 404.42, props)}
    viewBox="0 0 80.231 107.003"
    {...props}
  >
    <Path
      d="m1013.172-241.585 11.226-13.658 27.408 1.404 9.916 2.619c4.02 2.85 4.183 5.882 2.993 8.98l-11.88 14.032c-3.114 3.004-7.27 4.042-12.628 2.806l-22.919-5.706c-5.333-2.172-5.633-8.144-4.116-10.477z"
      fill={"#d05d05"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.5}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="matrix(1.4645 .0592 -.0592 1.4645 -1495.632 373.42)"
    />
    <Path
      d="m1022.006-242.575 10.624-51.77c2.619-2.718 5.238-1.996 7.857 0l14.313 48.363c-4.403 14.525-28.607 11.562-32.794 3.407z"
      fill={"#d05d04"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.5}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="matrix(1.4645 .0592 -.0592 1.4645 -1495.632 373.42)"
    />
    <Path
      d="M1024.117-252.296c9.296 10.105 21.032 7.753 28.25-1.637l-2.76-10.056c-7.691 7.043-15.49 8.106-23.432 1.31zM1028.42-272.829c5.644 4.124 12.052 4.265 17.867-1.216l-2.713-10.196c-3.908 3.157-8.117 4.446-13.143.654z"
      fill={"#fff"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.5}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="matrix(1.4645 .0592 -.0592 1.4645 -1495.632 373.42)"
    />
    <Path
      d="M1013.172-241.585c-3.918 6.19 27.17 11.347 31.588 11.975M1061.722-251.22c4.32 4.256-8.138 14.873-8.138 14.873"
      fill={"none"}
      fillOpacity={0.772549}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.5}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="matrix(1.4645 .0592 -.0592 1.4645 -1495.632 373.42)"
    />
  </Svg>
);
export default UnderConstructionIcon;
