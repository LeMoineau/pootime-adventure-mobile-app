import { NumberProp } from "react-native-svg";
import { CustomSvgProps } from "../../types/CustomSvgProps";

export namespace MathUtils {
  export function getRandomInt(max: number, min?: number) {
    return (min ?? 0) + Math.floor(Math.random() * (min ? max - min + 1 : max));
  }

  export function divideToMaxFixed(
    val: number,
    divider: number,
    maxFixed: number,
  ): number {
    return (
      Math.floor((val / divider) * Math.pow(10, maxFixed)) /
      Math.pow(10, maxFixed)
    );
  }

  export function convertToReduceStrFormat(val: number): string {
    if (val >= 1000) {
      return `${divideToMaxFixed(val, 1000, 1)}K`;
    }
    if (val >= 1000000) {
      return `${divideToMaxFixed(val, 1000000, 1)}M`;
    }
    return `${val.toFixed(0)}`;
  }

  export function calculateSvgWidth(
    width: number,
    height: number,
    props: CustomSvgProps,
  ): NumberProp {
    if (props.height && !props.width && typeof props.height === "number") {
      return (width * props.height) / height;
    }
    return props.width ?? (props.ratio ? props.ratio * width : width);
  }

  export function calculateSvgHeight(
    width: number,
    height: number,
    props: CustomSvgProps,
  ): NumberProp {
    if (props.width && !props.height && typeof props.width === "number") {
      return (height * props.width) / width;
    }
    return props.height ?? (props.ratio ? props.ratio * height : height);
  }

  export function calculateSvgDimension(
    width: number,
    height: number,
    props: CustomSvgProps,
  ): { width: NumberProp; height: NumberProp } {
    return {
      width: calculateSvgWidth(width, height, props),
      height: calculateSvgHeight(width, height, props),
    };
  }
}
