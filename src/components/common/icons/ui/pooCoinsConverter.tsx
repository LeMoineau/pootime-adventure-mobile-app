import * as React from "react";
import { Svg, SvgProps, Path, G } from "react-native-svg";
export default function PooCoinsConverterIcon({
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
        d="M-122.254 157.713c.807.816 5.501.714 6.222.155.281-.693.21-1.254-.402-1.612.186-.47.69-1.115-.735-1.848.34-.45.153-.784-.62-1.064-.815.39-1.916.028-2.887-.476-.44.357-.9.842-.273 1.496-.434.224-1.347.552-.76 1.74-.482.362-.885.841-.545 1.609z"
        fill={"#ffe25e"}
        fillOpacity={1}
        fillRule={"evenodd"}
        stroke={"#000"}
        strokeWidth={0.467956}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeMiterlimit={4}
        strokeDasharray={"none"}
        strokeOpacity={1}
        transform="translate(122.611 -152.634)"
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
          transform="translate(-27.441 -154.374)"
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
          transform="rotate(126.869 59.468 74.57)"
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
          transform="rotate(126.869 59.468 74.57)"
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
          transform="rotate(-113.258 -29.551 92.536)"
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
          transform="rotate(-113.258 -29.551 92.536)"
        />
      </G>
    </Svg>
  );
}
