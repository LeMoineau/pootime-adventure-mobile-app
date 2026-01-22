import { Text, View } from "react-native";
import React, { useState } from "react";
import { ServerTypes } from "../../../../types/battle/online-battle/ServerTypes";
import { style } from "../../../../utils/style-utils";
import { colors } from "../../../../utils/color-utils";
import PillButton from "../../../common/buttons/PillButton";
import InputField from "../../../common/fields/InputField";
import CustomModal from "../../../common/modals/primitives/CustomModal";

export default function PrivateFightModal({
  visible,
  room,
  onCreateRoomBtnPress,
  onJoinRoomBtnPress,
  onRequestClose,
}: {
  visible: boolean;
  room?: ServerTypes.Room;
  onCreateRoomBtnPress?: () => void;
  onJoinRoomBtnPress?: (code: string) => void;
  onRequestClose: () => void;
}) {
  const [roomCode, setRoomCode] = useState("");

  return (
    <CustomModal
      visible={visible}
      title="Private Fight"
      closeWhenPressingTransparentOverlay={true}
      onRequestClose={() => {
        onRequestClose && onRequestClose();
      }}
      containerStyle={{ paddingHorizontal: 20 }}
    >
      {!!!room ? (
        <>
          <Text style={[style.textCenter]}>
            Vous pouvez rejoindre la partie d'un.e ami.e en tapant le code de sa
            room
          </Text>
          <View style={[style.flexRow, style.itemsCenter, { gap: 10 }]}>
            <InputField
              paddingHorizontal={20}
              paddingVertical={10}
              placeholder="ABCD"
              style={{ width: 120 }}
              textInputStyle={{ fontWeight: "500", textAlign: "center" }}
              onChange={setRoomCode}
            ></InputField>
            <PillButton
              styleView={[
                {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: colors.teal[400],
                  width: 100,
                },
              ]}
              onPress={() => {
                onJoinRoomBtnPress && onJoinRoomBtnPress(roomCode);
              }}
            >
              <Text
                style={[
                  style.textMd,
                  style.textBold,
                  { color: colors.white, textAlign: "center" },
                ]}
              >
                Join
              </Text>
            </PillButton>
          </View>
          <Text style={[style.textCenter]}>
            Vous pouvez aussi attendre votre ami.e en créant une room
          </Text>
          <PillButton
            styleView={[
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: colors.purple[400],
              },
            ]}
            onPress={() => {
              onCreateRoomBtnPress && onCreateRoomBtnPress();
            }}
          >
            <Text
              style={[
                style.textMd,
                style.textBold,
                { color: colors.white, width: 170, textAlign: "center" },
              ]}
            >
              Créer une room
            </Text>
          </PillButton>
        </>
      ) : (
        <>
          <Text style={[style.textCenter]}>Code de votre room</Text>
          <View
            style={[
              style.border,
              style.roundedSm,
              {
                backgroundColor: colors.gray[100],
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 5,
              },
            ]}
          >
            <Text style={[style.textBold, style.textLg]}>{room.id}</Text>
          </View>
          <Text style={[style.textCenter, { marginTop: 20 }]}>
            En attente de joueur pour commencer...
          </Text>
        </>
      )}
    </CustomModal>
  );
}
