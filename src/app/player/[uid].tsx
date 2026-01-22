import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import CustomPage from "../../components/common/navigation/CustomPage";
import { style } from "../../utils/style-utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/style/colors";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { useUserDataTable } from "../../hooks/common/firestore/use-user-data-table";
import { IdentifiedUserData } from "../../types/firebase/UserData";
import PooCreature from "../../components/common/misc/poo-creature/PooCreature";
import PooCreatureStatsTable from "../../components/common/misc/poo-creature/PooCreatureStatsTable";
import TitleWithDivider from "../../components/common/text/TitleWithDivider";
import UltiItem from "../../components/common/items/UltiItem";
import InventoryItem from "../../components/common/items/slot/InventorySlotItem";
import { Resources } from "../../config/constants/Resources";
import { StructureName } from "../../config/constants/Structures";
import StructureSlotItem from "../../components/common/items/slot/StructureSlotItem";
import ShopItems from "../../constants/shop/shop-items";
import BodyColorSlotItem from "../../components/common/items/slot/BodyColorSlotItem";
import HeadSlotItem from "../../components/common/items/slot/HeadSlotItem";
import ExpressionSlotItem from "../../components/common/items/slot/ExpressionSlotItem";
import { router, useLocalSearchParams } from "expo-router";
import PlayerInfosSubHeader from "../../components/features/player-infos/PlayerInfosSubHeader";
import { isFreeShopItem } from "../../types/shop/ShopItem";
import useMassiveStoreLoader from "../../hooks/common/admin/user-massive-store-loader";
import useBackHandler from "../../hooks/common/ui/useBackHandler";

export default function PlayerInfosPage() {
  const { loading, get } = useUserDataTable();
  const [userData, setUserData] = useState<IdentifiedUserData>();
  const { uid, yourself } = useLocalSearchParams<{
    uid: string;
    yourself?: string;
  }>();
  const { generateUserDataFromStores } = useMassiveStoreLoader();

  useBackHandler(() => {
    router.back();
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync("visible");
  }, []);

  useEffect(() => {
    loadUserData();
  }, [uid, yourself]);

  const loadUserData = (forceRefresh?: boolean) => {
    if (yourself && uid) {
      setUserData({ ...generateUserDataFromStores(), uid });
    } else if (uid) {
      get(uid, forceRefresh).then((res) => {
        if (res) {
          setUserData(res);
        }
      });
    }
  };

  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "additive" }}
      style={[{ flex: 1 }]}
    >
      <CustomPage
        bgColor={colors.white}
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { padding: 0 },
        ]}
      >
        <View
          style={[
            style.wFull,
            style.flexCol,
            {
              backgroundColor: colors.white,
              flex: 1,
            },
          ]}
        >
          <View
            style={[
              style.wFull,
              style.itemsCenter,
              {
                paddingTop: 50,
                position: "absolute",
                top: 0,
                left: 0,
                height: 400,
                backgroundColor: colors.baseBackgroundColor,
              },
            ]}
          >
            {userData ? (
              <PooCreature
                bodyColorProps={userData.style.bodyColor}
                headProps={userData.style.head}
                expressionProps={userData.style.expression}
                levelProps={userData.stats.level}
                height={300}
              ></PooCreature>
            ) : (
              <ActivityIndicator
                size="large"
                style={{ paddingTop: 110 }}
              ></ActivityIndicator>
            )}
          </View>
          <ScrollView
            style={[{ flex: 1 }]}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  loadUserData(true);
                }}
              ></RefreshControl>
            }
          >
            <View style={[{ height: 350 }]}></View>
            <View
              style={[
                style.border,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomWidth: 0,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                },
              ]}
            >
              <PlayerInfosSubHeader
                name={userData?.style.name}
                level={userData?.stats.level}
                pooTrophees={userData?.resources.pooTrophee}
                pooCoins={userData?.resources.pooCoins}
              ></PlayerInfosSubHeader>
              <View style={{ height: 30 }}></View>
              {userData ? (
                <>
                  <PooCreatureStatsTable
                    stats={{ ...userData.stats }}
                    fontSize={20}
                    iconSize={32}
                    viewStyle={{ gap: 50, paddingHorizontal: 20 }}
                    columnStyle={{ gap: 10 }}
                  ></PooCreatureStatsTable>
                  <UltiItem
                    ulti={userData.stats.ultiSelected ?? undefined}
                    fontSize={15}
                    viewStyle={{ marginHorizontal: 20, marginTop: 15 }}
                  ></UltiItem>
                  <TitleWithDivider
                    hideLeftDivider
                    viewStyle={{ paddingTop: 30, paddingBottom: 10 }}
                  >
                    Ressources
                  </TitleWithDivider>
                  <View
                    style={[
                      style.flexRow,
                      style.flexWrap,
                      style.itemsCenter,
                      {
                        gap: 5,
                      },
                    ]}
                  >
                    {Object.keys(userData.resources)
                      .sort(
                        (a, b) =>
                          userData.resources[b as Resources] -
                          userData.resources[a as Resources],
                      )
                      .map((resource, index) => (
                        <InventoryItem
                          resource={resource as Resources}
                          value={userData.resources[resource as Resources]}
                          key={index}
                          viewStyle={{
                            backgroundColor: colors.gray[100],
                            borderRadius: 10,
                          }}
                          showWhenEmpty
                        ></InventoryItem>
                      ))}
                  </View>
                  <TitleWithDivider
                    hideLeftDivider
                    viewStyle={{ paddingTop: 30, paddingBottom: 10 }}
                  >
                    Village : {userData.village.name}
                  </TitleWithDivider>
                  <View
                    style={[
                      style.flexRow,
                      style.flexWrap,
                      {
                        gap: 5,
                      },
                    ]}
                  >
                    {Object.keys(userData.village.structures)
                      .sort(
                        (a, b) =>
                          userData.village.structures[b as StructureName]
                            .level -
                          userData.village.structures[a as StructureName].level,
                      )
                      .map((structureName, index) => (
                        <StructureSlotItem
                          structureName={structureName as StructureName}
                          level={
                            userData.village.structures[
                              structureName as StructureName
                            ].level
                          }
                          key={index}
                        ></StructureSlotItem>
                      ))}
                  </View>
                  <TitleWithDivider
                    hideLeftDivider
                    viewStyle={{ paddingTop: 30, paddingBottom: 10 }}
                  >
                    Couleurs débloquées
                  </TitleWithDivider>
                  <View
                    style={[
                      style.flexRow,
                      style.flexWrap,
                      style.itemsCenter,
                      {
                        gap: 5,
                      },
                    ]}
                  >
                    {ShopItems.bodyColors?.items
                      .filter(
                        (i) =>
                          userData.itemsUnlocked.bodyColors.includes(
                            i.item as string,
                          ) || isFreeShopItem(i),
                      )
                      .map((i, index) => (
                        <BodyColorSlotItem
                          color={i.item as string}
                          key={index}
                        ></BodyColorSlotItem>
                      ))}
                  </View>
                  <TitleWithDivider
                    hideLeftDivider
                    viewStyle={{ paddingTop: 30, paddingBottom: 10 }}
                  >
                    Têtes débloquées
                  </TitleWithDivider>
                  <View
                    style={[
                      style.flexRow,
                      style.flexWrap,
                      style.itemsCenter,
                      {
                        gap: 5,
                      },
                    ]}
                  >
                    {ShopItems.heads?.items
                      .filter(
                        (i) =>
                          userData.itemsUnlocked.heads.includes(
                            i.item as string,
                          ) || isFreeShopItem(i),
                      )
                      .map((i, index) => (
                        <HeadSlotItem
                          headName={i.item as string}
                          key={index}
                        ></HeadSlotItem>
                      ))}
                  </View>
                  <TitleWithDivider
                    hideLeftDivider
                    viewStyle={{ paddingTop: 30, paddingBottom: 10 }}
                  >
                    Visages débloquées
                  </TitleWithDivider>
                  <View
                    style={[
                      style.flexRow,
                      style.flexWrap,
                      style.itemsCenter,
                      {
                        gap: 5,
                      },
                    ]}
                  >
                    {ShopItems.expressions?.items
                      .filter(
                        (i) =>
                          userData.itemsUnlocked.expressions.includes(
                            i.item as string,
                          ) || isFreeShopItem(i),
                      )
                      .map((i, index) => (
                        <ExpressionSlotItem
                          expression={i.item as string}
                          key={index}
                        ></ExpressionSlotItem>
                      ))}
                  </View>
                </>
              ) : (
                <ActivityIndicator size="large"></ActivityIndicator>
              )}
              <View style={{ height: 150 }}></View>
            </View>
          </ScrollView>
        </View>
      </CustomPage>
    </SafeAreaView>
  );
}
