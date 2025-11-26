import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ServerTypes } from "../battle/online-battle/ServerTypes";
import { StructureName } from "../../common/config/constants/Structures";

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
  | "StructureInfos"
  | "LeaderboardPage"
  | "LoginPage"
  | "RegisterPage"
  | "PlayerInfos";

export type ParamListBase = {
  Inventory: undefined;
  App: undefined;
  OnlineArena: { room: ServerTypes.Room };
  EntityArena: { zoneIndex: number };
  Settings: undefined;
  AccountSettings: { updateUser: boolean } | undefined;
  DevSettings: undefined;
  EventSettings: undefined;
  DonationSettings: undefined;
  TutoSettings: undefined;
  StructureInfos: { structureName: StructureName };
  LeaderboardPage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
  PlayerInfos: { uid: string };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
