import { StatType } from "../types/StatType";
import { DefaultValues } from "../config/DefaultValues";

export namespace MathUtils {
  export function calculateGainStat(
    stat: StatType,
    currentValue: number
  ): number {
    if (stat === "pv" || stat === "mana") {
      return 5;
    }
    return 1;
  }

  export function calculateExpNeedForNextLevel(currentLevel: number): number {
    return Math.round(1.5 + currentLevel * 1.2);
  }

  export function calculateHeadColorFromLevel(currentLevel: number): string {
    return generateColorCurve()[(currentLevel - 1) % DefaultValues.LevelMax];
  }

  export function generateColorCurve(
    nbColor: number = DefaultValues.LevelMax
  ): string[] {
    let colors = [];
    let huedelta = Math.trunc(360 / nbColor);

    for (let i = 0; i < nbColor; i++) {
      let hue = i * huedelta;
      colors.push(
        `hsla(${hue},${DefaultValues.ColorCurveSaturation}%,${DefaultValues.ColorCurveLightnesse}%,1)`
      );
    }

    colors.unshift(DefaultValues.PooHeadColor);
    return colors;
  }
}
