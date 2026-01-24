import { Resources } from "../config/constants/Resources";
import { BattleReward } from "../types/battle/BattleReward";
import { ArrayUtils } from "../utils/array-utils";

const NB_ITEMS_PER_REWARD = 2;
const AVAILABLE_RESOURCE_REWARDS: [Resources, number][] = [
  ["cosmicPowder", 5],
  ["ink", 200],
  ["glass", 200],
  ["metal", 200],
  ["snow", 250],
  ["wool", 300],
  ["pooCoins", 1000],
  ["stars", 2],
];

class AdsRewardsService {
  constructor() {}

  generateNewReward(): BattleReward {
    let reward: BattleReward = [];
    for (let i = 0; i < NB_ITEMS_PER_REWARD; i++) {
      let resourceReward = ArrayUtils.getRandomItem(AVAILABLE_RESOURCE_REWARDS);
      while (reward.find((r) => r.resource === resourceReward[0])) {
        resourceReward = ArrayUtils.getRandomItem(AVAILABLE_RESOURCE_REWARDS);
      }
      reward.push({ resource: resourceReward[0], number: resourceReward[1] });
    }
    return reward;
  }
}

export default new AdsRewardsService();
