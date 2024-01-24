import * as React from "react";
import { Svg, SvgProps, Path, G } from "react-native-svg";
export default function StarConverterIcon({
  size,
  ...props
}: { size?: number } & SvgProps) {
  return (
    <Svg
      width={size ?? 32.972}
      height={size ?? 31.701}
      viewBox="0 0 8.724 8.388"
      {...props}
    >
      <Path
        d="M-402.167 164.042c-.414-.085.062-1.393.362-2.29-.657-.53-1.697-1.093-1.396-1.588.245-.358 1.157-.143 2.014-.2.237-.713.517-1.726.983-1.656.449-.032.697.957.954 1.655.812.013 1.9-.127 2.03.191.333.576-.735.979-1.39 1.507.298.898.656 2.313.235 2.36-.258.37-1.135-.625-1.843-1.196-.722.58-1.645 1.566-1.949 1.217z"
        fill={"#4a9fff"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.504}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        transform="translate(403.501 -158.053)"
      />
      <G fill={"#fff"} fillOpacity={1}>
        <Path
          d="M32.544 161.925v-1.058h-2.91l1.058 1.058zM29.633 160.867l.53-1.323-.53-.265 1.588-.264.529 1.323-.53-.265-.264.794z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.247}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="translate(-27.144 -154.243)"
        />
      </G>
      <G fill={"#fff"} fillOpacity={1}>
        <Path
          d="M36.512 161.66v-1.058h-2.91l1.058 1.058z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.247}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="rotate(126.869 59.583 74.71)"
        />
        <Path
          d="m33.602 160.602.53-1.323-.53-.264 1.588-.265.529 1.323-.53-.265-.264.794z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.247}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="rotate(126.869 59.583 74.71)"
        />
      </G>
      <G fill={"#fff"} fillOpacity={1}>
        <Path
          d="M36.512 161.66v-1.058h-2.91l1.058 1.058z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.247}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="rotate(-113.258 -29.36 92.504)"
        />
        <Path
          d="m33.602 160.602.53-1.323-.53-.264 1.588-.265.529 1.323-.53-.265-.264.794z"
          fill={"#fff"}
          fillOpacity={1}
          fillRule={"evenodd"}
          stroke={"#000"}
          strokeWidth={0.247}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          strokeMiterlimit={4}
          strokeDasharray={"none"}
          transform="rotate(-113.258 -29.36 92.504)"
        />
      </G>
    </Svg>
  );
}
