import { NavigationProp, RouteProp } from "@react-navigation/native";

export type RouteName = "App" | "Inventory";

export type ParamListBase = {
  Inventory: undefined;
  App: undefined;
};

export type useNavigationType = NavigationProp<ParamListBase>;
export type useRouteType<T extends RouteName> = RouteProp<ParamListBase, T>;
