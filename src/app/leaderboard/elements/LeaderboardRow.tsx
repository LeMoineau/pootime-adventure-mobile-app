import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import PooCreatureBadge from "../../../common/components/misc/poo-creature/PooCreatureBadge";
import { colors } from "../../../common/utils/color-utils";
import PooTropheeIcon from "../../../common/components/icons/resources/PooTropheeIcon";
import TextWithResourceIcon from "../../../common/components/text/TextWithResourceIcon";

export default function LeaderboardRow() {
  return (
    <>
      <View
        style={[
          style.flexRow,
          style.wFull,
          style.justifyBetween,
          style.itemsCenter,
          {
            padding: 10,
            maxWidth: "100%",
            overflow: "hidden",
          },
        ]}
      >
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            style.hFull,
            {
              flexGrow: 1,
              overflow: "hidden",
              width: "auto",
              maxWidth: "70%",
            },
          ]}
        >
          <PooCreatureBadge
            size={40}
            padding={7}
            useBodyColorForBackground
          ></PooCreatureBadge>
          <View style={[{ width: 10 }]}></View>
          <Text
            style={[{ fontSize: 20, fontWeight: "600", overflow: "hidden" }]}
            numberOfLines={1}
          >
            Un nom zqdoihqdzoi hqoizdh qoizdh oiqzhd oiqzhdo iqhzodiq hzoi dho
          </Text>
        </View>
        <TextWithResourceIcon
          resource="pooTrophee"
          text={255}
          fontSize={20}
          textStyle={[{ fontWeight: "500" }]}
        ></TextWithResourceIcon>
      </View>
    </>
  );
}
