import {
  GestureResponderEvent,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../utils/style-utils";
import CustomPage from "../navigation/CustomPage";
import PooCreature from "./PooCreature";
import PVPanel from "../../../app/battle/elements/PVPanel";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import UltiButton from "../../../app/battle/elements/UltiButton";
import { UltiDetails, Ultis } from "../../types/Ultis";
import ReadyGoText from "../../../app/battle/elements/ReadyGoText";
import { colors } from "../../utils/color-utils";
import { DefaultValues } from "../../config/DefaultValues";

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

  return (
    <Pressable
      style={[{ flex: 1 }]}
      onTouchStart={(evt) => {
        battleBegin && onHit && onHit(evt);
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
          <View
            style={[
              {
                position: "absolute",
                bottom: "50%",
                right: 30,
                marginBottom: 20,
              },
            ]}
          >
            {advNode}
          </View>
          <View
            style={[
              { position: "absolute", top: "50%", left: 30, marginTop: 20 },
            ]}
          >
            {playerNode ?? <PooCreature behind width={230}></PooCreature>}
          </View>
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
