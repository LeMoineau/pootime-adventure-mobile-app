import {
  ImageBackground,
  SafeAreaView,
  View,
  useWindowDimensions,
} from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { colors } from "../../utils/color-utils";

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
    <SafeAreaView {...props} style={[{ flex: 1, elevation: 0 }, props.style]}>
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
      >
        {/* <ImageBackground
          source={{
            uri: "https://bigstones.fr/pootime-adventure/bg.png",
          }}
          style={[
            {
              flex: 1,
            },
          ]}
          resizeMode="cover"
        ></ImageBackground> */}
      </View>
      {children}
    </SafeAreaView>
  );
}
