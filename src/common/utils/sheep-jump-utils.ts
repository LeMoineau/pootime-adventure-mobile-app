import { SheepJumpTypes } from "../types/SheepJumpTypes";
import { UltiDetails } from "../types/Ultis";

export namespace SheepJumpUtils {
  export function generateSheep(level: number): SheepJumpTypes.Sheep {
    return {
      name: "Sheep",
      color: "",
      level: level,
      pv: 200,
      attaque: 5,
      freqAttaque: 1000,
    };
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

  export function calculatePlayerEarnings(): {
    stars: number;
    pooCoins: number;
    wool: number;
  } {
    return {
      stars: 1,
      pooCoins: 1,
      wool: 100,
    };
  }
}
