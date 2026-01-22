import { View } from "react-native";
import { style } from "../../../../../common/utils/style-utils";
import StatsTips from "../StatsTips";
import StatIncrementorItem from "../../../../../components/items/StatIncrementorItem";
import { useState } from "react";

export default function StatsManager() {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  return (
    <View style={[style.flexRow, style.flexWrap, { padding: 20 }]}>
      {["pv", "attaque", "defense", "mana", "recupMana", "resMana"].map(
        (stat, index) => (
          <StatIncrementorItem
            stat={stat as any}
            key={index}
            onPress={() => {
              setSelectedIndex(index === selectedIndex ? -1 : index);
            }}
            selected={index === selectedIndex}
          ></StatIncrementorItem>
        ),
      )}
      <StatsTips></StatsTips>
    </View>
  );
}
