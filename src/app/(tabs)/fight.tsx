import {
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import CustomPage from "../../components/common/navigation/CustomPage";
import { style } from "../../utils/style-utils";
import StandardButton from "../../components/common/buttons/StandardButton";
import { colors } from "../../utils/color-utils";
import TitleWithDivider from "../../components/common/text/TitleWithDivider";
import PreviousBattleItem from "../../components/common/items/PreviousBattleItem";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import Gradient, {
  GradientDirection,
} from "../../components/common/misc/Gradient";
import usePreviousBattles from "../../components/features/(tabs)/fight/hooks/use-previous-battles";
import NoPreviousBattleItem from "../../components/common/items/NoPreviousBattleItem";
import PooCreatureTropheeSubHeader from "../../components/common/misc/poo-creature/sub-headers/PooCreatureTropheeSubHeader";
import useBattleRooms from "../../components/features/(tabs)/fight/hooks/use-battle-rooms";
import ServerWaitingModal from "../../components/features/(tabs)/fight/components/ServerWaitingModal";
import WaitForFightModal from "../../components/features/(tabs)/fight/components/WaitForFightModal";
import PrivateFightModal from "../../components/features/(tabs)/fight/components/PrivateFightModal";
import { LegendList } from "@legendapp/list";
import { DefaultValues } from "../../config/DefaultValues";

export default function FightTab() {
  const { width } = useWindowDimensions();
  const { previousBattles, pushPreviousBattle, refreshPreviousBattles } =
    usePreviousBattles({
      maxPreviousBattleSize: DefaultValues.MAX_PREVIOUS_BATTLE_SAVED,
    });
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
          <LegendList
            data={previousBattles}
            renderItem={({ item }) => (
              <PreviousBattleItem battle={item}></PreviousBattleItem>
            )}
            ListEmptyComponent={<NoPreviousBattleItem></NoPreviousBattleItem>}
            keyExtractor={(_, index) => `${index}`}
            recycleItems
          />
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
