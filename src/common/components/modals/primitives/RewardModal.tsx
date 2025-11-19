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
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      {...props}
    >
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: "rgba(0, 0, 0, 0.5)" },
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
          {rewards.length <= 0 ? (
            <View style={[{ height: 20 }]}></View>
          ) : (
            <View
              style={[
                style.wFull,
                style.border,
                style.roundedSm,
                style.flexRow,
                {
                  backgroundColor: colors.gray[50],
                  borderColor: colors.gray[200],
                  paddingVertical: 20,
                  marginVertical: 20,
                },
              ]}
            >
              {rewards
                .filter((r) => r.number !== 0)
                .map((reward, index) => (
                  <View
                    key={`reward-${index}`}
                    style={[
                      style.flexRow,
                      style.justifyCenter,
                      style.itemsCenter,
                      { flex: 1 },
                    ]}
                  >
                    <TextWithResourceIcon
                      resource={reward.resource}
                      text={reward.number}
                      fontSize={18}
                    ></TextWithResourceIcon>
                  </View>
                ))}
            </View>
          )}

          <StandardButton
            style={[{ width: "100%", marginTop: 10 }]}
            bgColor={rewards.length > 0 ? colors.teal[400] : colors.red[400]}
            textColor={colors.white}
            viewStyle={[
              style.roundedFull,
              { paddingVertical: 15, paddingHorizontal: 50 },
            ]}
            textStyle={[{ flex: 1, fontSize: 17 }]}
            onPress={(evt) => {
              onCollectingRewards && onCollectingRewards(rewards);
              props.onRequestClose && props.onRequestClose(evt);
            }}
          >
            {rewards.length > 0 ? "Earn rewards" : "Cancel"}
          </StandardButton>
        </View>
      </View>
    </Modal>
  );
}
