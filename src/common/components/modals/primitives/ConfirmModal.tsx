import { Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";
import React from "react";
import { GestureResponderEvent } from "react-native-modal";

export default function ConfirmModal({
  children,
  onConfirm,
  onCancel,
  confirmButton,
  ...props
}: {
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButton?: (
    onPress?: (evt: GestureResponderEvent) => void
  ) => React.ReactNode;
} & ModalProps) {
  return (
    <Modal animationType="fade" transparent {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
      >
        <View
          style={[
            style.rounded,
            style.shadowMd,
            style.wFull,
            style.justifyCenter,
            style.itemsCenter,
            style.border,
            { padding: 20, backgroundColor: colors.white },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>{children}</View>
          <View
            style={[
              style.flexRow,
              style.itemsCenter,
              style.wFull,
              { justifyContent: "space-around" },
            ]}
          >
            <StandardButton
              style={{ paddingTop: 10, flex: 1 }}
              bgColor={colors.red[400]}
              textColor={colors.white}
              viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
              textStyle={[{ fontSize: 15 }]}
              onPress={(evt) => {
                props.onRequestClose && props.onRequestClose(evt);
                onCancel && onCancel();
              }}
            >
              Cancel
            </StandardButton>
            <View style={[{ width: 10 }]}></View>
            {confirmButton ? (
              confirmButton((evt) => {
                props.onRequestClose && props.onRequestClose(evt);
                onConfirm && onConfirm();
              })
            ) : (
              <StandardButton
                style={{ paddingTop: 10, flex: 1 }}
                bgColor={colors.teal[400]}
                textColor={colors.white}
                viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
                textStyle={[{ fontSize: 15 }]}
                onPress={(evt) => {
                  props.onRequestClose && props.onRequestClose(evt);
                  onConfirm && onConfirm();
                }}
              >
                Confirm
              </StandardButton>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
