import { useEffect, useState } from "react";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import SettingsHeader from "./elements/SettingsHeader";
import { Pressable } from "react-native";
import PooCreatureBadge from "../../common/components/misc/poo-creature/PooCreatureBadge";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { SettingsItemProps } from "./elements/SettingsItem";
import SettingsPage from "./elements/SettingsPage";

export default function Settings() {
  const { unlock, isUnlocked } = useItemsUnlockedStore();
  const [counterDev, setCounterDev] = useState(0);
  const navigator: useNavigationType = useNavigation();

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
      <SettingsPage
        header={
          <SettingsHeader
            title="Paramètres"
            onPressBack={() => navigator.goBack()}
          ></SettingsHeader>
        }
      >
        <>
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
                onPress: () => navigator.navigate("AccountSettings"),
              },
              {
                icon: "gift",
                label: "Evenement",
                hasRightArrow: true,
                onPress: () => navigator.navigate("EventSettings"),
              },
              {
                icon: "book",
                label: "Tutoriel",
                hasRightArrow: true,
                onPress: () => navigator.navigate("TutoSettings"),
              },
              {
                icon: "attach-money",
                label: "Faire un don",
                hasRightArrow: true,
                onPress: () => navigator.navigate("DonationSettings"),
              },
              ...(isUnlocked("options", "dev")
                ? ([
                    {
                      icon: "code",
                      label: "Infos Dev",
                      hasRightArrow: true,
                      onPress: () => navigator.navigate("DevSettings"),
                    },
                  ] as SettingsItemProps[])
                : []),
            ]}
          ></SettingsScrollView>
        </>
      </SettingsPage>
    </>
  );
}
