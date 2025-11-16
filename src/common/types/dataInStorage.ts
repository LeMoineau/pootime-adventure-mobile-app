import { PooCreatureStyle as Style } from "./PooCreatureStyle";
import { PooCreatureStats as Stats } from "./PooCreatureStats";

export namespace DataInStorage {
  export interface PooCreatureStyle extends Style {}

  export interface PooCreatureStats extends Stats {}

  export interface ItemsUnlocked {
    bodyColors: string[];
    heads: string[];
    expressions: string[];
    events: string[];
    options: { [option: string]: any };
  }

  export function isItemsUnlocked(json: any): json is ItemsUnlocked {
    return (
      json.bodyColor &&
      Array.isArray(json.bodyColor) &&
      json.heads &&
      Array.isArray(json.heads) &&
      json.expressions &&
      Array.isArray(json.expressions) &&
      json.events &&
      Array.isArray(json.events) &&
      json.options
    );
  }

  export function convertOldItemsUnlockedToNewType(json: any): ItemsUnlocked {
    return {
      bodyColors: [...Object.keys(json.bodyColors)],
      heads: [...Object.keys(json.heads)],
      expressions: [...Object.keys(json.expressions)],
      events: [...Object.keys(json.events)],
      options: json.options,
    };
  }
}
