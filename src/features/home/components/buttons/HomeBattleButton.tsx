import { Animated, View } from "react-native";
import StandardButton from "../../../../common/components/buttons/StandardButton";
import { style } from "../../../../common/utils/style-utils";
import { colors } from "../../../../common/utils/color-utils";
import ExpoIcon from "../../../../common/components/icons/ExpoIcon";
import useAnimatedValue from "../../../../common/hooks/use-animated-value";
import useModals from "../../../../common/hooks/use-modals";
import { useNavigationType } from "../../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import ChooseZoneModal from "../ChooseZoneModal";
import { useRouter } from "expo-router";

export default function HomeBattleButton() {
  const { animValue, enable, setEnabled } = useAnimatedValue({ duration: 250 });
  const { isVisible, show, hide } = useModals<
    | "private-battle"
    | "battle-waiting"
    | "battle-arena"
    | "server-waiting"
    | "choose-zone"
  >();
  const router = useRouter();

  return (
    <>
      <View style={[style.flexCol, { width: "100%", paddingBottom: 20 }]}>
        <Animated.View
          style={[
            style.flexCol,
            {
              position: "absolute",
              bottom: "100%",
              left: 0,
              width: "100%",
              backgroundColor: colors.white,
              paddingVertical: 20,
              paddingHorizontal: 20,
              marginBottom: -40,
              paddingBottom: 75,
              borderRadius: 40,
              opacity: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scaleY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {/* SAUTE-MOUTON BUTTON */}
          <StandardButton
            viewStyle={[style.roundedFull, { flex: 0, marginTop: 10 }]}
            bgColor={colors.orange[400]}
            textStyle={[
              style.textCenter,
              { color: colors.white, fontSize: 15, fontWeight: "500" },
            ]}
            onPress={() => show("choose-zone")}
          >
            Partir à l'aventure
          </StandardButton>
        </Animated.View>

        {/* BATTLE BUTTON */}
        <StandardButton
          viewStyle={[style.roundedFull, {}]}
          bgColor={colors.indigo[400]}
          onPress={() => setEnabled(!enable)}
          appendIcon={
            <ExpoIcon
              name={!enable ? "caret-up" : "caret-down"}
              size={20}
              style={[{ color: colors.white }]}
            ></ExpoIcon>
          }
          prependIcon={
            <View style={[{ opacity: 0 }]}>
              <ExpoIcon name="arrow-back" size={20}></ExpoIcon>
            </View>
          }
          textStyle={[{ color: colors.white, fontSize: 17, fontWeight: "500" }]}
        >
          Battle
        </StandardButton>
      </View>

      {/* CHOOSE ZONE MODAL */}
      <ChooseZoneModal
        visible={isVisible("choose-zone")}
        onRequestClose={() => hide("choose-zone")}
        onZoneSelect={(zoneIndex) => {
          hide("choose-zone");
          router.push({ pathname: "/(arenas)/entity", params: { zoneIndex } });
        }}
      ></ChooseZoneModal>
    </>
  );
}
