import { Structure } from "../../types/village/Structure";

export type StructureName = "toilet";

export const Structures: { [name in StructureName]: Structure } = {
  toilet: {
    name: "Toilettes",
    buildingCost: {},
    style: { position: [20, 20], size: 40 },
  },
};
