import { EntityZone } from "../../types/battle/entity-battle/EntityZone";
import { colors } from "../../utils/color-utils";
import Entities from "./Entites";

const EntityZones: EntityZone[] = [
  {
    name: "La Prairie Irlandaise",
    mainColor: colors.green[400],
    unlockLevel: 0,
    entities: [
      {
        entity: Entities.Audrey,
        number: 1,
      },
      {
        entity: Entities.Cheap,
        number: 4,
      },
      {
        entity: Entities.ASheep,
        number: 3,
      },
    ],
    nbEntities: 8,
  },
  {
    name: "La Forêt",
    mainColor: colors.blue[500],
    unlockLevel: 7,
    entities: [],
    nbEntities: 0,
  },
];

export default EntityZones;
