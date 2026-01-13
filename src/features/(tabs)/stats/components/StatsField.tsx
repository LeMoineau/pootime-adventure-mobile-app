import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../common/utils/color-utils";
import { style } from "../../../../common/utils/style-utils";
import PlusIcon from "../../../../common/components/icons/plus";

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
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          {
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: colors.gray[50],
            paddingVertical: 10,
            paddingHorizontal: 15,
          },
        ]}
      >
        <Text
          style={[style.textBold, style.textMd, { flex: 1, paddingRight: 10 }]}
        >
          {value}
        </Text>
        <Pressable
          onPress={() => {
            upgradeAvailable && onUpgrade && onUpgrade();
          }}
          style={[
            style.rounded,
            style.border,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              width: 35,
              height: 35,
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
