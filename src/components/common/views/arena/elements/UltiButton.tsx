import { Image, View } from "react-native";
import { style } from "../../../../../utils/style-utils";
import { colors } from "../../../../../constants/style/colors";
import PillButton from "../../../buttons/PillButton";
import { UltiType } from "../../../../../types/Ultis";

export default function UltiButton({
  ultiSelected,
  currentMana,
  onPress,
}: {
  ultiSelected: UltiType;
  currentMana: number;
  onPress: (ulti: UltiType) => void;
}) {
  return (
    <View
      style={[
        style.roundedFull,
        style.overflowHidden,
        { position: "absolute", bottom: 20, right: 20 },
      ]}
    >
      <View
        style={[
          style.wFull,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: `${(currentMana / ultiSelected.details.mana) * 100}%`,
            opacity: 0.9,
            backgroundColor:
              ultiSelected.details.mana <= currentMana
                ? colors.amber[400]
                : colors.gray[50],
          },
        ]}
      ></View>
      <PillButton
        onPress={() => onPress(ultiSelected)}
        styleView={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          {
            width: 150,
            height: 150,
            backgroundColor: colors.amber[50],
            borderColor: colors.amber[200],
            opacity: 0.7,
          },
        ]}
      >
        <Image
          source={{ uri: ultiSelected.icon }}
          style={[{ width: "50%", height: "50%" }]}
        ></Image>
      </PillButton>
    </View>
  );
}
