import { DefaultValues } from "../config/DefaultValues";

export namespace CurveUtils {
  export function calculateHeadColor(level: number): string {
    return DefaultValues.PooHeadPalette.hexValueAt(
      (level / DefaultValues.LevelMax) % 1,
    );
  }

  export function calculateExpNeedForNextLevel(currentLevel: number): number {
    return Math.round(1.5 + currentLevel * 1.2);
  }
}
