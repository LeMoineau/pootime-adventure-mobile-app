import { Modal, ModalProps, Text } from "react-native";
import SettingsPage from "../../views/settings/SettingsPage";
import SettingsHeader from "../../views/settings/SettingsHeader";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import useModals from "../../../hooks/use-modals";
import ConfirmModal from "../primitives/ConfirmModal";
import { useItemsUnlockedStore } from "../../../stores/items-unlocked.store";
import { usePooCreatureStatsStore } from "../../../stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../../stores/poo-creature-style.store";
import { useResourcesStore } from "../../../stores/resources.store";

export default function AccountSettingsModal({ ...props }: {} & ModalProps) {
  const { isVisible, show, hide } = useModals<"confirm">();
  const itemsUnlockedStore = useItemsUnlockedStore();
  const pooCreatureStatsStore = usePooCreatureStatsStore();
  const pooCreatureStyleStore = usePooCreatureStyleStore();
  const resourcesStore = useResourcesStore();

  return (
    <>
      <Modal {...props} animationType="fade">
        <SettingsPage
          header={
            <SettingsHeader
              title="Votre compte"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <SettingsScrollView
            items={[
              {
                label: "Reset",
                subLabel: "Efface toutes vos données",
                onPress: () => show("confirm"),
              },
            ]}
          ></SettingsScrollView>
        </SettingsPage>
      </Modal>
      <ConfirmModal
        visible={isVisible("confirm")}
        onConfirm={async () => {
          await itemsUnlockedStore.resetData();
          await pooCreatureStatsStore.resetData();
          await pooCreatureStyleStore.resetData();
          await resourcesStore.resetData();
        }}
        onRequestClose={() => hide("confirm")}
      >
        <Text>
          Etes-vous sûr de vouloir supprimer toutes vos données ? (Cette action
          est irréversible)
        </Text>
      </ConfirmModal>
    </>
  );
}
