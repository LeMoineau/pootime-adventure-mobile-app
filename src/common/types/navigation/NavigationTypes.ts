import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ServerTypes } from "../battle/online-battle/ServerTypes";
import { StructureName } from "../../config/game-data/Structures";

export type RouteName =
  | "App"
  | "Inventory"
  | "OnlineArena"
  | "EntityArena"
  | "Settings"
  | "AccountSettings"
  | "DevSettings"
  | "EventSettings"
  | "DonationSettings"
  | "TutoSettings"
  | "StructureInfos";

export type ParamListBase = {
  Inventory: undefined;
  App: undefined;
  OnlineArena: { room: ServerTypes.Room };
  EntityArena: { zoneIndex: number };
  Settings: undefined;
  AccountSettings: undefined;
  DevSettings: undefined;
  EventSettings: undefined;
  DonationSettings: undefined;
  TutoSettings: undefined;
  StructureInfos: { structureName: StructureName };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
