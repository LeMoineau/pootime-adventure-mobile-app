import { Modal, ModalProps, Text } from "react-native";
import Arena from "../../common/components/views/arena/Arena";
import useSheepJumpStore from "../../common/stores/battle/entity-battle.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import SheepIcon from "../../common/components/icons/sheep/sheep";
import { CutSheepIcon } from "../../common/components/icons/sheep/cutSheep";
import RewardModal from "../../common/components/modals/primitives/RewardModal";
import { style } from "../../common/utils/style-utils";
import { colors } from "../../common/utils/color-utils";
import { useResourcesStore } from "../../common/stores/resources.store";

export default function SheepJumpModal({ ...props }: {} & ModalProps) {
  // const {
  //   sheep,
  //   currentSheepState,
  //   currentPlayerState,
  //   battleBegin,
  //   battleFinish,
  //   winner,
  //   earnings,
  //   hitSheep,
  //   spellSheep,
  //   reset,
  // } = useSheepJumpStore();
  // const { name } = usePooCreatureStyleStore();
  // const { pv, level } = usePooCreatureStatsStore();
  // const { earn } = useResourcesStore();

  // return (
  //   <Modal animationType="slide" {...props}>
  //     {sheep && currentSheepState && currentPlayerState && (
  //       <Arena
  //         bgColor={colors.pink[300]}
  //         onHit={hitSheep}
  //         onSpell={spellSheep}
  //         battleBegin={battleBegin}
  //         advData={{
  //           name: sheep.name,
  //           level: sheep.level,
  //           currentPv: currentSheepState.currentPv,
  //           pv: sheep.pv,
  //         }}
  //         playerData={{
  //           name: name,
  //           level: level,
  //           pv: pv,
  //           currentPv: currentPlayerState.currentPv,
  //           currentMana: currentPlayerState.currentMana,
  //         }}
  //         advNode={
  //           battleFinish && winner === "player" ? (
  //             <CutSheepIcon woolColor={sheep.color} ratio={0.5}></CutSheepIcon>
  //           ) : (
  //             <SheepIcon woolColor={sheep.color} ratio={0.5}></SheepIcon>
  //           )
  //         }
  //       ></Arena>
  //     )}
  //     {battleFinish && (
  //       <RewardModal
  //         pooCoinEarn={earnings?.pooCoins}
  //         woolEarn={earnings?.wool}
  //         visible={battleFinish}
  //         onRequestClose={async () => {
  //           if (earnings) {
  //             await earn("pooCoins", earnings.pooCoins);
  //             await earn("wool", earnings.wool);
  //           }
  //           reset();
  //         }}
  //       >
  //         <Text
  //           style={[
  //             style.textMd,
  //             {
  //               marginBottom: 0,
  //               color:
  //                 winner === "player" ? colors.green[500] : colors.red[500],
  //             },
  //           ]}
  //         >
  //           {winner === "player" ? "Hourra 🙌 !" : "Mince !"}
  //         </Text>
  //         <Text style={[]}>
  //           {winner === "player"
  //             ? `Vous avez totalement rasé ${sheep?.name} !`
  //             : `${sheep?.name} vous a complètement tondu !`}
  //         </Text>
  //       </RewardModal>
  //     )}
  //   </Modal>
  // );
  return <></>;
}
