import { ScrollView, View, useWindowDimensions } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";

export default function SettingsPage({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { height } = useWindowDimensions();
  return (
    <View
      style={[
        style.wFull,
        {
          flex: 1,
          height: height,
          backgroundColor: colors.orange[200],
        },
      ]}
    >
      {header}
      <ScrollView style={[style.wFull, { flex: 1 }]}>
        <View
          style={[
            style.flexCol,
            style.itemsCenter,
            style.wFull,
            {
              flex: 1,
              paddingBottom: 20,
              paddingHorizontal: 10,
            },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </View>
  );
}
