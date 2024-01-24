import { SheepJumpTypes } from "../types/SheepJumpTypes";
import { UltiDetails } from "../types/Ultis";
import { MathUtils } from "./math-utils";

export namespace SheepJumpUtils {
  export function generateSheep(level: number): SheepJumpTypes.Sheep {
    const specificSheepRoll = MathUtils.getRandomInt(100);
    if (specificSheepRoll === 0) {
      return SheepJumpTypes.Audrey;
    }
    const roll = MathUtils.getRandomInt(5);
    const freqAttaqueRoll = MathUtils.getRandomInt(3);
    const sheepLevel = level + roll;
    return {
      name: getRandomSheepName(),
      color: SheepJumpTypes.SheepWoolPalette.hexValueAt((sheepLevel / 40) % 1),
      level: sheepLevel,
      pv: sheepLevel * 50,
      attaque: sheepLevel * 2,
      freqAttaque: 500 + 500 * freqAttaqueRoll,
    };
  }

  export function getRandomSheepName(): string {
    const index = MathUtils.getRandomInt(SheepJumpTypes.SheepNames.length);
    return SheepJumpTypes.SheepNames[index];
  }

  export function calculateNewStatesFromHit(
    sheepState: SheepJumpTypes.SheepState,
    playerState: SheepJumpTypes.PlayerState
  ): {
    newSheepState: SheepJumpTypes.SheepState;
    newPlayerState: SheepJumpTypes.PlayerState;
  } {
    return {
      newSheepState: {
        ...sheepState,
        currentPv: sheepState.currentPv - playerState.attaque,
      },
      newPlayerState: {
        ...playerState,
        currentMana: playerState.currentMana + playerState.recupMana,
      },
    };
  }

  export function calculateNewStatesFromSpell(
    sheepState: SheepJumpTypes.SheepState,
    playerState: SheepJumpTypes.PlayerState,
    ulti: UltiDetails
  ): {
    newSheepState: SheepJumpTypes.SheepState;
    newPlayerState: SheepJumpTypes.PlayerState;
  } {
    return {
      newSheepState: {
        ...sheepState,
        currentPv: ulti.damage
          ? sheepState.currentPv - ulti.damage
          : sheepState.currentPv,
      },
      newPlayerState: {
        ...playerState,
        currentMana: playerState.currentMana - ulti.mana,
      },
    };
  }

  export function calculateNewStatesFromSheepHit(
    sheepState: SheepJumpTypes.SheepState,
    playerState: SheepJumpTypes.PlayerState
  ): {
    newSheepState: SheepJumpTypes.SheepState;
    newPlayerState: SheepJumpTypes.PlayerState;
  } {
    return {
      newSheepState: {
        ...sheepState,
      },
      newPlayerState: {
        ...playerState,
        currentPv: playerState.currentPv - sheepState.attaque,
      },
    };
  }

  export function calculatePlayerEarnings(
    winner: "player" | "sheep",
    sheepLevel: number
  ): {
    pooCoins: number;
    wool: number;
  } {
    return {
      pooCoins: winner === "player" ? 10 + sheepLevel * 5 : 0,
      wool: winner === "player" ? 50 + sheepLevel * 10 : 0,
    };
  }
}
