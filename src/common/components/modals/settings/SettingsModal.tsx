import { Linking, Modal, ModalProps, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import SettingsHeader from "../../views/settings/SettingsHeader";
import SettingsPage from "../../views/settings/SettingsPage";
import PooCreatureBadge from "../../misc/PooCreatureBadge";
import useModals from "../../../hooks/use-modals";
import EventSettingsModal from "./EventSettingsModal";
import AccountSettingsModal from "./AccountSettingsModal";

export default function SettingsModal({ ...props }: {} & ModalProps) {
  const { isVisible, show, hide } = useModals<
    "event-settings" | "account-settings"
  >();
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
          <SettingsScrollView
            style={[{ marginTop: 20 }]}
            items={[
              {
                icon: "person",
                label: "Votre Compte",
                hasRightArrow: true,
                onPress: () => show("account-settings"),
              },
              {
                icon: "gift",
                label: "Evenement",
                hasRightArrow: true,
                onPress: () => show("event-settings"),
              },
              { icon: "book", label: "Tutoriel", hasRightArrow: true },
              { icon: "code", label: "Infos Dev", hasRightArrow: true },
              {
                icon: "attach-money",
                label: "Faire un don",
                hasRightArrow: true,
                onPress: () => {
                  Linking.openURL("https://fr.tipee.com/pierrot");
                },
              },
            ]}
          ></SettingsScrollView>
        </SettingsPage>
      </Modal>
      <AccountSettingsModal
        visible={isVisible("account-settings")}
        onRequestClose={() => hide("account-settings")}
      ></AccountSettingsModal>
      <EventSettingsModal
        visible={isVisible("event-settings")}
        onRequestClose={() => hide("event-settings")}
      ></EventSettingsModal>
    </>
  );
}
