import { PooCreatureStatsStore } from "../stores/poo-creature-stats.store";
import { PooCreatureStyleStore } from "../stores/poo-creature-style.store";
import { ServerTypes } from "../types/ServerTypes";

export namespace ServerUtils {
  export function generatePlayerStyle(
    styleStore: PooCreatureStyleStore
  ): ServerTypes.PlayerStyle {
    return {
      bodyColor: styleStore.bodyColor,
      expression: styleStore.expression,
      head: styleStore.head,
      name: styleStore.name,
    };
  }

  export function generatePlayerStats(
    statsStore: PooCreatureStatsStore
  ): ServerTypes.PlayerStats {
    return {
      level: statsStore.level,
      attaque: statsStore.attaque,
      defense: statsStore.defense,
      pv: statsStore.pv,
      mana: statsStore.mana,
      recupMana: statsStore.recupMana,
      resMana: statsStore.resMana,
      ultiSelected: statsStore.ultiSelected,
    };
  }
}
