import React from "react";
import StandardButton from "./StandardButton";
import { View } from "react-native";
import { style } from "../../utils/style-utils";
import useModals from "../../hooks/use-modals";
import ExpoIcon from "../icons/ExpoIcon";
import { colors } from "../../utils/color-utils";
import ConfirmModal from "../modals/primitives/ConfirmModal";

export default function TransferButton({
  leftChildren,
  rightChildren,
  bgColor,
  onPress,
  showConfirmModal,
  confirmModalCondition,
  confirmModalChildren,
  onConfirm,
  onCancel,
}: {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  bgColor?: string;
  onPress?: () => void;
  showConfirmModal?: boolean;
  confirmModalCondition?: () => boolean;
  confirmModalChildren?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const { isVisible, show, hide } = useModals<"confirm">();
  return (
    <>
      <StandardButton
        style={[{ flex: 1, marginTop: 15 }]}
        bgColor={bgColor}
        viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
        onPress={() => {
          onPress && onPress();
          if (showConfirmModal) {
            if (confirmModalCondition) {
              confirmModalCondition() && show("confirm");
            } else {
              show("confirm");
            }
          }
        }}
      >
        <View
          style={[
            style.flexRow,
            style.itemsCenter,
            { flex: 1, justifyContent: "space-around" },
          ]}
        >
          {leftChildren}
          <ExpoIcon
            name="caret-right"
            size={20}
            style={[{ color: colors.white }]}
          ></ExpoIcon>
          {rightChildren}
        </View>
      </StandardButton>
      {showConfirmModal && (
        <ConfirmModal
          visible={isVisible("confirm")}
          onRequestClose={() => hide("confirm")}
          onConfirm={() => onConfirm && onConfirm()}
          onCancel={() => onCancel && onCancel()}
        >
          {confirmModalChildren}
        </ConfirmModal>
      )}
    </>
  );
}
