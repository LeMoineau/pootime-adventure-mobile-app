import { ColorValue, View } from "react-native";
import CustomModal, { CustomModalProps } from "./CustomModal";
import { colors } from "../../../../constants/style/colors";
import { BattleReward } from "../../../../types/battle/BattleReward";
import { style } from "../../../../utils/style-utils";
import TextWithResourceIcon from "../../text/TextWithResourceIcon";

export interface CustomRewardModalProps extends CustomModalProps {
  rewards: BattleReward;
  onPressEarnBtn?: (r: BattleReward) => void;
  dontCloseModalOnPressingEarnBtn?: boolean;
}

export default function CustomRewardModal({
  desc = "",
  mainColor = colors.primary,
  rewards,
  onPressEarnBtn,
  dontCloseModalOnPressingEarnBtn,
  ...props
}: CustomRewardModalProps) {
  return (
    <CustomModal
      desc={desc}
      mainColor={mainColor}
      actionsBtns={[
        {
          text: "Collecter",
          dontCloseModalOnPress: dontCloseModalOnPressingEarnBtn,
          onPress: () => {
            onPressEarnBtn && onPressEarnBtn(rewards);
          },
        },
      ]}
      {...props}
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
