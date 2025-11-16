import { Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import React, { useState } from "react";
import { useBattleStore } from "../../../common/stores/battle/online-battle.store";
import PlusIcon from "../../../common/components/icons/plus";
import InputField from "../../../common/components/fields/InputField";
import PillButton from "../../../common/components/buttons/PillButton";
import { ServerTypes } from "../../../common/types/battle/online-battle/ServerTypes";

export default function PrivateFightModal({
  room,
  onCreateRoomBtnPress,
  onJoinRoomBtnPress,
  ...props
}: {
  room?: ServerTypes.Room;
  onCreateRoomBtnPress?: () => void;
  onJoinRoomBtnPress?: (code: string) => void;
} & ModalProps) {
  const [roomCode, setRoomCode] = useState("");

  return (
    <Modal animationType="slide" transparent {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20 },
        ]}
      >
        <View
          style={[
            style.rounded,
            style.shadowMd,
            style.wFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            style.border,
            { padding: 20, backgroundColor: colors.white },
          ]}
        >
          <PillButton
            stylePressable={[{ position: "absolute", top: -10, right: -10 }]}
            styleView={[{ backgroundColor: colors.red[500] }]}
            onPress={(evt) => {
              props.onRequestClose && props.onRequestClose(evt);
            }}
          >
            <PlusIcon
              size={35}
              fill={colors.white}
              strokeColor={colors.white}
              style={[{ transform: [{ rotateZ: "45deg" }] }]}
            ></PlusIcon>
          </PillButton>
          {!!!room ? (
            <>
              <Text style={[style.textCenter, { marginBottom: 10 }]}>
                Vous pouvez rejoindre la partie d'un.e ami.e en tapant le code
                de sa room
              </Text>
              <View style={[style.flexRow, style.itemsCenter]}>
                <InputField
                  paddingHorizontal={20}
                  paddingVertical={10}
                  placeholder="ABCD"
                  style={{ width: 120 }}
                  textInputStyle={{ fontWeight: "500", textAlign: "center" }}
                  onChange={setRoomCode}
                ></InputField>
                <PillButton
                  stylePressable={[{ marginLeft: 10 }]}
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
              <Text style={[style.textCenter, { marginTop: 30 }]}>
                Vous pouvez aussi attendre votre ami.e en créant une room
              </Text>
              <PillButton
                stylePressable={[{ marginTop: 10 }]}
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
        </View>
      </View>
    </Modal>
  );
}
