import {
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
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
import usePreviousBattles from "../../features/(tabs)/fight/hooks/use-previous-battles";
import NoPreviousBattleItem from "../../common/components/items/NoPreviousBattleItem";
import PooCreatureTropheeSubHeader from "../../common/components/misc/poo-creature/sub-headers/PooCreatureTropheeSubHeader";
import useBattleRooms from "../../features/(tabs)/fight/hooks/use-battle-rooms";
import ServerWaitingModal from "../../features/(tabs)/fight/components/ServerWaitingModal";
import WaitForFightModal from "../../features/(tabs)/fight/components/WaitForFightModal";
import PrivateFightModal from "../../features/(tabs)/fight/components/PrivateFightModal";

export default function FightTab() {
  const { width } = useWindowDimensions();
  const { previousBattles, pushPreviousBattle, refreshPreviousBattles } =
    usePreviousBattles();
  const {
    room,
    connect,
    disconnect,
    isVisible,
    show,
    hide,
    createARoom,
    joinARoom,
    resetRoom,
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
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refreshPreviousBattles();
            }}
          ></RefreshControl>
        }
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
            previousBattles
              .filter((_, i) => i < 5)
              .map((b, index) => (
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
          resetRoom();
          disconnect();
        }}
      ></PrivateFightModal>
    </CustomPage>
  );
}
