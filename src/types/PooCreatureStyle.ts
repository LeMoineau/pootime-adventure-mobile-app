import {
  PooBodyColor,
  PooExpressionUrl,
  PooHeadName,
} from "./shop/BuyableItem";

export interface PooCreatureStyle {
  name: string;
  bodyColor: PooBodyColor;
  expression: PooExpressionUrl;
  head: PooHeadName;
}
