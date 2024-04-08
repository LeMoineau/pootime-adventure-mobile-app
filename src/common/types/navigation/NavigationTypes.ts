import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ServerTypes } from "../battle/online-battle/ServerTypes";

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
  | "TutoSettings";

export type ParamListBase = {
  Inventory: undefined;
  App: undefined;
  OnlineArena: { room: ServerTypes.Room };
  EntityArena: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  DevSettings: undefined;
  EventSettings: undefined;
  DonationSettings: undefined;
  TutoSettings: undefined;
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
