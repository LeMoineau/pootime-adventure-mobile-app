import { colors } from "../../utils/color-utils";
import { ShopItem } from "../../types/shop/ShopItem";
import { BuyableItem } from "../../types/shop/BuyableItem";

const ShopItems: {
  [section in BuyableItem]?: {
    sectionTitle?: string;
    items: ShopItem[];
  };
} = {
  bodyColors: {
    sectionTitle: "Couleur",
    items: [
      { item: colors.baseBodyColor },
      { item: colors.red[300] },
      { item: colors.orange[300] },
      { item: colors.amber[300] },
      { item: colors.yellow[300] },
      { item: colors.lime[300] },
      { item: colors.green[300] },
      { item: colors.emerald[300] },
      { item: colors.teal[300] },
      { item: colors.cyan[300] },
      { item: colors.sky[300] },
      { item: colors.blue[300] },
      { item: colors.indigo[300] },
      { item: colors.violet[300] },
      { item: colors.purple[300] },
      { item: colors.fuchsia[300] },
      { item: colors.pink[300] },
      { item: colors.black },
      { item: colors.gray[300] },
      { item: colors.stone[300], price: 100, resource: "pooCoins" },
      { item: colors.white, price: 100, resource: "pooCoins" },
      { item: colors.transparent, price: 100, resource: "pooCoins" },
    ],
  },
  heads: {
    sectionTitle: "Tête",
    items: [
      { item: "classic" },
      {
        item: "flower",
        prices: [100, 2],
        resources: ["pooCoins", "stars"],
      },
      {
        item: "sheepWithEar",
        price: 500,
        resource: "wool",
      },
      {
        item: "sheep",
        price: 1000,
        resource: "wool",
      },
      {
        item: "sheepQueen",
        price: 2500,
        resource: "wool",
      },
      { item: "pingoo", resource: "snow", price: 1500 },
      {
        item: "poulpe",
        resources: ["ink", "cosmicPowder"],
        prices: [1500, 10],
      },
      {
        item: "aureoledClassic",
        resources: ["cosmicPowder", "pooCoins"],
        prices: [50, 2500],
      },
    ],
  },
  expressions: {
    sectionTitle: "Visage",
    items: [
      { item: "https://bigstones.fr/pootime-adventure/expressions/smile.png" },

      { item: "https://bigstones.fr/pootime-adventure/expressions/gossip.png" },
      { item: "https://bigstones.fr/pootime-adventure/expressions/boring.png" },
      { item: "https://bigstones.fr/pootime-adventure/expressions/afraid.png" },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/bigeyes.png",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/bigsmile.png",
      },
      { item: "https://bigstones.fr/pootime-adventure/expressions/happy.png" },

      {
        item: "https://bigstones.fr/pootime-adventure/expressions/suspicious.png",
      },
      { item: "https://bigstones.fr/pootime-adventure/expressions/winkle.png" },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/siffle.png",
        price: 500,
        resource: "pooCoins",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/reallyangry.png",
        price: 750,
        resource: "pooCoins",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/monster.png",
        price: 1000,
        resource: "pooCoins",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/losesheep.png",
        price: 200,
        resource: "wool",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/proudsheep.png",
        price: 1000,
        resource: "wool",
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/pingoonose.png",
        resources: ["snow", "glass"],
        prices: [1500, 500],
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/poulpeeyes.png",
        resource: "ink",
        price: 500,
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/bignosesmile.png",
        resources: ["ink", "cosmicPowder"],
        prices: [2000, 20],
      },
      {
        item: "https://bigstones.fr/pootime-adventure/expressions/bignosenotsmile.png",
        resources: ["ink"],
        prices: [1000],
      },
    ],
  },
  resources: {
    items: [
      // {
      //   item: {
      //     resource: "stars",
      //     number: 1,
      //   },
      //   resource: "pooCoins",
      //   price: 1,
      // },
      // {
      //   item: {
      //     resource: "pooCoins",
      //     number: 1,
      //   },
      //   resource: "stars",
      //   price: 1,
      // },
      {
        item: {
          resource: "stars",
          number: 1,
        },
        resource: "pooCoins",
        price: 1000,
      },
      {
        item: {
          resource: "stars",
          number: 1,
        },
        resource: "cosmicPowder",
        price: 10,
      },
      {
        item: {
          resource: "pooCoins",
          number: 100,
        },
        resource: "wool",
        price: 250,
      },
      {
        item: {
          resource: "pooCoins",
          number: 1000,
        },
        resource: "wool",
        price: 2500,
      },
      {
        item: {
          resource: "pooCoins",
          number: 100,
        },
        resource: "snow",
        price: 250,
      },
      {
        item: {
          resource: "pooCoins",
          number: 1000,
        },
        resource: "snow",
        price: 2500,
      },
      {
        item: {
          resource: "pooCoins",
          number: 100,
        },
        resource: "ink",
        price: 250,
      },
      {
        item: {
          resource: "pooCoins",
          number: 1000,
        },
        resource: "ink",
        price: 2500,
      },
    ],
  },
};

export default ShopItems;
