import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ServerTypes } from "../ServerTypes";

export type RouteName = "App" | "Inventory" | "OnlineArena";

export type ParamListBase = {
  Inventory: undefined;
  App: undefined;
  OnlineArena: { room: ServerTypes.Room };
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
