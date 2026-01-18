import { ActivityIndicator, Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import React from "react";
import CustomModal, {
  CustomModalProps,
} from "../../../../common/components/modals/primitives/CustomModal";

export default function WaitForFightModal({
  visible,
  onRequestClose,
}: CustomModalProps) {
  return (
    <CustomModal
      visible={visible}
      title="Chargement..."
      closeWhenPressingTransparentOverlay
      onRequestClose={onRequestClose}
    >
      <ActivityIndicator size={"large"} />
      <Text style={[style.textCenter, { marginTop: 10 }]}>
        En attente de joueur pour commencer...
      </Text>
    </CustomModal>
  );
}
