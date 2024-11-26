import { getAuth, signInAnonymously } from "firebase/auth";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { useResourcesStore } from "../../stores/resources.store";
import { useVillageStore } from "../../stores/village.store";
import { useUserData } from "./use-user-data";
import UserData from "../../types/firebase/UserData";
import { useItemsUnlockedStore } from "../../stores/items-unlocked.store";

export function useUserAuth() {
  const { saveUserData } = useUserData();
  const { getStat } = usePooCreatureStatsStore();
  const { getStyle } = usePooCreatureStyleStore();
  const { get } = useResourcesStore();
  const { getItemsByCategories } = useItemsUnlockedStore();
  const { get: getStructure, getName } = useVillageStore();

  const _getCurrentUserUid = async (): Promise<string> => {
    const auth = getAuth();
    if (!auth.currentUser) {
      const userCredential = await signInAnonymously(auth);
      return userCredential.user.uid;
    }
    return auth.currentUser.uid;
  };

  /**
   * Create a new user from all stores (stats, style, resources & villages)
   */
  const _createUserDataFromStores = (): UserData => {
    return {
      resources: {
        cosmicPowder: get("cosmicPowder"),
        glass: get("glass"),
        ink: get("ink"),
        metal: get("metal"),
        pooCoins: get("pooCoins"),
        pooTrophee: get("pooTrophee"),
        snow: get("snow"),
        stars: get("stars"),
        wool: get("wool"),
      },
      stats: {
        attaque: getStat("attaque"),
        defense: getStat("defense"),
        currentExp: getStat("currentExp"),
        level: getStat("level"),
        mana: getStat("mana"),
        pv: getStat("pv"),
        recupMana: getStat("recupMana"),
        resMana: getStat("resMana"),
        ultiSelected: getStat("ultiSelected"),
      },
      style: {
        bodyColor: getStyle("bodyColor"),
        head: getStyle("head"),
        expression: getStyle("expression"),
        name: getStyle("name"),
      },
      village: {
        name: getName(),
        structures: {
          toilet: getStructure("toilet"),
          yaris: getStructure("yaris"),
        },
      },
      itemsUnlocked: {
        bodyColors: getItemsByCategories("bodyColors"),
        events: getItemsByCategories("events"),
        expressions: getItemsByCategories("expressions"),
        heads: getItemsByCategories("heads"),
        options: getItemsByCategories("options"),
        ultis: getItemsByCategories("ultis"),
      },
    };
  };

  /**
   * Save the current state (described by stores) in the current user logged in.
   *
   * If user is not yet logged, will create an anonymous account for
   */
  const saveCurrentStateInUser = async () => {
    try {
      const uid = await _getCurrentUserUid();
      const userData = _createUserDataFromStores();
      await saveUserData(uid, userData);
    } catch (e) {
      console.error("error while saving current state in user", e);
    }
  };

  return { saveCurrentStateInUser };
}
