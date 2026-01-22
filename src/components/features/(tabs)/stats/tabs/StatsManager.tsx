import { View } from "react-native";
import { style } from "../../../../../constants/style/styles";
import StatsTips from "../components/StatsTips";
import StatIncrementorItem from "../../../../common/items/StatIncrementorItem";
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
