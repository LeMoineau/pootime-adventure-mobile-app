import { Linking, Modal, ModalProps, Pressable } from "react-native";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import SettingsHeader from "../../views/settings/SettingsHeader";
import SettingsPage from "../../views/settings/SettingsPage";
import PooCreatureBadge from "../../misc/PooCreatureBadge";
import useModals from "../../../hooks/use-modals";
import EventSettingsModal from "./EventSettingsModal";
import AccountSettingsModal from "./AccountSettingsModal";
import DevSettingsModal from "./DevSettingsModal";
import { useEffect, useState } from "react";
import { SettingsItemProps } from "../../views/settings/SettingsItem";
import { useItemsUnlockedStore } from "../../../stores/items-unlocked.store";

export default function SettingsModal({ ...props }: {} & ModalProps) {
  const { unlock, isUnlocked } = useItemsUnlockedStore();
  const { isVisible, show, hide } = useModals<
    "event-settings" | "account-settings" | "dev-settings"
  >();
  const [counterDev, setCounterDev] = useState(0);

  useEffect(() => {
    if (counterDev >= 7) {
      if (isUnlocked("options", "dev")) {
        unlock("options", "dev", false);
      } else {
        unlock("options", "dev", true);
      }
      setCounterDev(0);
    }
  }, [counterDev]);

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
          <Pressable onPress={() => setCounterDev(counterDev + 1)}>
            <PooCreatureBadge></PooCreatureBadge>
          </Pressable>
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

              {
                icon: "attach-money",
                label: "Faire un don",
                hasRightArrow: true,
                onPress: () => {
                  Linking.openURL("https://linktr.ee/pierrot_");
                },
              },
              ...(isUnlocked("options", "dev")
                ? ([
                    {
                      icon: "code",
                      label: "Infos Dev",
                      hasRightArrow: true,
                      onPress: () => show("dev-settings"),
                    },
                  ] as SettingsItemProps[])
                : []),
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
      <DevSettingsModal
        visible={isVisible("dev-settings")}
        onRequestClose={() => hide("dev-settings")}
      ></DevSettingsModal>
    </>
  );
}
