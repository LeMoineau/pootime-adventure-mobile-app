import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import RoundedScrollViewTabSelector from "./RoundedScrollViewTabSelector";

export default function RoundedScrollView({
  tabs,
  defaultTab,
}: {
  tabs: { icon: React.ReactNode; content: React.ReactNode }[];
  defaultTab?: number;
}) {
  const [tabSelected, setTabSelected] = useState<number>(defaultTab ?? 0);

  return (
    <ScrollView
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
          {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          },
        ]}
      >
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
      {tabs.map((tab, index) => {
        return (
          tabSelected === index && (
            <View key={`tab-${index}`}>{tab.content}</View>
          )
        );
      })}
    </ScrollView>
  );
}
