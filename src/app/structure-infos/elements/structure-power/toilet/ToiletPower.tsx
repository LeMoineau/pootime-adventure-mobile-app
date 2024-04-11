import { Text, View } from "react-native";
import StandardButton from "../../../../../common/components/buttons/StandardButton";
import { style } from "../../../../../common/utils/style-utils";
import { colors } from "../../../../../common/utils/color-utils";
import TabTitle from "../../text/TabTitle";
import TabText from "../../text/TabText";
import Divider from "../../../../../common/components/text/Divider";
import ToiletTimer from "./ToiletTimer";
import { useState } from "react";
import useModals from "../../../../../common/hooks/use-modals";
import PooingRewardModal from "./PooingRewardModal";
import { BattleReward } from "../../../../../common/types/battle/online-battle/BattleReward";
import { useResourcesStore } from "../../../../../common/stores/resources.store";
import { CurveUtils } from "../../../../../common/utils/curve-utils";
import { VillageUtils } from "../../../../../common/utils/village-utils";
import { useVillageStore } from "../../../../../common/stores/village.store";

export default function ToiletPower() {
  const [timerPlaying, setTimerPlaying] = useState(false);
  const [pooingRewards, setPooingRewards] = useState<BattleReward>();
  const { isVisible, show, hide } = useModals<"confirm" | "reward">();
  const { earn } = useResourcesStore();
  const { get } = useVillageStore();

  return (
    <>
      <View
        style={[
          style.border,
          style.rounded,
          {
            paddingVertical: 20,
            paddingHorizontal: 15,
            backgroundColor: colors.gray[50],
          },
        ]}
      >
        <TabTitle>Pooing</TabTitle>
        <TabText>
          Chronomètre le temps que tu passes au toilette et récupère des
          récompenses !
        </TabText>
        <Divider style={[{ marginBottom: 10 }]}></Divider>
        <ToiletTimer
          isPlaying={timerPlaying}
          wantToStop={isVisible("confirm")}
          onCancelStoping={() => hide("confirm")}
          onConfirmStoping={(elapsedTime) => {
            setTimerPlaying(false);
            setPooingRewards(
              VillageUtils.calculateToiletRewards(
                elapsedTime,
                get("toilet").level
              )
            );
            show("reward");
            hide("confirm");
          }}
        ></ToiletTimer>
        <StandardButton
          bgColor={!timerPlaying ? colors.blue[400] : colors.red[400]}
          viewStyle={[style.roundedFull, { paddingVertical: 17 }]}
          textStyle={[{ fontSize: 15 }]}
          textColor={colors.white}
          style={[{ marginTop: 10 }]}
          onPress={() => {
            if (!timerPlaying) {
              setTimerPlaying(true);
            } else {
              show("confirm");
            }
          }}
        >
          {!timerPlaying ? "Starting Pooing" : "Stop Timer"}
        </StandardButton>
      </View>
      {pooingRewards && (
        <PooingRewardModal
          visible={isVisible("reward")}
          onRequestClose={() => hide("reward")}
          onCollectingRewards={async (rewards) => {
            for (let r of rewards) {
              await earn(r.resource, r.number);
            }
          }}
          rewards={pooingRewards}
        ></PooingRewardModal>
      )}
    </>
  );
}
