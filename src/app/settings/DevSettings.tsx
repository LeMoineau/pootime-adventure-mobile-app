import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import config from "../../common/config/config";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useContext } from "react";
import { CacheContext } from "../../common/contexts/contexts";
import { DefaultValues } from "../../common/config/DefaultValues";

export default function DevSettings() {
  const navigator: useNavigationType = useNavigation();
  const itemsUnlocked = useItemsUnlockedStore();
  const { inventory } = useResourcesStore();
  const { cache } = useContext(CacheContext);

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
          title="Global"
          minimizable
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
          minimizable
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
        <SettingsScrollView
          title="Default values"
          minimizable
          items={Object.keys(DefaultValues).map((k) => ({
            label: `${k}`,
            subLabel: `${
              typeof DefaultValues[k] === "object"
                ? JSON.stringify({ ...DefaultValues[k] })
                : DefaultValues[k]
            }`,
          }))}
        ></SettingsScrollView>
        <SettingsScrollView
          title="Cache"
          minimizable
          items={Object.keys(cache).map((k) => ({
            label: `${k}`,
            subLabel: `${JSON.stringify({ ...cache[k] })}`,
          }))}
        ></SettingsScrollView>
      </SettingsPage>
    </>
  );
}
