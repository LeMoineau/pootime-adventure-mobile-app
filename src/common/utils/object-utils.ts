import { JSONObject } from "../../types/JSONObject";

export namespace ObjectUtils {
  export function equals(obj1: JSONObject, obj2: JSONObject): boolean {
    for (let k in obj1) {
      if (obj2[k] !== obj1[k]) return false;
    }
    return true;
  }
}
