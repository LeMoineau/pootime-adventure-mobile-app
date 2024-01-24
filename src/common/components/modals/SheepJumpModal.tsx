import { Modal, ModalProps, Text } from "react-native";
import Arena from "../misc/Arena";
import useSheepJumpStore from "../../stores/sheep-jump.store";
import { usePooCreatureStyleStore } from "../../stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import SheepIcon from "../icons/sheep/sheep";
import { CutSheepIcon } from "../icons/sheep/cutSheep";
import RewardModal from "./RewardModal";
import { style } from "../../utils/style-utils";
import { colors } from "../../utils/color-utils";
import { SheepJumpUtils } from "../../utils/sheep-jump-utils";
import { useResourcesStore } from "../../stores/resources.store";

export default function SheepJumpModal({ ...props }: {} & ModalProps) {
  const {
    sheep,
    currentSheepState,
    currentPlayerState,
    battleFinish,
    winner,
    earnings,
    hitSheep,
    spellSheep,
    reset,
  } = useSheepJumpStore();
  const { name } = usePooCreatureStyleStore();
  const { pv, level } = usePooCreatureStatsStore();
  const { earn } = useResourcesStore();

  return (
    <Modal animationType="slide" {...props}>
      {sheep && currentSheepState && currentPlayerState && (
        <Arena
          bgColor={colors.pink[300]}
          onHit={hitSheep}
          onSpell={spellSheep}
          battleLoaded={true}
          battleBegin={true}
          advData={{
            name: sheep.name,
            level: sheep.level,
            currentPv: currentSheepState.currentPv,
            pv: sheep.pv,
          }}
          playerData={{
            name: name,
            level: level,
            pv: pv,
            currentPv: currentPlayerState.currentPv,
            currentMana: currentPlayerState.currentMana,
          }}
          advNode={
            battleFinish ? (
              <CutSheepIcon ratio={0.5}></CutSheepIcon>
            ) : (
              <SheepIcon ratio={0.5}></SheepIcon>
            )
          }
        ></Arena>
      )}
      {battleFinish && (
        <RewardModal
          pooCoinEarn={earnings?.pooCoins}
          woolEarn={earnings?.wool}
          visible={battleFinish}
          onRequestClose={async () => {
            if (earnings) {
              await earn("pooCoins", earnings.pooCoins);
              await earn("wool", earnings.wool);
            }
            reset();
          }}
        >
          <Text
            style={[
              style.textMd,
              {
                marginBottom: 0,
                color:
                  winner === "player" ? colors.green[500] : colors.red[500],
              },
            ]}
          >
            {winner === "player" ? "Hourra 🙌 !" : "Mince !"}
          </Text>
          <Text style={[]}>
            {winner === "player"
              ? `Vous avez totalement rasé ${sheep?.name} !`
              : `${sheep?.name} vouus a complètement tondu !`}
          </Text>
        </RewardModal>
      )}
    </Modal>
  );
}
