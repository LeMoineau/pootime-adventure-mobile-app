import { View } from "react-native";

export default function UltiView({
  icon,
  desc,
  details,
  price,
}: {
  icon: React.ReactNode;
  desc: string;
  details: { mana: number; [key: string]: any };
  price: number;
}) {
  return <View></View>;
}
