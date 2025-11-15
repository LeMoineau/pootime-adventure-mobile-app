import { ScrollView, useWindowDimensions, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { style } from "../../common/utils/style-utils";
import StandardButton from "../../common/components/buttons/StandardButton";
import { colors } from "../../common/utils/color-utils";
import TitleWithDivider from "../../common/components/text/TitleWithDivider";
import PreviousBattleItem from "../../common/components/items/PreviousBattleItem";
import ExpoIcon from "../../common/components/icons/ExpoIcon";
import Gradient, {
  GradientDirection,
} from "../../common/components/misc/Gradient";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import usePreviousBattles from "../../common/hooks/battle/use-previous-battles";
import NoPreviousBattleItem from "../../common/components/items/NoPreviousBattleItem";
import PooCreatureTropheeSubHeader from "../../common/components/misc/poo-creature/sub-headers/PooCreatureTropheeSubHeader";
import useBattleRooms from "../../common/hooks/battle/use-battle-rooms";
import ServerWaitingModal from "../home/elements/buttons/home-battle-button/modals/ServerWaitingModal";
import WaitForFightModal from "../home/elements/buttons/home-battle-button/modals/WaitForFightModal";
import PrivateFightModal from "../home/elements/buttons/home-battle-button/modals/PrivateFightModal";
import { useEffect } from "react";

export default function PooFight() {
  const { width } = useWindowDimensions();
  const stats = usePooCreatureStatsStore();
  const pooStyle = usePooCreatureStyleStore();
  const { previousBattles, pushPreviousBattle } = usePreviousBattles();
  const {
    room,
    connect,
    disconnect,
    isVisible,
    show,
    hide,
    createARoom,
    joinARoom,
  } = useBattleRooms({ onBattleFinish: pushPreviousBattle });

  return (
    <CustomPage>
      <ScrollView
        style={[
          style.wFull,
          style.flexCol,
          {
            flex: 1,
            backgroundColor: colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}
      >
        <View
          style={{
            paddingTop: 10,
            backgroundColor: colors.baseBackgroundColor,
          }}
        >
          <PooCreatureTropheeSubHeader></PooCreatureTropheeSubHeader>
          <View
            style={{
              backgroundColor: colors.white,
              height: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 15,
            paddingRight: 20,
            gap: 10,
          }}
        >
          <TitleWithDivider
            viewStyle={{ marginBottom: 10 }}
            textStyle={{ fontWeight: "500" }}
          >
            Dernière battailles
          </TitleWithDivider>
          {previousBattles.length > 0 ? (
            previousBattles.map((b, index) => (
              <PreviousBattleItem key={index} battle={b}></PreviousBattleItem>
            ))
          ) : (
            <NoPreviousBattleItem></NoPreviousBattleItem>
          )}
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          {
            position: "absolute",
            bottom: 0,
            gap: 10,
            paddingHorizontal: 20,
            zIndex: 10,
            paddingBottom: 20,
          },
        ]}
      >
        <Gradient
          direction={GradientDirection.BOTTOM_TO_TOP}
          from={colors.gray[800]}
          style={[
            {
              position: "absolute",
              width,
              height: "250%",
              left: 0,
              bottom: -50,
              opacity: 0.7,
              pointerEvents: "none",
            },
          ]}
        ></Gradient>
        <StandardButton
          style={[{ flex: 1 }]}
          viewStyle={[style.border, { borderColor: colors.indigo[600] }]}
          bgColor={colors.indigo[400]}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.white,
            textTransform: "uppercase",
          }}
          onPress={() => {
            connect();
            show("waiting-server-for-queue");
          }}
        >
          Combattre en ligne
        </StandardButton>
        <StandardButton
          style={[{ flex: 0 }]}
          viewStyle={[style.border, { borderColor: colors.amber[600] }]}
          bgColor={colors.amber[400]}
          textStyle={{ fontSize: 16 }}
          onPress={() => {
            connect();
            show("waiting-server-for-private");
          }}
        >
          <ExpoIcon
            name="lock-outline"
            size={23}
            style={{ color: colors.white }}
          ></ExpoIcon>
        </StandardButton>
      </View>

      {/* SERVER WAITING MODAL */}
      <ServerWaitingModal
        visible={
          isVisible("waiting-server-for-queue") ||
          isVisible("waiting-server-for-private")
        }
        onRequestClose={() => {
          hide("waiting-server-for-queue");
          hide("waiting-server-for-private");
          disconnect();
        }}
      ></ServerWaitingModal>

      {/* WAITING FOR FIGHT MODAL */}
      <WaitForFightModal
        visible={isVisible("battle-waiting")}
        onRequestClose={() => {
          hide("battle-waiting");
          disconnect();
        }}
      ></WaitForFightModal>

      {/* PRIVATE FIGHT MODAL */}
      <PrivateFightModal
        visible={isVisible("private-battle")}
        room={room}
        onCreateRoomBtnPress={createARoom}
        onJoinRoomBtnPress={joinARoom}
        onRequestClose={() => {
          hide("private-battle");
          disconnect();
        }}
      ></PrivateFightModal>
    </CustomPage>
  );
}
