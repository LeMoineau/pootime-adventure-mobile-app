import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../types/CustomSvgProps";
import { MathUtils } from "../../../utils/math-utils";
const SnowIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...MathUtils.calculateSvgDimension(103.655, 91.341, props)}
    viewBox="0 0 27.425 24.167"
    {...props}
  >
    <G strokeWidth={1.56952} strokeMiterlimit={4} strokeDasharray={"none"}>
      <Path
        d="M-156.426 328.274c4.691-2.96 4.146-6.515 1.964-10.254.176-9.7-19.333-2.97-15.32 3.102-2.783 9.523 7.617 7.403 13.356 7.152z"
        fill={"#dbdbdb"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.56952}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(234.064 -427.263) scale(1.36793)"
      />
      <Path
        d="M-157.956 320.055c-1.322-3.06-8.3 1.097-7.156 3.087"
        fill={"#dbdbdb"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.56952}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(234.064 -427.263) scale(1.36793)"
      />
    </G>
    <Path
      d="M-161.983 331.967c6.886.903 15.53 1.139 21.096-.193.402-1.94.067-5.092-4.307-3.37-3.662-2.814-5.589-2.71-8.87-.405-1.689 1.067-5.866 3.745-7.919 3.968z"
      fill={"#dbdbdb"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(167.167 -309.55)"
    />
  </Svg>
);
export default SnowIcon;
