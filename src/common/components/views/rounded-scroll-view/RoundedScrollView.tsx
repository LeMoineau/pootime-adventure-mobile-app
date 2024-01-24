import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import RoundedScrollViewTabSelector from "./RoundedScrollViewTabSelector";

export default function RoundedScrollView({
  tabs,
  endTabs,
  defaultTab,
}: {
  tabs: { icon: React.ReactNode; content: React.ReactNode }[];
  endTabs?: { icon: React.ReactNode; content: React.ReactNode }[];
  defaultTab?: number;
}) {
  const [tabSelected, setTabSelected] = useState<number>(defaultTab ?? 0);

  return (
    <View
      style={[
        style.wFull,
        style.shadowMd,
        style.border,
        {
          marginTop: 20,
          backgroundColor: colors.white,
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      ]}
    >
      <View
        style={[
          style.flexRow,
          style.wFull,
          style.justifyBetween,
          {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          },
        ]}
      >
        <View style={[style.flexRow]}>
          {tabs.map((tab, index) => {
            return (
              <RoundedScrollViewTabSelector
                tabAssign={index}
                tabSelected={tabSelected}
                contentIcon={tab.icon}
                onPress={setTabSelected}
                key={`tab-selector-${index}`}
              ></RoundedScrollViewTabSelector>
            );
          })}
        </View>
        <View style={[style.flexRow, style.justifyCenter, style.itemsCenter]}>
          {endTabs &&
            endTabs.map((tab, index) => {
              return (
                <RoundedScrollViewTabSelector
                  tabAssign={tabs.length + index}
                  tabSelected={tabSelected}
                  contentIcon={tab.icon}
                  onPress={setTabSelected}
                  key={`tab-selector-${tabs.length + index}`}
                ></RoundedScrollViewTabSelector>
              );
            })}
        </View>
      </View>
      {tabs.map((tab, index) => {
        return (
          tabSelected === index && (
            <ScrollView key={`tab-${index}`}>{tab.content}</ScrollView>
          )
        );
      })}
      {endTabs &&
        endTabs.map((tab, index) => {
          return (
            tabSelected === tabs.length + index && (
              <ScrollView key={`tab-${tabs.length + index}`}>
                {tab.content}
              </ScrollView>
            )
          );
        })}
    </View>
  );
}
