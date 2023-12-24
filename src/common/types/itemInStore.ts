import { colors } from "../utils/color-utils";

export namespace ItemInStore {
  export const bodyColors: (string | { color: string; price: number })[] = [
    colors.baseBodyColor,
    colors.red[300],
    colors.orange[300],
    colors.amber[300],
    colors.yellow[300],
    colors.lime[300],
    colors.green[300],
    colors.emerald[300],
    colors.teal[300],
    colors.cyan[300],
    colors.sky[300],
    colors.blue[300],
    colors.indigo[300],
    colors.violet[300],
    colors.purple[300],
    colors.fuchsia[300],
    colors.pink[300],
    colors.black,
    colors.gray[300],
    colors.stone[300],
    colors.white,
    { color: colors.transparent, price: 100 },
  ];

  export const heads: (string | { name: string; price: number })[] = [
    "classic",
    {
      name: "flower",
      price: 500,
    },
  ];

  export const expressions: (string | { uri: string; price: number })[] = [
    "https://bigstones.fr/pootime-adventure/expressions/smile.png",

    "https://bigstones.fr/pootime-adventure/expressions/gossip.png",
    "https://bigstones.fr/pootime-adventure/expressions/boring.png",
    "https://bigstones.fr/pootime-adventure/expressions/afraid.png",
    "https://bigstones.fr/pootime-adventure/expressions/bigeyes.png",
    "https://bigstones.fr/pootime-adventure/expressions/bigsmile.png",
    "https://bigstones.fr/pootime-adventure/expressions/happy.png",

    "https://bigstones.fr/pootime-adventure/expressions/suspicious.png",
    "https://bigstones.fr/pootime-adventure/expressions/winkle.png",
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/siffle.png",
      price: 500,
    },
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/reallyangry.png",
      price: 750,
    },
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/monster.png",
      price: 1000,
    },
  ];

  export const ultis: { name: string; price: number }[] = [
    {
      name: "entrouporte",
      price: 5,
    },
    {
      name: "hypnoyt",
      price: 40,
    },
  ];
}
