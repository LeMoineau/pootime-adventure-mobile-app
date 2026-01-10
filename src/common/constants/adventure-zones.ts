import assets from "../config/assets";
import { colors } from "../utils/color-utils";

export const AdventureZones = [
  {
    name: "La plaine Irlandaise",
    desc: "Une plaine tranquille et verdoyante",
    icon: assets.sheepZone,
    unlockLevel: 0,
    style: {
      iconHeight: 200,
      mainColor: colors.green[300],
    },
  },
  {
    name: "Expédition à la banquise",
    desc: "Une plaine tranquille et verdoyante",
    icon: assets.banquiseZone,
    unlockLevel: 0,
    style: {
      iconHeight: 280,
      mainColor: colors.blue[200],
    },
  },
  {
    name: "Le cosmos Rosé",
    desc: "Une plaine tranquille et verdoyante",
    icon: assets.cosmosZone,
    unlockLevel: 0,
    style: {
      iconHeight: 280,
      mainColor: colors.pink[300],
    },
  },
  {
    name: "The EndGame",
    desc: "Une plaine tranquille et verdoyante",
    icon: assets.godPoulpeZone,
    unlockLevel: 0,
    style: {
      iconHeight: 350,
      mainColor: colors.yellow[400],
    },
  },
];
