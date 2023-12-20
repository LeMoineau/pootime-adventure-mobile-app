import { Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import StarIcon from "../../../common/components/icons/star";
import { colors } from "../../../common/utils/color-utils";
import { useResourcesStore } from "../../../common/stores/resources.store";

export default function UltiView({
  icon,
  title,
  desc,
  details,
  price,
  unlocked,
  selected,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: { mana: number; [key: string]: any };
  price: number;
  unlocked?: boolean;
  selected: boolean;
  onPress: (title: string) => void;
}) {
  const { stars } = useResourcesStore();

  return (
    <View
      style={[
        style.borderBottom,
        style.flexRow,
        style.itemsCenter,
        {
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 10,
        },
      ]}
    >
      <View>{icon}</View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={[style.textBold, {}]}>{title}</Text>
        <Text>{desc}</Text>
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
      <Pressable
        onPress={() => onPress(title)}
        style={[
          style.hFull,
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          style.rounded,
          style.shadowMd,
          {
            backgroundColor: !unlocked
              ? stars >= price
                ? colors.teal[400]
                : colors.gray[400]
              : selected
              ? colors.teal[400]
              : colors.white,
            paddingHorizontal: 10,
            minWidth: 50,
          },
        ]}
      >
        {!unlocked ? (
          <>
            <Text
              style={[style.textBold, style.textMd, { color: colors.white }]}
            >
              {price}{" "}
            </Text>
            <StarIcon></StarIcon>
          </>
        ) : (
          <>
            <Text
              style={[
                style.textBold,
                { color: selected ? colors.white : colors.black },
              ]}
            >
              {selected ? "Selected" : "Select"}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
