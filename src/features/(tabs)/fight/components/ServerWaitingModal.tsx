import { ActivityIndicator, ModalProps, Text } from "react-native";
import { style } from "../../../../utils/style-utils";
import CustomModal from "../../../../components/common/modals/primitives/CustomModal";

export default function ServerWaitingModal({
  visible,
  onRequestClose,
}: {
  visible: boolean;
  onRequestClose?: () => void;
}) {
  return (
    <CustomModal
      visible={visible}
      title="Lancement des Serveur"
      closeWhenPressingTransparentOverlay
      onRequestClose={() => {
        onRequestClose && onRequestClose();
      }}
    >
      <Text style={[style.textCenter, style.textSm]}>
        Temps d'attente estimé : 2 minutes
      </Text>
      <ActivityIndicator size={"large"} />
      <Text style={[style.textCenter]}>
        Un peu de patience, les serveurs (gratuits) se lancent... ça chauffe !
      </Text>
    </CustomModal>
  );
}
