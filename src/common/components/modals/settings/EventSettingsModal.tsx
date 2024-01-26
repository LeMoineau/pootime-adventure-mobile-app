import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import SettingsPage from "../../views/settings/SettingsPage";
import SettingsHeader from "../../views/settings/SettingsHeader";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import useModals from "../../../hooks/use-modals";
import AudreyBirthdayModal from "../event/AudreyBirthdayModal";

export default function EventSettingsModal({ ...props }: {} & ModalProps) {
  const { isVisible, show, hide } = useModals<"audreyBirthday">();

  return (
    <>
      <Modal {...props} animationType="fade">
        <SettingsPage
          header={
            <SettingsHeader
              title="Evenements"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <SettingsScrollView
            items={[
              {
                label: "Anniversaire Audrey",
                subLabel: "le 24/01/24",
                hasRightArrow: true,
                onPress: () => {
                  show("audreyBirthday");
                },
              },
            ]}
          ></SettingsScrollView>
        </SettingsPage>
      </Modal>
      <AudreyBirthdayModal
        visible={isVisible("audreyBirthday")}
        onRequestClose={() => {
          hide("audreyBirthday");
        }}
      ></AudreyBirthdayModal>
    </>
  );
}
