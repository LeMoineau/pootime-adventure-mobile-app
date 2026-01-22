import { ActivityIndicator, Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../../constants/style/styles";
import React from "react";
import CustomModal from "../../../common/modals/primitives/CustomModal";

export default function WaitForFightModal({
  visible,
  onRequestClose,
}: {
  visible: boolean;
  onRequestClose: () => void;
}) {
  return (
    <CustomModal
      visible={visible}
      title={"Chargement..."}
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
