import { Modal, ModalProps } from "react-native";
import SettingsPage from "../../views/settings/SettingsPage";
import SettingsHeader from "../../views/settings/SettingsHeader";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import { useItemsUnlockedStore } from "../../../stores/items-unlocked.store";
import config from "../../../config/config";

export default function DevSettingsModal({ ...props }: {} & ModalProps) {
  const itemsUnlocked = useItemsUnlockedStore();
  return (
    <>
      <Modal {...props} animationType="fade">
        <SettingsPage
          header={
            <SettingsHeader
              title="Infos Dev"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <SettingsScrollView
            title={"Global"}
            items={[
              {
                label: `Environnement`,
                subLabel: `${process.env.NODE_ENV}`,
              },
              {
                label: `Variables d'environnement`,
                subLabel: `${JSON.stringify(config.getEnv())}`,
              },
            ]}
          ></SettingsScrollView>
          <SettingsScrollView
            title="Stores"
            items={[
              {
                label: `Items Unlocked`,
                subLabel: `${JSON.stringify({ ...itemsUnlocked })}`,
              },
            ]}
          ></SettingsScrollView>
        </SettingsPage>
      </Modal>
    </>
  );
}
