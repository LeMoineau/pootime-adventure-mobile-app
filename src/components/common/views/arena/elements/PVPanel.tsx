import { Text, View } from "react-native";
import ProgressBar from "../../../fields/ProgressBar";
import { colors } from "../../../../../constants/style/colors";
import { style } from "../../../../../utils/style-utils";

export default function PVPanel({
  pooName,
  pvMax,
  currentPv,
  level,
  right,
}: {
  pooName: string;
  pvMax: number;
  currentPv: number;
  level: number;
  right?: boolean;
}) {
  return (
    <View
      style={[
        {
          paddingLeft: right ? 20 : 10,
          paddingRight: right ? 10 : 20,
          paddingTop: 10,
          flex: 1,
        },
      ]}
    >
      <View
        style={[
          style.itemsCenter,
          style.overflowHidden,
          {
            flexDirection: right ? "row-reverse" : "row",
            maxHeight: 30,
            marginBottom: 5,
            justifyContent: "space-between",
          },
        ]}
      >
        <Text
          style={[
            style.textBold,
            style.textMd,
            {
              color: colors.white,
            },
          ]}
        >
          {pooName.substring(0, 15)}
        </Text>
        <Text
          style={[
            style.roundedSm,
            style.textBold,
            {
              backgroundColor: colors.baseProgressColor,
              paddingHorizontal: 10,
              paddingVertical: 5,
              color: colors.white,
            },
          ]}
        >
          Lv.{level}
        </Text>
      </View>
      <ProgressBar
        width={"100%"}
        style={{
          flex: 1,
          transform: [{ rotateY: right ? "180deg" : "0deg" }],
        }}
        max={pvMax}
        current={currentPv < 0 ? 0 : currentPv}
        progressColor={colors.green[500]}
      ></ProgressBar>
    </View>
  );
}
