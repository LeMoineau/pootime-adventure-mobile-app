import { View, useWindowDimensions } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { colors } from "../../../constants/style/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomPage({
  children,
  bgColor,
  ...props
}: {
  children: React.ReactNode;
  bgColor?: string;
} & ViewProps) {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "off" }}
      {...props}
      style={[{ flex: 1, height, elevation: 0 }, props.style]}
    >
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height,
            zIndex: -10,
            backgroundColor: bgColor ?? colors.baseBackgroundColor,
            elevation: 0,
          },
        ]}
      ></View>
      {children}
    </SafeAreaView>
  );
}
