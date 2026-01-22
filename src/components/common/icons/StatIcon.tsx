import { useAssets, Asset } from "expo-asset";
import { PooCreatureStats } from "../../../types/PooCreatureStats";
import { Image, ImageStyle } from "expo-image";
import assets from "../../../config/assets";
import { StyleProp } from "react-native";

export default function StatIcon({
  statKey,
  size,
  style,
}: {
  statKey: keyof PooCreatureStats;
  size?: number;
  style?: StyleProp<ImageStyle>;
}) {
  return (
    <Image
      source={assets[statKey]}
      contentFit="contain"
      style={[{ width: size ?? 50, height: size ?? 50 }, style]}
    ></Image>
  );
}
