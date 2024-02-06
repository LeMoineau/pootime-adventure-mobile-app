import {
  Animated,
  GestureResponderEvent,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../../utils/style-utils";
import CustomPage from "../../navigation/CustomPage";
import PooCreature from "../../misc/PooCreature";
import PVPanel from "./PVPanel";
import { usePooCreatureStatsStore } from "../../../stores/poo-creature-stats.store";
import UltiButton from "./UltiButton";
import { UltiDetails, Ultis } from "../../../types/Ultis";
import ReadyGoText from "./ReadyGoText";
import { colors } from "../../../utils/color-utils";
import { DefaultValues } from "../../../config/DefaultValues";
import { useEffect, useState } from "react";
import PlayerNode from "./PlayerNode";
import AdvNode from "./AdvNode";
import useChangingDetection from "../../../hooks/use-changing-detection";

export default function Arena({
  onHit,
  onSpell,
  battleBegin,
  advData,
  advNode,
  playerData,
  playerNode,
  bgColor,
}: {
  onHit?: (event: GestureResponderEvent) => void;
  onSpell?: (ulti: UltiDetails) => void;
  battleBegin?: boolean;
  advData:
    | {
        name: string;
        level: number;
        pv: number;
        currentPv: number;
      }
    | undefined;
  advNode: React.ReactNode;
  playerData:
    | {
        name: string;
        level: number;
        pv: number;
        currentPv: number;
        currentMana: number;
      }
    | undefined;
  playerNode?: React.ReactNode;
  bgColor?: string;
}) {
  const { width } = useWindowDimensions();
  const { ultiSelected } = usePooCreatureStatsStore();

  const playerAnimation = new Animated.Value(0);
  const advAnimation = new Animated.Value(0);
  const {} = useChangingDetection(playerData?.currentPv, (prev, _) => {
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
                          DefaultValues.MaxNameCharacters
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
                          DefaultValues.MaxNameCharacters
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
          <AdvNode advNode={advNode} animValue={advAnimation}></AdvNode>
          <PlayerNode
            playerNode={playerNode}
            animValue={playerAnimation}
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
