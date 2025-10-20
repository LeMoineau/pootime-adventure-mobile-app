import { useEffect, useState } from "react";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import SettingsHeader from "./elements/SettingsHeader";
import { Pressable, Text, View } from "react-native";
import PooCreatureBadge from "../../common/components/misc/poo-creature/PooCreatureBadge";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { SettingsItemProps } from "./elements/SettingsItem";
import SettingsPage from "./elements/SettingsPage";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { LinearGradient } from "expo-linear-gradient";
import { style } from "../../common/utils/style-utils";
import { usePooCreatureStyleStore } from "../../common/stores/poo-creature-style.store";

export default function Settings() {
  const { unlock, isUnlocked } = useItemsUnlockedStore();
  const [counterDev, setCounterDev] = useState(0);
  const navigator: useNavigationType = useNavigation();
  const { name } = usePooCreatureStyleStore();

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
      <CustomPage bgColor={colors.transparent}>
        <View
          style={[
            style.flexCol,
            { flex: 1, backgroundColor: colors.transparent },
          ]}
        >
          <View style={[{ flexGrow: 1, backgroundColor: colors.white }]}>
            <SettingsHeader onPressBack={navigator.goBack}></SettingsHeader>
            <View
              style={[
                style.flexCol,
                style.justifyCenter,
                style.itemsCenter,
                style.wFull,
                { paddingVertical: 40, zIndex: 1, paddingTop: 60 },
              ]}
            >
              <Pressable
                style={[{ zIndex: 1 }]}
                onPress={() => setCounterDev(counterDev + 1)}
              >
                <PooCreatureBadge
                  useBodyColorForBackground
                  size={120}
                ></PooCreatureBadge>
              </Pressable>
              <View style={[{ height: 5 }]}></View>
              <Text style={[style.textBold, style.textMd]}>{name}</Text>
            </View>
            <SettingsScrollView
              style={[{ marginTop: 0 }]}
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
          </View>
        </View>
      </CustomPage>
      {/* <SettingsPage
        header={
          <SettingsHeader
            title="Paramètres"
            onPressBack={() => navigator.goBack()}
          ></SettingsHeader>
        }
      >
        <>
          <Pressable onPress={() => setCounterDev(counterDev + 1)}>
            <View style={[{ marginTop: 20 }]}>
              <PooCreatureBadge></PooCreatureBadge>
            </View>
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
      </SettingsPage> */}
    </>
  );
}
