import { Text, View } from "react-native";
import { style } from "../../../../../common/utils/style-utils";
import TabTitle from "../../TabTitle";
import { colors } from "../../../../../common/utils/color-utils";
import TabText from "../../TabText";
import Divider from "../../../../../common/components/text/Divider";
import StandardButton from "../../../../../common/components/buttons/StandardButton";
import { useState } from "react";
import { useVillageStore } from "../../../../../common/stores/village.store";
import useModals from "../../../../../common/hooks/use-modals";
import ConfirmModal from "../../../../../common/components/modals/primitives/ConfirmModal";
import RewardModal from "../../../../../common/components/modals/primitives/RewardModal";
import { BattleReward } from "../../../../../common/types/battle/online-battle/BattleReward";
import { VillageUtils } from "../../../../../common/utils/village-utils";
import { useResourcesStore } from "../../../../../common/stores/resources.store";

export default function YarisPower() {
  const { get, hasDetail, saveDetail, getDetail, eraseDetail } =
    useVillageStore();
  const [yarisHasLeft, turnOnYaris] = useState(
    hasDetail("yaris", "yarisLeavingDate")
  );
  const [yarisReward, setYarisReward] = useState<BattleReward>();
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
        <TabTitle>Rouler</TabTitle>
        <TabText>
          Laisse ta Yaris voyager pour te ramener des récompenses !
        </TabText>
        <Divider style={[{ marginBottom: 10 }]}></Divider>
        <TabTitle>Etat du moteur</TabTitle>
        <TabText
          style={[
            { color: yarisHasLeft ? colors.green[500] : colors.red[400] },
          ]}
        >
          {yarisHasLeft ? "VROOOOOOOM" : "Ennuyé"}
        </TabText>
        {hasDetail("yaris", "yarisLeavingDate") && (
          <>
            <TabTitle>Début de l'expédition</TabTitle>
            <TabText>
              {getDetail("yaris", "yarisLeavingDate") as string}
            </TabText>
          </>
        )}
        <StandardButton
          bgColor={!yarisHasLeft ? colors.blue[400] : colors.red[400]}
          viewStyle={[style.roundedFull, { paddingVertical: 17 }]}
          textStyle={[{ fontSize: 15 }]}
          textColor={colors.white}
          style={[{ marginTop: 10 }]}
          onPress={() => {
            if (!yarisHasLeft) {
              turnOnYaris(true);
              saveDetail("yaris", "yarisLeavingDate", new Date().toString());
            } else {
              show("confirm");
            }
          }}
        >
          {!yarisHasLeft ? "Lancer vrooomir le moteur" : "Se réveiller"}
        </StandardButton>
      </View>
      <ConfirmModal
        visible={isVisible("confirm")}
        onRequestClose={() => hide("confirm")}
        onConfirm={() => {
          const elapsedTime =
            Date.now() -
            new Date(
              getDetail("yaris", "yarisLeavingDate") as string
            ).getTime();
          const reward = VillageUtils.calculateYarisRewards(
            elapsedTime,
            get("yaris").level
          );
          setYarisReward(reward);
          turnOnYaris(false);
          eraseDetail("yaris", "yarisLeavingDate");
          show("reward");
          hide("confirm");
        }}
      >
        <Text>
          Es-tu sûr de vouloir te réveiller ? (en dessous de 15min, ne rapporte
          rien)
        </Text>
      </ConfirmModal>
      <RewardModal
        visible={isVisible("reward")}
        onRequestClose={() => hide("reward")}
        onCollectingRewards={async (rewards) => {
          for (let r of rewards) {
            await earn(r.resource, r.number);
          }
        }}
        rewards={yarisReward ?? []}
      >
        <Text style={[style.textCenter, {}]}>
          Voici tous ce qu'à trouvé votre Yaris pendant son expédition !
        </Text>
      </RewardModal>
    </>
  );
}
