import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const PoulpeHead = ({
  fillColor,
  ...props
}: { fillColor?: string } & SvgProps) => (
  <Svg width={"100%"} height={"100%"} viewBox="0 0 15.507 22.842" {...props}>
    <G strokeWidth={0.3} strokeMiterlimit={4} strokeDasharray={"none"}>
      <G strokeWidth={0.3} strokeMiterlimit={4} strokeDasharray={"none"}>
        <Path
          d="m12.31 167.625 1.408-.913c.587-.427-1.347 9.884-2.388 9.483-1.658-.72.805-3.29.98-8.57zM10.881 163.932c-.286.135-2.025-.731-2.034-1.572.305-1.7 1.702-5.033 4.313-5.746M18.966 155.857c2.49.238 4.043 2.138 5.087 4.94-.037.812-1.175 1.682-1.667 1.679M22.014 168.507c-1.071 4.03 1.49 6.715.305 7.421-1.441.605-1.491-4.431-1.178-8.713"
          fill={fillColor ?? "#fd0e86"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.3}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="translate(-8.697 -153.842)"
        />
        <Path
          d="M19.579 166.11c.007 5.229.314 9.172 1.4 9.557 1.36.205-.104-3.085.162-8.452M12.933 167.145c-.53 4.963-1.585 7.59-1.02 8.118 2.391.04 1.27-4.093 2.836-8.956"
          fill={fillColor ?? "#fc0c64"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.3}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="translate(-8.697 -153.842)"
        />
        <Path
          d="M12.154 169.275c-.528-.067-.596-1.72-.752-2.657-.567.374-.415-1.036-.52-2.686-.095-.318 1.453-9.042 5.209-9.94 3.485.474 7.403 8.561 6.237 11.057-.094.294.284.937-.244.874-.147 1.533.666 2.137-.07 2.584-2.625-5.333-9.32-1.432-9.704-.882z"
          fill={fillColor ?? "#fc0c64"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.3}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="translate(-8.697 -153.842)"
        />
      </G>
      <Path
        d="M11.402 166.618c3.764-6.803 9.823-2.745 10.682-.695"
        fill={"none"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.3}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(-8.697 -153.842)"
      />
    </G>
  </Svg>
);
export default PoulpeHead;
