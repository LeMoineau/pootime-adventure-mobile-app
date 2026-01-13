import { ColorValue, View } from "react-native";
import CustomModal from "./CustomModal";
import { colors } from "../../../utils/color-utils";
import { BattleReward } from "../../../types/battle/BattleReward";
import { style } from "../../../utils/style-utils";
import TextWithResourceIcon from "../../text/TextWithResourceIcon";

export default function CustomRewardModal({
  visible,
  title = "Récompense !",
  desc = "",
  mainColor = colors.primary,
  rewards,
  onPressEarnBtn,
}: {
  visible: boolean;
  title?: string;
  desc?: string;
  mainColor?: ColorValue;
  rewards: BattleReward;
  onPressEarnBtn?: (r: BattleReward) => void;
}) {
  return (
    <CustomModal
      {...{ visible, title, desc, mainColor }}
      actionsBtns={[
        {
          text: "Collecter",
          dontCloseModalOnPress: true,
          onPress: () => {
            onPressEarnBtn && onPressEarnBtn(rewards);
          },
        },
      ]}
    >
      <View
        style={[
          style.wFull,
          style.border,
          style.roundedSm,
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          {
            backgroundColor: colors.gray[50],
            borderColor: colors.gray[200],
            paddingVertical: 20,
            paddingHorizontal: 20,
            marginVertical: 20,
            flexWrap: "wrap",
            columnGap: 15,
          },
        ]}
      >
        {rewards
          .filter((r) => r.number !== 0)
          .map((reward, index) => (
            <TextWithResourceIcon
              resource={reward.resource}
              text={reward.number}
              fontSize={18}
              key={index}
            ></TextWithResourceIcon>
          ))}
      </View>
    </CustomModal>
  );
}
