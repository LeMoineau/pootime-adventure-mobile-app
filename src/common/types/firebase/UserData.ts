import { DataInStorage } from "../../config/DataInStorage";
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

export interface UserDataWithUid extends UserData {
  uid: string;
}
