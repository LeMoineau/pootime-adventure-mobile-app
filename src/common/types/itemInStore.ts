import { colors } from "../utils/color-utils";
import { UltiType } from "./UltiType";

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

  export const heads: (string | { name: string; price: number })[] = [
    "classic",
    {
      name: "flower",
      price: 500,
    },
  ];

  export const expressions: (string | { uri: string; price: number })[] = [
    "https://bigstones.fr/pootime-adventure/expressions/smile.png",
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/siffle.png",
      price: 500,
    },
    "https://bigstones.fr/pootime-adventure/expressions/gossip.png",
    "https://bigstones.fr/pootime-adventure/expressions/boring.png",
    "https://bigstones.fr/pootime-adventure/expressions/afraid.png",
    "https://bigstones.fr/pootime-adventure/expressions/bigeyes.png",
    "https://bigstones.fr/pootime-adventure/expressions/bigsmile.png",
    "https://bigstones.fr/pootime-adventure/expressions/happy.png",
    "https://bigstones.fr/pootime-adventure/expressions/reallyangry.png",
    "https://bigstones.fr/pootime-adventure/expressions/suspicious.png",
    "https://bigstones.fr/pootime-adventure/expressions/winkle.png",
    {
      uri: "https://bigstones.fr/pootime-adventure/expressions/monster.png",
      price: 1000,
    },
  ];

  export const ultis: UltiType[] = [
    {
      title: "Porte Entrouverte",
      desc: "Laisse vicieusement la porte entrouverte pour laisser s'échapper les mauvaises odeurs",
      icon: "https://bigstones.fr/pootime-adventure/ulti/entrouporte.png",
      details: { mana: 5, attaque: 20 },
      price: 5,
    },
    {
      title: "Hypnose Youtube",
      desc: "Lance une vidéo Youtube et hypnose l'adversaire",
      icon: "https://bigstones.fr/pootime-adventure/ulti/hypnoyt.png",
      details: { mana: 20, stun: "2s" },
      price: 40,
    },
  ];
}
