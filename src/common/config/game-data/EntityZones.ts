import { EntityZone } from "../../types/battle/entity-battle/EntityZone";
import { colors } from "../../utils/color-utils";
import Entities from "./Entites";

const EntityZones: EntityZone[] = [
  {
    name: "La Prairie Irlandaise",
    mainColor: colors.green[400],
    unlockLevel: 0,
    entities: [
      { entity: Entities.Audrey, number: 1 },
      { entity: Entities.Cheap, number: 5 },
      { entity: Entities.ASheep, number: 4 },
      { entity: Entities.BSheep, number: 4 },
      { entity: Entities.SansNom, number: 6 },
      { entity: Entities.Perdu, number: 2 },
      { entity: Entities.X2000Cyborg, number: 2 },
      { entity: Entities.MoutMout, number: 7 },
    ],
    nbEntities: 31,
  },
  {
    name: "Expédition à la banquise",
    mainColor: colors.blue[500],
    unlockLevel: 5,
    entities: [
      { entity: Entities.Agentpingoo, number: 1 },
      { entity: Entities.Akira78, number: 4 },
      { entity: Entities.BigNoseTank, number: 5 },
      { entity: Entities.ClubPingu, number: 4 },
      { entity: Entities.Franky, number: 2 },
      { entity: Entities.GrosNez, number: 4 },
      { entity: Entities.Tankker, number: 2 },
      { entity: Entities.Tankky, number: 2 },
    ], //tank, pingoo
    nbEntities: 24,
  },
  {
    name: "Le Cosmos rosé",
    mainColor: colors.pink[600],
    unlockLevel: 9,
    entities: [
      { entity: Entities.PoulpySwag, number: 20 },
      { entity: Entities.Gremlins, number: 10 },
      { entity: Entities.HorrorMask, number: 1 },
    ], //poulpe, gremlins, horrormask
    nbEntities: 31,
  },
  {
    name: "The EndGame",
    mainColor: colors.purple[800],
    unlockLevel: 12,
    entities: [
      { entity: Entities.DieuPoulpe, number: 1 },
      { entity: Entities.Agentpingoo, number: 1 },
      { entity: Entities.HorrorMask, number: 1 },
    ], //poulpegod
    nbEntities: 1,
  },
];

export default EntityZones;
