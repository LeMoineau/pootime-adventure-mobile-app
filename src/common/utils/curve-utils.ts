import { DefaultValues } from "../../config/DefaultValues";
import { BattleReward } from "../../types/battle/BattleReward";

export namespace CurveUtils {
  export function calculateRewardsPooing(elapsedTime: number): BattleReward {
    let starEarn = 0;
    let pooCoinsEarn = 0;
    if (elapsedTime > 1 * 60) {
      pooCoinsEarn = Math.round((50 * elapsedTime) / 60);
      starEarn = 1;
    }
    return [
      { resource: "stars", number: starEarn },
      {
        resource: "pooCoins",
        number: pooCoinsEarn > 2000 ? 2000 : pooCoinsEarn,
      },
    ];
  }

  export function calculateHeadColor(level: number): string {
    return DefaultValues.PooHeadPalette.hexValueAt(
      (level / DefaultValues.LevelMax) % 1,
    );
  }

  export function calculateExpNeedForNextLevel(currentLevel: number): number {
    return Math.round(1.5 + currentLevel * 1.2);
  }
}
