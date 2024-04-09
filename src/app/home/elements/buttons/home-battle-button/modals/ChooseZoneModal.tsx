import PlainModal from "../../../../../../common/components/modals/primitives/PlainModal";
import {
  ActivityIndicator,
  ModalProps,
  ScrollView,
  Text,
  View,
} from "react-native";
import { style } from "../../../../../../common/utils/style-utils";
import EntityZones from "../../../../../../common/config/game-data/EntityZones";
import StandardButton from "../../../../../../common/components/buttons/StandardButton";
import { colors } from "../../../../../../common/utils/color-utils";
import { usePooCreatureStatsStore } from "../../../../../../common/stores/poo-creature-stats.store";

export default function ChooseZoneModal({
  onZoneSelect,
  ...props
}: { onZoneSelect?: (zoneIndex: number) => void } & ModalProps) {
  const { level } = usePooCreatureStatsStore();
  return (
    <>
      <PlainModal
        visible={props.visible}
        onRequestClose={(evt) => {
          props.onRequestClose && props.onRequestClose(evt);
        }}
      >
        <Text style={[style.textCenter, { marginBottom: 10, fontSize: 15 }]}>
          Où voulez-vous partir explorer ?
        </Text>
        <ScrollView style={[style.flexCol, { width: "100%" }]}>
          {EntityZones.map((zone, index) => {
            return (
              <>
                <View
                  key={`zone-chooser-${index}`}
                  style={[
                    style.roundedFull,
                    style.overflowHidden,
                    {
                      marginVertical: 10,
                    },
                  ]}
                >
                  <StandardButton
                    viewStyle={[style.roundedFull, {}]}
                    textStyle={[{ flex: 1 }]}
                    bgColor={zone.mainColor}
                    textColor={colors.white}
                    onPress={() =>
                      level >= zone.unlockLevel &&
                      onZoneSelect &&
                      onZoneSelect(index)
                    }
                  >
                    {zone.name}
                  </StandardButton>
                  {level < zone.unlockLevel && (
                    <View
                      style={[
                        style.flexCol,
                        style.justifyCenter,
                        style.itemsCenter,
                        {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: colors.white,
                            fontWeight: "500",
                            fontSize: 15,
                          },
                        ]}
                      >{`Unlock at level ${zone.unlockLevel}`}</Text>
                    </View>
                  )}
                </View>
              </>
            );
          })}
        </ScrollView>
      </PlainModal>
    </>
  );
}
