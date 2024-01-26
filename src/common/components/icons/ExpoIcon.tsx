import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

type IoniconsNames = keyof typeof Ionicons.glyphMap;
type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap;
type FontAwesomeNames = keyof typeof FontAwesome.glyphMap;

export type AllIconNames =
  | MaterialIconsNames
  | FontAwesomeNames
  | IoniconsNames;

export default function ExpoIcon({
  name,
  size,
}: {
  name: AllIconNames;
  size?: number;
}) {
  return (
    <>
      {name in Ionicons.glyphMap ? (
        <Ionicons size={size} name={name as IoniconsNames}></Ionicons>
      ) : name in MaterialIcons.glyphMap ? (
        <MaterialIcons
          name={name as MaterialIconsNames}
          size={size}
        ></MaterialIcons>
      ) : (
        <FontAwesome name={name as FontAwesomeNames} size={size}></FontAwesome>
      )}
    </>
  );
}
