import { Modal, ModalProps, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import SettingsHeader from "../../views/settings/SettingsHeader";
import SettingsPage from "../../views/settings/SettingsPage";
import PooCreatureBadge from "../../misc/PooCreatureBadge";
import useModals from "../../../hooks/use-modals";
import EventSettingsModal from "./EventSettingsModal";

export default function SettingsModal({ ...props }: {} & ModalProps) {
  const { isVisible, show, hide } = useModals<"event-settings">();
  return (
    <>
      <Modal animationType="slide" {...props}>
        <SettingsPage
          header={
            <SettingsHeader
              title="Paramètres"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <PooCreatureBadge></PooCreatureBadge>
          <View style={[style.wFull, { flex: 1, padding: 10, marginTop: 20 }]}>
            <SettingsScrollView
              items={[
                { icon: "person", label: "Votre Compte", hasRightArrow: true },
                {
                  icon: "gift",
                  label: "Evenement",
                  hasRightArrow: true,
                  onPress: () => {
                    show("event-settings");
                  },
                },
                { icon: "book", label: "Tutoriel", hasRightArrow: true },
                { icon: "code", label: "Infos Dev", hasRightArrow: true },
              ]}
            ></SettingsScrollView>
          </View>
        </SettingsPage>
      </Modal>
      <EventSettingsModal
        visible={isVisible("event-settings")}
        onRequestClose={() => {
          hide("event-settings");
        }}
      ></EventSettingsModal>
    </>
  );
}
