import { Modal, ModalProps, Pressable, View } from "react-native";
import React from "react";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import PillButton from "../../buttons/PillButton";
import PlusIcon from "../../icons/plus";

export default function PlainModal({ ...props }: ModalProps) {
  return (
    <Modal animationType="fade" transparent {...props}>
      <Pressable
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={(evt) => {
          props.onRequestClose && props.onRequestClose(evt);
        }}
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
          {props.children}
        </View>
      </Pressable>
    </Modal>
  );
}
