import { Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import { Image } from "expo-image";
import { Ultis } from "../../types/Ultis";
import ExpoIcon from "../icons/ExpoIcon";

export default function UltiItem({ ulti }: { ulti?: string }) {
  return (
    <View
      style={[
        style.border,
        style.flexRow,
        style.itemsCenter,
        {
          flex: 1,
          borderRadius: 5,
          margin: 0,
          marginTop: 0,
          backgroundColor: ulti ? colors.blue[400] : colors.gray[400],
          borderColor: colors.white,
          opacity: ulti ? 1 : 0.7,
          padding: 10,
          gap: 10,
        },
      ]}
    >
      {ulti ? (
        <Image
          source={{
            uri: ulti ? Ultis[ulti].icon : "aucun",
          }}
          contentFit="contain"
          style={[{ width: 20, height: 20 }]}
        ></Image>
      ) : (
        <ExpoIcon
          name="not-interested"
          size={20}
          style={{ color: colors.white }}
        ></ExpoIcon>
      )}
      <Text
        numberOfLines={1}
        style={[{ flex: 1, fontSize: 10, color: colors.white }]}
      >
        {ulti ? Ultis[ulti].title : "Aucun"}
      </Text>
    </View>
  );
}
