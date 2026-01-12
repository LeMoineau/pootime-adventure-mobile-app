import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { AdventureZones } from "../../common/constants/adventure-zones";
import AdventureZoneSelectorHeader from "../../features/adventure-zone-selector/components/AdventureZoneSelectorHeader";
import AdventureZoneItem from "../../features/adventure-zone-selector/components/AdventureZoneItem";
import { router } from "expo-router";

export default function LeaderboarAdventureZoneSelectorScreen() {
  const { level } = usePooCreatureStatsStore();
  const [zoneSelected, setZoneSelected] = useState<number>();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("visible");

    return () => {
      NavigationBar.setVisibilityAsync("hidden");
    };
  }, []);

  return (
    <SafeAreaView edges={{ top: "off", bottom: "off" }} style={[{ flex: 1 }]}>
      <CustomPage
        bgColor={colors.gray[100]}
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 0 },
        ]}
      >
        <ScrollView
          style={[
            style.flexCol,
            {
              width: "100%",
              backgroundColor: colors.gray[100],
            },
          ]}
          stickyHeaderIndices={[0]}
        >
          <AdventureZoneSelectorHeader></AdventureZoneSelectorHeader>
          {AdventureZones.map((z, index) => {
            return (
              <AdventureZoneItem
                key={index}
                zone={z}
                zoneSelected={zoneSelected === index}
                zoneUnlocked={level >= z.unlockLevel}
                nextZoneUnlocked={
                  level >=
                  AdventureZones[(index + 1) % AdventureZones.length]
                    .unlockLevel
                }
                lastZone={index === AdventureZones.length - 1}
                onIconPress={() => {
                  setZoneSelected(zoneSelected === index ? undefined : index);
                }}
                onGoingBtnPress={() => {
                  router.push({
                    pathname: "/(arenas)/entity",
                    params: { zoneIndex: index },
                  });
                }}
              ></AdventureZoneItem>
            );
          })}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </CustomPage>
    </SafeAreaView>
  );
}
