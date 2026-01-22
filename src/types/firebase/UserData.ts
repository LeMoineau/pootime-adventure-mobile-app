import { DataInStorage } from "../../common/config/DataInStorage";
import { PooCreatureStats } from "../PooCreatureStats";
import { PooCreatureStyle } from "../PooCreatureStyle";
import { Inventory } from "../resources/Inventory";

export default interface UserData {
  resources: Inventory;
  style: PooCreatureStyle;
  stats: PooCreatureStats;
  village: DataInStorage.Village;
  itemsUnlocked: DataInStorage.ItemsUnlocked;
}

export interface IdentifiedUserData extends UserData {
  uid: string;
}
