import { Modal, ModalProps } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import config from "../../common/config/config";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";

export default function DevSettings() {
  const navigator: useNavigationType = useNavigation();
  const itemsUnlocked = useItemsUnlockedStore();
  const { inventory } = useResourcesStore();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Infos Dev"
            onPressBack={navigator.goBack}
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
            {
              label: `Inventory`,
              subLabel: `${JSON.stringify({ ...inventory })}`,
            },
          ]}
        ></SettingsScrollView>
      </SettingsPage>
    </>
  );
}
