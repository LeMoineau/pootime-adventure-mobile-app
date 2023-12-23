export interface UltiDetails {
  mana: number;
  damage?: number;
  stun?: number;
}

export interface UltiType {
  icon: string;
  title: string;
  desc: string;
  details: UltiDetails;
}

export const Ultis: { [name: string]: UltiType } = {
  entrouporte: {
    title: "Porte Entrouverte",
    desc: "Laisse vicieusement la porte entrouverte pour laisser s'échapper les mauvaises odeurs",
    icon: "https://bigstones.fr/pootime-adventure/ulti/entrouporte.png",
    details: { mana: 5, damage: 20 },
  },
  hypnoyt: {
    title: "Hypnose Youtube",
    desc: "Lance une vidéo Youtube et hypnose l'adversaire",
    icon: "https://bigstones.fr/pootime-adventure/ulti/hypnoyt.png",
    details: { mana: 20, damage: 80 },
  },
};
