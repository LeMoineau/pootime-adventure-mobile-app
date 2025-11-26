import { ActivityIndicator, Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { colors } from "../../../common/utils/color-utils";
import React from "react";
import PlusIcon from "../../../common/components/icons/plus";
import PillButton from "../../../common/components/buttons/PillButton";

export default function WaitForFightModal({ ...props }: ModalProps) {
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
              strokeColor={colors.red[200]}
              style={[{ transform: [{ rotateZ: "45deg" }] }]}
            ></PlusIcon>
          </PillButton>
          <ActivityIndicator size={"large"} />
          <Text style={[style.textCenter, { marginTop: 10 }]}>
            En attente de joueur pour commencer...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
