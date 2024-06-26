import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import { style } from "../../../../../../common/utils/style-utils";
import { colors } from "../../../../../../common/utils/color-utils";
import React, { useState } from "react";
import { useBattleStore } from "../../../../../../common/stores/battle/online-battle.store";
import PlusIcon from "../../../../../../common/components/icons/plus";
import InputField from "../../../../../../common/components/fields/InputField";
import PillButton from "../../../../../../common/components/buttons/PillButton";
import { ServerTypes } from "../../../../../../common/types/battle/online-battle/ServerTypes";

export default function PrivateFightModal({
  openRoom,
  ...props
}: { openRoom: (room: ServerTypes.Room) => void } & ModalProps) {
  const [roomId, setRoomId] = useState("");
  const [ownRoomId, setOwnRoomId] = useState("");
  const {
    createARoom,
    joinARoom,
    whenPlayerJoinYourRoom,
    whenFindTheRoom,
    whenRoomCreated,
  } = useBattleStore();

  whenRoomCreated((room) => {
    setOwnRoomId(room.id);
  });

  whenPlayerJoinYourRoom((room) => {
    openRoom(room);
    setOwnRoomId("");
  });

  whenFindTheRoom((room) => {
    openRoom(room);
    setRoomId("");
  });

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
              setOwnRoomId("");
              props.onRequestClose && props.onRequestClose(evt);
            }}
          >
            <PlusIcon
              size={35}
              fill={colors.white}
              strokeColor={colors.red[200]}
              style={[{ transform: [{ rotateZ: "45deg" }] }]}
            ></PlusIcon>
          </PillButton>
          {ownRoomId.length <= 0 && (
            <>
              <Text style={[style.textCenter, { marginBottom: 10 }]}>
                Vous pouvez rejoindre la partie d'un.e ami.e en tapant le code
                de sa room
              </Text>
              <View style={[style.flexRow]}>
                <InputField
                  paddingHorizontal={20}
                  paddingVertical={10}
                  placeholder="ABCD"
                  style={{ width: 100 }}
                  onChange={setRoomId}
                ></InputField>
                <PillButton
                  stylePressable={[{ marginLeft: 10 }]}
                  styleView={[
                    {
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      backgroundColor: colors.teal[400],
                    },
                  ]}
                  onPress={() => {
                    joinARoom(roomId);
                  }}
                >
                  <Text
                    style={[
                      style.textMd,
                      style.textBold,
                      { color: colors.white },
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
                  createARoom();
                }}
              >
                <Text
                  style={[
                    style.textMd,
                    style.textBold,
                    { color: colors.white },
                  ]}
                >
                  Créer une room
                </Text>
              </PillButton>
            </>
          )}
          {ownRoomId.length > 0 && (
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
                <Text style={[style.textBold, style.textLg]}>{ownRoomId}</Text>
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
