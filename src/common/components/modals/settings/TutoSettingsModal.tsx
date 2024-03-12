import { Modal, ModalProps, Text, View } from "react-native";
import SettingsPage from "../../views/settings/SettingsPage";
import SettingsHeader from "../../views/settings/SettingsHeader";
import { style } from "../../../utils/style-utils";
import PooUltiIcon from "../../icons/pooUlti";

export default function TutoSettingsModal({ ...props }: {} & ModalProps) {
  return (
    <>
      <Modal {...props} animationType="fade">
        <SettingsPage
          header={
            <SettingsHeader
              title="Tutoriel"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <PooUltiIcon style={[{ marginTop: 20 }]}></PooUltiIcon>
          <Text style={[style.textLg, style.textBold, { marginTop: 0 }]}>
            Coming soon...
          </Text>
        </SettingsPage>
      </Modal>
    </>
  );
}
