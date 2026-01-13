import { ActivityIndicator, ModalProps, Text } from "react-native";
import PlainModal from "../../../../common/components/modals/primitives/PlainModal";
import { style } from "../../../../common/utils/style-utils";

export default function ServerWaitingModal({ ...props }: {} & ModalProps) {
  return (
    <>
      <PlainModal
        visible={props.visible}
        onRequestClose={(evt) => {
          props.onRequestClose && props.onRequestClose(evt);
        }}
      >
        <Text style={[style.textCenter, style.textMd]}>
          Lancement des Serveurs
        </Text>
        <Text style={[style.textCenter, style.textSm, { marginBottom: 10 }]}>
          Temps d'attente estimé : 2 minutes
        </Text>
        <ActivityIndicator size={"large"} />
        <Text style={[style.textCenter, { marginTop: 10 }]}>
          Un peu de patience, les serveurs (gratuits) se lancent... ça chauffe !
        </Text>
      </PlainModal>
    </>
  );
}
