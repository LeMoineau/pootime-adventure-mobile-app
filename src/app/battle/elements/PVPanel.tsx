import { Text, View } from "react-native";
import ProgressBar from "../../../common/components/fields/ProgressBar";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";

export default function PVPanel({ right }: { right?: boolean }) {
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
      <Text
        style={[
          style.textBold,
          style.textMd,
          {
            color: colors.white,
            textAlign: right ? "right" : "left",
            marginBottom: 5,
          },
        ]}
      >
        Mr. Popo
      </Text>
      <ProgressBar
        width={"100%"}
        style={{
          flex: 1,
          transform: [{ rotateY: right ? "180deg" : "0deg" }],
        }}
        max={20}
        current={12}
        progressColor={colors.green[500]}
      ></ProgressBar>
    </View>
  );
}
