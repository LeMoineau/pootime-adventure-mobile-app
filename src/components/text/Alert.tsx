import { Text, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";

export default function Alert({
  content,
  variant,
}: {
  content?: string;
  variant?: "classic" | "error";
}) {
  return (
    <>
      <View
        style={[
          style.roundedSm,
          style.border,
          {
            flex: 1,
            backgroundColor:
              variant === "error" ? colors.red[200] : colors.blue[100],
            borderColor: variant === "error" ? colors.red[300] : undefined,
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        ]}
      >
        <Text
          style={[{ color: variant === "error" ? colors.error : colors.black }]}
        >
          {content}
        </Text>
      </View>
    </>
  );
}
