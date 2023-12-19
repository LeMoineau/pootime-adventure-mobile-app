import { colors } from "../utils/color-utils";

export namespace ItemInStore {
  export const bodyColors: (string | { color: string; price: number })[] = [
    colors.baseBodyColor,
    colors.red[300],
    colors.blue[300],
    colors.green[300],
    colors.amber[300],
    colors.cyan[300],
    colors.emerald[300],
    colors.fuchsia[300],
    colors.gray[300],
    colors.indigo[300],
    colors.lime[300],
    colors.orange[300],
    colors.pink[300],
    colors.purple[300],
    colors.rose[300],
    colors.sky[300],
    colors.stone[300],
    colors.teal[300],
    { color: colors.transparent, price: 100 },
    colors.violet[300],
    colors.yellow[300],
    colors.white,
    colors.black,
  ];

  export const expressions: (string | { uri: string; price: number })[] = [
    "https://bigstones.fr/pootime-adventure/expressions/smile.png",
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/siffle.png",
      price: 500,
    },
    "https://bigstones.fr/pootime-adventure/expressions/gossip.png",
    "https://bigstones.fr/pootime-adventure/expressions/boring.png",
  ];
}
