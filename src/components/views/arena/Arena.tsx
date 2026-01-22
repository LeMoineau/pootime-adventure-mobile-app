import {
  Animated,
  GestureResponderEvent,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../../common/utils/style-utils";
import CustomPage from "../../navigation/CustomPage";
import PVPanel from "./elements/PVPanel";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";
import UltiButton from "./elements/UltiButton";
import { UltiDetails, Ultis } from "../../../common/types/Ultis";
import ReadyGoText from "./elements/ReadyGoText";
import { colors } from "../../../common/utils/color-utils";
import { DefaultValues } from "../../../common/config/DefaultValues";
import { useEffect } from "react";
import PlayerNode from "./elements/PlayerNode";
import AdvNode from "./elements/AdvNode";
import useChangingDetection from "../../../common/hooks/ui/use-changing-detection";

export default function Arena({
  onHit,
  onSpell,
  battleBegin,
  advData,
  advNode,
  noAdvNodeShadow,
  playerData,
  playerNode,
  noPlayerNodeShadow,
  bgColor,
}: {
  onHit?: (event: GestureResponderEvent) => void;
  onSpell?: (ulti: UltiDetails) => void;
  battleBegin?: boolean;
  advData?: {
    name: string;
    level: number;
    pv: number;
    currentPv: number;
  };
  advNode: React.ReactNode;
  noAdvNodeShadow?: boolean;
  playerData?: {
    name: string;
    level: number;
    pv: number;
    currentPv: number;
    currentMana: number;
  };
  playerNode?: React.ReactNode;
  noPlayerNodeShadow?: boolean;
  bgColor?: string;
}) {
  const { width } = useWindowDimensions();
  const { ultiSelected } = usePooCreatureStatsStore();

  const playerAnimation = new Animated.Value(0);
  const advAnimation = new Animated.Value(0);
  useChangingDetection(playerData?.currentPv, (prev, _) => {
    if (prev !== undefined) {
      advAnimation.setValue(1);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      advAnimation.setValue(0);
    }, 50);
  }, [advAnimation]);

  return (
    <Pressable
      style={[{ flex: 1 }]}
      onTouchStart={(evt) => {
        if (battleBegin && onHit) {
          onHit(evt);
          playerAnimation.setValue(1);
        }
      }}
      onTouchEnd={() => {
        playerAnimation.setValue(0);
      }}
    >
      <CustomPage bgColor={bgColor ?? colors.blue[500]}>
        <View
          style={[
            style.justifyCenter,
            style.itemsCenter,
            { flex: 1, padding: 20 },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              style.justifyBetween,
              {
                position: "absolute",
                top: 20,
                left: 0,
                width: width,
              },
            ]}
          >
            {playerData && advData && (
              <>
                <PVPanel
                  pooName={
                    playerData.name.length > DefaultValues.MaxNameCharacters
                      ? `${playerData.name.substring(
                          0,
                          DefaultValues.MaxNameCharacters,
                        )}.`
                      : playerData.name
                  }
                  pvMax={playerData.pv}
                  currentPv={playerData.currentPv ?? 0}
                  level={playerData.level}
                ></PVPanel>
                <PVPanel
                  pooName={
                    advData.name.length > DefaultValues.MaxNameCharacters
                      ? `${advData.name.substring(
                          0,
                          DefaultValues.MaxNameCharacters,
                        )}.`
                      : advData.name
                  }
                  pvMax={advData.pv}
                  currentPv={advData.currentPv ?? 0}
                  level={advData.level}
                  right
                ></PVPanel>
              </>
            )}
          </View>
          <AdvNode
            advNode={advNode}
            animValue={advAnimation}
            shadowColor={noAdvNodeShadow ? "transparent" : undefined}
          ></AdvNode>
          <PlayerNode
            playerNode={playerNode}
            animValue={playerAnimation}
            shadowColor={noPlayerNodeShadow ? "transparent" : undefined}
          ></PlayerNode>
          {playerData && ultiSelected && (
            <UltiButton
              ultiSelected={Ultis[ultiSelected]}
              currentMana={playerData.currentMana ?? 0}
              onPress={(u) => {
                battleBegin &&
                  playerData.currentMana &&
                  playerData.currentMana >= u.details.mana &&
                  onSpell &&
                  onSpell(u.details);
              }}
            ></UltiButton>
          )}
          <ReadyGoText
            battleReady={playerData !== undefined && advData !== undefined}
            battleBegin={battleBegin === undefined ? true : battleBegin}
          ></ReadyGoText>
        </View>
      </CustomPage>
    </Pressable>
  );
}
