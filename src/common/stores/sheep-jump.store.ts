import { SheepJumpUtils } from "../utils/sheep-jump-utils";
import { SheepJumpTypes } from "../types/SheepJumpTypes";
import { create } from "zustand";
import { UltiDetails } from "../types/Ultis";
import { PooCreatureStats } from "../types/PooCreatureStats";

type Store = {
  showSheepJumpModal: boolean;
  sheep?: SheepJumpTypes.Sheep;
  currentSheepState?: SheepJumpTypes.SheepState;
  currentPlayerState?: SheepJumpTypes.PlayerState;
  battleFinish: boolean;
  winner: "player" | "sheep" | undefined;
  earnings: { pooCoins: number; wool: number } | undefined;
  startSheepJump: (playerStats: PooCreatureStats) => void;
  hitSheep: () => void;
  spellSheep: (ulti: UltiDetails) => void;
  sheepHit: () => void;
  reset: () => void;
};

const useSheepJumpStore = create<Store>((set, get) => {
  let _intervalId: NodeJS.Timeout | undefined = undefined;

  const startSheepJump = (playerStats: PooCreatureStats) => {
    set({
      sheep: SheepJumpUtils.generateSheep(playerStats.level),
    });
    set({
      currentSheepState: {
        currentPv: get().sheep!.pv,
        attaque: get().sheep!.attaque,
      },
      currentPlayerState: {
        currentPv: playerStats.pv,
        currentMana: 0,
        attaque: playerStats.attaque,
        recupMana: playerStats.recupMana,
      },
      showSheepJumpModal: true,
    });
    _intervalId = setInterval(() => {
      sheepHit();
    }, get().sheep!.freqAttaque);
  };

  const hitSheep = () => {
    const { newSheepState, newPlayerState } =
      SheepJumpUtils.calculateNewStatesFromHit(
        get().currentSheepState!,
        get().currentPlayerState!
      );
    set({
      currentSheepState: newSheepState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const spellSheep = (ulti: UltiDetails) => {
    const { newSheepState, newPlayerState } =
      SheepJumpUtils.calculateNewStatesFromSpell(
        get().currentSheepState!,
        get().currentPlayerState!,
        ulti
      );
    set({
      currentSheepState: newSheepState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const sheepHit = () => {
    const { newSheepState, newPlayerState } =
      SheepJumpUtils.calculateNewStatesFromSheepHit(
        get().currentSheepState!,
        get().currentPlayerState!
      );
    set({
      currentSheepState: newSheepState,
      currentPlayerState: newPlayerState,
    });
    _checkVictory();
  };

  const _checkVictory = () => {
    if (
      get().currentSheepState!.currentPv <= 0 ||
      get().currentPlayerState!.currentPv <= 0
    ) {
      set({
        winner: get().currentPlayerState!.currentPv <= 0 ? "sheep" : "player",
      });
      set({
        earnings: SheepJumpUtils.calculatePlayerEarnings(
          get().winner!,
          get().sheep!.level
        ),
        battleFinish: true,
      });
      _intervalId && clearInterval(_intervalId);
    }
  };

  const reset = () => {
    set({
      sheep: undefined,
      currentSheepState: undefined,
      currentPlayerState: undefined,
      showSheepJumpModal: false,
      battleFinish: false,
      winner: undefined,
      earnings: undefined,
    });
  };

  return {
    sheep: undefined,
    currentSheepState: undefined,
    currentPlayerState: undefined,
    showSheepJumpModal: false,
    battleFinish: false,
    winner: undefined,
    earnings: undefined,
    startSheepJump,
    hitSheep,
    spellSheep,
    sheepHit,
    reset,
  };
});

export default useSheepJumpStore;
