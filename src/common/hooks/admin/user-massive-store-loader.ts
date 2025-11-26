import { StorageKeys } from "../../config/StorageKeys";
import { useItemsUnlockedStore } from "../../stores/items-unlocked.store";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { useResourcesStore } from "../../stores/resources.store";
import { useVillageStore } from "../../stores/village.store";
import UserData from "../../types/firebase/UserData";
import useStorage from "../use-storage";

export default function useMassiveStoreLoader() {
  const itemsUnlockedStore = useItemsUnlockedStore();
  const pooCreatureStatsStore = usePooCreatureStatsStore();
  const pooCreatureStyleStore = usePooCreatureStyleStore();
  const resourcesStore = useResourcesStore();
  const villageStore = useVillageStore();
  const { saveJson } = useStorage();

  const massiveLoadFromUserData = async (userData: UserData) => {
    await itemsUnlockedStore.loadData(userData.itemsUnlocked);
    await pooCreatureStatsStore.loadData(userData.stats);
    await pooCreatureStyleStore.loadData(userData.style);
    await resourcesStore.loadData(userData.resources);
    await villageStore.loadData(userData.village);
  };

  const massiveStoreReset = async () => {
    await itemsUnlockedStore.resetData();
    await pooCreatureStatsStore.resetData();
    await pooCreatureStyleStore.resetData();
    await resourcesStore.resetData();
    await villageStore.resetData();
    await saveJson(StorageKeys.PREVIOUS_BATTLES, []);
  };

  /**
   * Fill a user data from all stores (stats, style, resources & villages)
   */
  const generateUserDataFromStores = (): UserData => {
    return {
      resources: {
        cosmicPowder: resourcesStore.get("cosmicPowder"),
        glass: resourcesStore.get("glass"),
        ink: resourcesStore.get("ink"),
        metal: resourcesStore.get("metal"),
        pooCoins: resourcesStore.get("pooCoins"),
        pooTrophee: resourcesStore.get("pooTrophee"),
        snow: resourcesStore.get("snow"),
        stars: resourcesStore.get("stars"),
        wool: resourcesStore.get("wool"),
      },
      stats: {
        attaque: pooCreatureStatsStore.getStat("attaque"),
        defense: pooCreatureStatsStore.getStat("defense"),
        currentExp: pooCreatureStatsStore.getStat("currentExp"),
        level: pooCreatureStatsStore.getStat("level"),
        mana: pooCreatureStatsStore.getStat("mana"),
        pv: pooCreatureStatsStore.getStat("pv"),
        recupMana: pooCreatureStatsStore.getStat("recupMana"),
        resMana: pooCreatureStatsStore.getStat("resMana"),
        ultiSelected: pooCreatureStatsStore.getStat("ultiSelected"),
      },
      style: {
        bodyColor: pooCreatureStyleStore.getStyle("bodyColor"),
        head: pooCreatureStyleStore.getStyle("head"),
        expression: pooCreatureStyleStore.getStyle("expression"),
        name: pooCreatureStyleStore.getStyle("name"),
      },
      village: {
        name: villageStore.getName(),
        structures: {
          toilet: villageStore.get("toilet"),
          yaris: villageStore.get("yaris"),
        },
      },
      itemsUnlocked: {
        bodyColors: itemsUnlockedStore.getItemsByCategories("bodyColors"),
        events: itemsUnlockedStore.getItemsByCategories("events"),
        expressions: itemsUnlockedStore.getItemsByCategories("expressions"),
        heads: itemsUnlockedStore.getItemsByCategories("heads"),
        options: itemsUnlockedStore.getItemsByCategories("options"),
      },
    };
  };

  return {
    massiveLoadFromUserData,
    massiveStoreReset,
    generateUserDataFromStores,
  };
}
