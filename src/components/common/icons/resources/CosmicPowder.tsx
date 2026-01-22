import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { SvgUtils } from "../../../../utils/svg-utils";
const CosmicPowderIcon = (props: SvgProps & CustomSvgProps) => (
  <Svg
    {...SvgUtils.calculateSvgDimension(150.619, 98.411, props)}
    viewBox="0 0 39.851 26.038"
    {...props}
  >
    <Path
      d="M-247.645 327.692c-6.279 3.142-9.992-5.595-3.934-8.715-3.504-5.746 6.32-16.965 13.678-8.17 2.86-.906 5.71-1.609 8.412.182 5.019-2.305 8.21.319 7.868 3.994 9.502 2.31 4.233 18.493-5.628 12.649-2.803 1.55-5.327 2.485-8.292 1.936-4.545 1.854-8.686 1.748-12.104-1.876z"
      opacity={1}
      fill={"#ba96ce"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.83}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(255.558 -305.76)"
    />
    <Path
      d="m-232.197 324.368 4.696-1.654 1.125-4.432 1.587 4.763 4.564 1.058-4.762 1.39-1.257 5.555-1.323-5.556zM-252.417 313.25l5.2-1.832 1.246-4.908 1.758 5.275 5.055 1.172-5.274 1.538-1.392 6.154-1.465-6.154z"
      opacity={1}
      fill={"#ffc206"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.5}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(255.558 -305.76)"
    />
    <Path
      d="M-242.052 322.955c-.644-2.987 3.176-6.66 7.858-3.976-.183-1.624 2.162-3.649 4.443-2.479"
      opacity={1}
      fill={"none"}
      fillOpacity={1}
      fillRule={"evenodd"}
      stroke={"#000"}
      strokeWidth={1.83}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeMiterlimit={4}
      strokeDasharray={"none"}
      transform="translate(255.558 -305.76)"
    />
  </Svg>
);
export default CosmicPowderIcon;
