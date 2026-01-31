import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { CustomSvgProps } from "../../../../types/CustomSvgProps";
import { SvgUtils } from "../../../../utils/svg-utils";
import { gradeColors } from "../../../../constants/online/grade-colors";

const GradeTier3Icon = (
  props: { color: "bronze" | "silver" | "gold" } & SvgProps & CustomSvgProps,
) => {
  const { iconColor, backColor, borderColor } = gradeColors[props.color];
  return (
    <Svg
      {...SvgUtils.calculateSvgDimension(185.701, 220.703, props)}
      viewBox="0 0 49.133 58.394"
      {...props}
    >
      <Path
        d="m1474.682 85.09 14.406.28 9.074-7.296 11.038 7.484 12.816-.187-3.462 35.266-19.457 9.541-19.55-9.167z"
        fill={backColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="m1479.546 121.011-2.245 4.022 21.796 9.635v-4.49z"
        fill={borderColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="m1499.097 130.178 19.457-9.541 1.965 3.367-21.422 10.664z"
        fill={iconColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="m1474.682 85.09 2.62 39.943 2.244-4.022z"
        fill={borderColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="m1522.016 85.37-1.497 38.634-1.965-3.367z"
        fill={iconColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.8}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="M1486.966 109.944c-2.608 4.438 5.228 5.985 11.944 6.025 6.6.04 13.005-1.277 10.736-5.46"
        fill={borderColor}
        fillOpacity={1}
        stroke={"#000"}
        strokeWidth={1.88245}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={0}
        strokeDasharray={"none"}
        transform="translate(-1473.782 -77.174)"
      />
      <Path
        d="M1486.966 109.944c2.94 2.976 20.051 2.604 22.68.564 1.023-2.525.763-4.569-1.468-5.874.678-1.715 2.515-4.065-2.678-6.737 1.243-1.642.559-2.858-2.26-3.88-2.97 1.42-6.984.102-10.524-1.735-1.602 1.304-3.278 3.071-.993 5.453-1.583.82-4.91 2.012-2.77 6.345-1.76 1.318-3.23 3.065-1.987 5.864z"
        fill={iconColor}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={1.88245}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(-1473.782 -77.174)"
      />
    </Svg>
  );
};
export default GradeTier3Icon;
