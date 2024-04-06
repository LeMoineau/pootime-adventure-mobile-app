import { Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import PooCreatureHead from "./PooCreatureHead";
import { colors } from "../../../utils/color-utils";
import LevelProgressBar from "../../fields/LevelProgressBar";
import { usePooCreatureStyleStore } from "../../../stores/poo-creature-style.store";

export default function PooCreatureBadge({
  showInfos,
}: {
  showInfos?: boolean;
}) {
  const { name } = usePooCreatureStyleStore();
  return (
    <>
      <View
        style={[
          style.roundedFull,
          { padding: 20, marginTop: 20, backgroundColor: colors.white },
        ]}
      >
        <PooCreatureHead size={200}></PooCreatureHead>
      </View>
      {showInfos && (
        <>
          <Text style={[style.textBold, style.textMd, { marginVertical: 10 }]}>
            {name}
          </Text>
          <LevelProgressBar></LevelProgressBar>
        </>
      )}
    </>
  );
}
