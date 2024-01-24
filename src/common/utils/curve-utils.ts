export namespace CurveUtils {
  export function calculateRewardsPooing(elapsedTime: number): {
    star: number;
    pooCoins: number;
  } {
    let starEarn = 0;
    let pooCoinsEarn = 0;
    if (elapsedTime > 1 * 60) {
      pooCoinsEarn = (50 * elapsedTime) / 60;
      starEarn = 1;
    }
    return {
      star: starEarn,
      pooCoins: pooCoinsEarn > 2000 ? 2000 : pooCoinsEarn,
    };
  }
}
