import { Pressable, Text, View } from "react-native";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import PlusIcon from "../../../common/components/icons/plus";

export default function StatsField({
  label,
  value,
  upgradeAvailable,
  onUpgrade,
}: {
  label: string;
  value: string | number;
  upgradeAvailable?: boolean;
  onUpgrade?: () => void;
}) {
  return (
    <View
      style={[
        {
          width: "50%",
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
      ]}
    >
      <Text style={[style.textSm, { paddingHorizontal: 10, marginBottom: 5 }]}>
        {label}
      </Text>
      <View
        style={[
          style.roundedFull,
          style.shadowMd,
          style.border,
          {
            flex: 1,
            backgroundColor: colors.gray[50],
            paddingVertical: 10,
            paddingHorizontal: 15,
          },
        ]}
      >
        <Text style={[style.textBold, style.textMd, {}]}>{value}</Text>
        <Pressable
          onPress={() => {
            upgradeAvailable && onUpgrade && onUpgrade();
          }}
          style={[
            style.rounded,
            style.border,
            style.shadowMd,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              position: "absolute",
              right: 15,
              top: "50%",
              width: 35,
              height: 35,
              transform: [{ translateY: -17 }],
              backgroundColor: upgradeAvailable
                ? colors.orange[400]
                : colors.gray[200],
            },
          ]}
        >
          <PlusIcon size={25}></PlusIcon>
        </Pressable>
      </View>
    </View>
  );
}
