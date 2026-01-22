import { Text } from "react-native";
import { colors } from "../../../../../utils/color-utils";

export default function ShopSectionTitle({ children }: { children?: string }) {
  return (
    <>
      <Text
        style={[
          {
            color: colors.gray[200],
            fontSize: 15,
            fontWeight: "500",
            paddingTop: 15,
            paddingBottom: 5,
            paddingHorizontal: 10,
            letterSpacing: 1,
          },
        ]}
      >
        {children}
      </Text>
    </>
  );
}
