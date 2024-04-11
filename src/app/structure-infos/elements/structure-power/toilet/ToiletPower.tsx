import { View } from "react-native";
import StandardButton from "../../../../../common/components/buttons/StandardButton";
import { style } from "../../../../../common/utils/style-utils";
import { colors } from "../../../../../common/utils/color-utils";

export default function ToiletPower() {
  return (
    <>
      <View>
        <StandardButton
          bgColor={colors.blue[400]}
          viewStyle={[style.roundedFull, { paddingVertical: 17 }]}
          textStyle={[{ fontSize: 15 }]}
          textColor={colors.white}
          style={[{ marginTop: 10 }]}
        >
          Starting Pooing
        </StandardButton>
      </View>
    </>
  );
}
