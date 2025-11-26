import { GestureResponderEvent, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PillButton from "../../../common/components/buttons/PillButton";
import RightArrow from "../../../common/components/icons/rightArrow";
import { colors } from "../../../common/utils/color-utils";

export default function SettingsHeader({
  title,
  onPressBack,
}: {
  title?: string;
  onPressBack?: (evt: GestureResponderEvent) => void;
}) {
  return (
    <>
      <View
        style={[
          style.wFull,
          style.flexRow,
          style.itemsCenter,
          {
            justifyContent: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 20,
            paddingTop: 40,
            position: "absolute",
            top: 0,
            zIndex: 2,
          },
        ]}
      >
        <PillButton
          style={[{ marginRight: 5 }]}
          styleView={[{ padding: 10, borderWidth: 0 }]}
          onPress={onPressBack}
        >
          <RightArrow
            size={20}
            strokeWidth={10}
            style={[{ transform: [{ rotateZ: "180deg" }] }]}
          ></RightArrow>
        </PillButton>
        {title && (
          <Text
            style={[
              style.wFull,
              style.textMd,
              style.textBold,
              { marginLeft: 15 },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </>
  );
}
