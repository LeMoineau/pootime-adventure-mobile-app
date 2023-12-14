import { Image, ImageSourcePropType, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { style } from "../../services/style-utils";

export default function NumberField({
  value,
  appendIcon,
  ...props
}: { value: number; appendIcon?: ImageSourcePropType } & ViewProps) {
  return (
    <View {...props}>
      <View style={[{ marginRight: 25 }]}>
        <View
          style={[
            style.shadowMd,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              minWidth: 90,
              backgroundColor: "white",
              paddingRight: 17,
              height: 35,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            },
          ]}
        >
          <Text
            style={[
              style.wFull,
              style.textMd,
              {
                fontWeight: "600",
                textAlign: "right",
                color: "black",
              },
            ]}
          >
            {value}
          </Text>
          {appendIcon && (
            <Image
              source={appendIcon}
              style={[
                {
                  position: "absolute",
                  top: -2,
                  right: -25,
                  width: 40,
                  height: 40,
                },
              ]}
              resizeMode="contain"
            ></Image>
          )}
        </View>
      </View>
    </View>
  );
}
