import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";
import CustomPage from "../../common/components/navigation/CustomPage";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import StandardButton from "../../common/components/buttons/StandardButton";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { Image } from "expo-image";
import { AdventureZones } from "../../common/constants/adventure-zones";
import PooCreatureBadge from "../../common/components/misc/poo-creature/PooCreatureBadge";
import TextWithSubShadow from "../../common/components/text/TextWithSubShadow";
import TitleWithDivider from "../../common/components/text/TitleWithDivider";

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
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 20,
                paddingBottom: 10,
                paddingLeft: 7,
                gap: 10,
                backgroundColor: colors.primary,
              }}
            >
              <PooCreatureBadge size={40}></PooCreatureBadge>
              <TextWithSubShadow style={{ fontSize: 20 }}>
                Où souhaitez-vous partir ?
              </TextWithSubShadow>
            </View>
          </View>

          {AdventureZones.map((z, index) => {
            const zoneUnlocked = level >= z.unlockLevel;
            const nextZoneUnlocked =
              level >=
              AdventureZones[(index + 1) % AdventureZones.length].unlockLevel;
            const isLastZone = index === AdventureZones.length - 1;
            return (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: zoneUnlocked ? "auto" : "none",
                }}
                key={index}
              >
                <View
                  style={{
                    width: "100%",
                    paddingLeft: 60,
                    paddingRight: 15,
                    paddingTop: 40,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setZoneSelected(
                        index === zoneSelected ? undefined : index
                      );
                    }}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Image
                      source={z.icon}
                      contentFit="contain"
                      tintColor={
                        zoneUnlocked ? undefined : "rgba(0, 0, 0, 0.8)"
                      }
                      contentPosition={"bottom left"}
                      style={[
                        {
                          width: "100%",
                          height: z.style.iconHeight,
                        },
                      ]}
                    ></Image>
                  </Pressable>
                  <View
                    style={{
                      position: "relative",
                      marginLeft: -50,
                      marginTop: -40,
                      width: 40,
                      height: 40,
                      backgroundColor: "red",
                      borderRadius: 100,
                    }}
                  ></View>
                  {zoneSelected === index && (
                    <View
                      style={[
                        style.border,
                        {
                          width: "100%",
                          backgroundColor: colors.white,
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          borderRadius: 10,
                          marginTop: 10,
                        },
                      ]}
                    >
                      <TextWithSubShadow style={{ color: z.style.mainColor }}>
                        {z.name}
                      </TextWithSubShadow>
                      <Text style={{ fontSize: 13, marginTop: 5 }}>
                        {z.desc}
                      </Text>
                      <StandardButton
                        style={[
                          {
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            marginTop: 10,
                          },
                        ]}
                        viewStyle={[
                          style.border,
                          {
                            borderColor: colors.primary,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                          },
                        ]}
                        bgColor={colors.primary}
                        textStyle={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: colors.white,
                          textTransform: "uppercase",
                        }}
                        onPress={() => {}}
                      >
                        Y Aller !
                      </StandardButton>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    backgroundColor: zoneUnlocked
                      ? colors.green[400]
                      : "rgba(0, 0, 0, 0.2)",
                    width: 20,
                    height: z.style.iconHeight + 40,
                    position: "absolute",
                    top: 0,
                    left: 20,
                    zIndex: -1,
                  }}
                ></View>
                {zoneSelected === index && !isLastZone && (
                  <View
                    style={{
                      backgroundColor: nextZoneUnlocked
                        ? colors.green[400]
                        : "rgba(0, 0, 0, 0.2)",
                      width: 20,
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 20,
                      zIndex: -2,
                    }}
                  ></View>
                )}
              </View>
            );
          })}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </CustomPage>
    </SafeAreaView>
  );
}
