import { Modal, ModalProps, Text } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import useModals from "../../common/hooks/use-modals";
import ConfirmModal from "../../common/components/modals/primitives/ConfirmModal";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useVillageStore } from "../../common/stores/village.store";

export default function AccountSettings() {
  const { isVisible, show, hide } = useModals<"confirm">();
  const itemsUnlockedStore = useItemsUnlockedStore();
  const pooCreatureStatsStore = usePooCreatureStatsStore();
  const pooCreatureStyleStore = usePooCreatureStyleStore();
  const resourcesStore = useResourcesStore();
  const navigator: useNavigationType = useNavigation();
  const { resetData: resetDataVillage } = useVillageStore();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Votre compte"
            onPressBack={navigator.goBack}
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
        <SettingsScrollView
          items={[
            {
              label: "Reset Données Village",
              subLabel: "Efface toutes vos données du village",
              onPress: () => show("confirm"),
            },
          ]}
        ></SettingsScrollView>
      </SettingsPage>
      <ConfirmModal
        visible={isVisible("confirm")}
        onConfirm={async () => {
          await itemsUnlockedStore.resetData();
          await pooCreatureStatsStore.resetData();
          await pooCreatureStyleStore.resetData();
          await resourcesStore.resetData();
          await resetDataVillage();
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
