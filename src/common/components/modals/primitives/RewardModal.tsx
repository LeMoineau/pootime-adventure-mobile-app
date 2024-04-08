import { Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";
import { BattleReward } from "../../../types/battle/online-battle/BattleReward";
import TextWithResourceIcon from "../../text/TextWithResourceIcon";

export default function RewardModal({
  children,
  rewards,
  onCollectingRewards,
  ...props
}: {
  children?: React.ReactNode;
  rewards: BattleReward;
  onCollectingRewards?: (rewards: BattleReward) => void;
} & ModalProps) {
  return (
    <Modal animationType="slide" transparent {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20 },
        ]}
      >
        <View
          style={[
            style.rounded,
            style.shadowMd,
            style.wFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            { padding: 20, backgroundColor: "white" },
          ]}
        >
          {children}
          <View
            style={[
              style.wFull,
              style.border,
              style.roundedSm,
              style.flexRow,
              {
                backgroundColor: colors.gray[50],
                borderColor: colors.gray[200],
                padding: 20,
                marginVertical: 20,
              },
            ]}
          >
            {rewards.map((reward) => (
              <View
                style={[
                  style.flexRow,
                  style.justifyCenter,
                  style.itemsCenter,
                  { flex: 1 },
                ]}
              >
                <TextWithResourceIcon
                  resource={reward.resource}
                  text={`${reward.number}`}
                  fontSize={18}
                ></TextWithResourceIcon>
              </View>
            ))}
          </View>
          <StandardButton
            bgColor={colors.teal[400]}
            textColor={colors.white}
            textStyle={{ flex: 0 }}
            onPress={(evt) => {
              onCollectingRewards && onCollectingRewards(rewards);
              props.onRequestClose && props.onRequestClose(evt);
            }}
          >
            Earn rewards
          </StandardButton>
        </View>
      </View>
    </Modal>
  );
}
