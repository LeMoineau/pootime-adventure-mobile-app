import { View } from "react-native";
import { style } from "../../../../../utils/style-utils";
import TabTitle from "../../TabTitle";
import { colors } from "../../../../../constants/style/colors";
import TabText from "../../TabText";
import Divider from "../../../../common/text/Divider";
import StandardButton from "../../../../common/buttons/StandardButton";
import { useState } from "react";
import { useVillageStore } from "../../../../../stores/village.store";
import useModals from "../../../../../hooks/common/ui/use-modals";
import { BattleReward } from "../../../../../types/battle/BattleReward";
import { VillageUtils } from "../../../../../utils/village-utils";
import { useResourcesStore } from "../../../../../stores/resources.store";
import CustomConfirmModal from "../../../../common/modals/primitives/CustomConfirmModal";
import CustomRewardModal from "../../../../common/modals/primitives/CustomRewardModal";
import CustomModal from "../../../../common/modals/primitives/CustomModal";

export default function YarisPower() {
  const { get, hasDetail, saveDetail, getDetail, eraseDetail } =
    useVillageStore();
  const [yarisHasLeft, turnOnYaris] = useState(
    hasDetail("yaris", "yarisLeavingDate"),
  );
  const [yarisReward, setYarisReward] = useState<BattleReward>();
  const { isVisible, show, hide } = useModals<"confirm" | "reward">();
  const { earnMany } = useResourcesStore();

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
      <CustomConfirmModal
        visible={isVisible("confirm")}
        onRequestClose={() => hide("confirm")}
        title="Se réveiller"
        desc="Es-tu sûr de vouloir te réveiller ? (en dessous de 15min, ne rapporte rien)"
        onConfirmBtnPress={() => {
          const elapsedTime =
            Date.now() -
            new Date(
              getDetail("yaris", "yarisLeavingDate") as string,
            ).getTime();
          const reward = VillageUtils.calculateYarisRewards(
            elapsedTime,
            get("yaris").level,
          );
          setYarisReward(reward);
          turnOnYaris(false);
          eraseDetail("yaris", "yarisLeavingDate");
          show("reward");
          hide("confirm");
        }}
      ></CustomConfirmModal>
      {yarisReward ? (
        <CustomRewardModal
          visible={isVisible("reward")}
          onRequestClose={() => hide("reward")}
          title="Récompenses"
          desc="Voici tous ce qu'à trouvé votre Yaris pendant son expédition !"
          rewards={yarisReward}
          onPressEarnBtn={() => {
            earnMany(
              yarisReward.map(({ resource, number }) => [resource, number]),
            );
          }}
        ></CustomRewardModal>
      ) : (
        <CustomModal
          visible={isVisible("reward")}
          onRequestClose={() => hide("reward")}
          title="Récompenses"
          desc="Mince... Vous n'avez pas dormi assez longtemps pour recevoir des récompenses..."
        ></CustomModal>
      )}
    </>
  );
}
