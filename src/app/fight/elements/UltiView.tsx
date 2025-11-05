import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";

export default function UltiView({
  icon,
  title,
  desc,
  details,
  unlockLevel,
  unlocked,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: { mana: number; [key: string]: any };
  unlockLevel: number;
  unlocked?: boolean;
  selected: boolean;
  onPress: (title: string) => void;
}) {
  return (
    <Pressable onPress={() => onPress(title)}>
      <View
        style={[
          style.borderBottom,
          {
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: selected ? colors.blue[400] : colors.white,
          },
        ]}
      >
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            {
              flex: 1,
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={[style.flexCol, style.justifyCenter, style.itemsCenter]}>
            <View>{icon}</View>
          </View>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Text
              style={[
                style.textBold,
                { color: selected ? colors.white : colors.black },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                style.textSm,
                {
                  textAlign: "justify",
                  color: selected ? colors.white : colors.black,
                },
              ]}
            >
              {desc}
            </Text>
            <View
              style={[
                style.wFull,
                style.flexRow,
                style.flexWrap,
                style.border,
                style.roundedSm,
                { marginTop: 10, backgroundColor: colors.gray[50], padding: 5 },
              ]}
            >
              {Object.keys(details).map((key, index) => {
                return (
                  <View key={index} style={[{ width: "50%" }]}>
                    <Text>
                      {key} {details[key]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      {!unlocked && (
        <View
          style={[
            style.wFull,
            style.hFull,
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            {
              position: "absolute",
              top: 0,
              left: 0,
              padding: 20,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          ]}
        >
          <Text style={[style.textBold, style.textMd, { color: colors.white }]}>
            Débloqué au{" "}
          </Text>
          <Text
            style={[
              style.textMd,
              {
                color: colors.white,
                backgroundColor: colors.baseProgressColor,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 7,
              },
            ]}
          >
            Niveau {unlockLevel}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
