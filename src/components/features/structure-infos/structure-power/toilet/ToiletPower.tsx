import { Text, View } from "react-native";
import StandardButton from "../../../../common/buttons/StandardButton";
import { style } from "../../../../../utils/style-utils";
import { colors } from "../../../../../constants/style/colors";
import TabTitle from "../../TabTitle";
import TabText from "../../TabText";
import Divider from "../../../../common/text/Divider";
import ToiletTimer from "./ToiletTimer";
import { useRef, useState } from "react";
import useModals from "../../../../../hooks/common/ui/use-modals";
import PooingRewardModal from "./PooingRewardModal";
import { BattleReward } from "../../../../../types/battle/BattleReward";
import { useResourcesStore } from "../../../../../stores/resources.store";
import { VillageUtils } from "../../../../../utils/village-utils";
import { useVillageStore } from "../../../../../stores/village.store";

export default function ToiletPower({}: { dateNow: number }) {
  const [dateNow, setDateNow] = useState(Date.now());
  const { get, saveDetail, getDetail, hasDetail, eraseDetail } =
    useVillageStore();
  const [timerPlaying, setTimerPlaying] = useState(
    hasDetail("toilet", "pooStartingTimer"),
  );
  const [pooingRewards, setPooingRewards] = useState<BattleReward>();
  const { isVisible, show, hide } = useModals<"confirm" | "reward">();
  const { earn } = useResourcesStore();

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
          alreadyElapsedTime={
            hasDetail("toilet", "pooStartingTimer")
              ? dateNow - (getDetail("toilet", "pooStartingTimer") as number)
              : undefined
          }
          wantToStop={isVisible("confirm")}
          onCancelStoping={() => hide("confirm")}
          onConfirmStoping={(elapsedTime) => {
            const reward = VillageUtils.calculateToiletRewards(
              elapsedTime,
              get("toilet").level,
            );
            setPooingRewards(reward);
            setTimerPlaying(false);
            eraseDetail("toilet", "pooStartingTimer");
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
              const now = Date.now();
              setDateNow(now);
              saveDetail("toilet", "pooStartingTimer", now);
            } else {
              show("confirm");
            }
          }}
        >
          {!timerPlaying ? "Starting Pooing" : "Stop Timer"}
        </StandardButton>
      </View>
      <PooingRewardModal
        visible={isVisible("reward")}
        onRequestClose={() => hide("reward")}
        onPressEarnBtn={async (rewards) => {
          for (let r of rewards) {
            await earn(r.resource, r.number);
          }
        }}
        rewards={pooingRewards ?? []}
      ></PooingRewardModal>
    </>
  );
}
