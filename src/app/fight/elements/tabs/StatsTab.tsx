import { Text, View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import StatsField from "../StatsField";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import { useResourcesStore } from "../../../../common/stores/resources.store";
import StatsTips from "../StatsTips";

export default function StatsTab() {
  const { attaque, defense, pv, mana, resMana, recupMana, incrStat } =
    usePooCreatureStatsStore();
  const { get, spend } = useResourcesStore();
  const statsHandlers: {
    label: string;
    value: number;
    onPress: () => Promise<void>;
  }[] = [
    {
      label: "Attaque",
      value: attaque,
      onPress: async () => {
        await incrStat("attaque");
      },
    },
    {
      label: "Défense",
      value: defense,
      onPress: async () => {
        await incrStat("defense");
      },
    },
    {
      label: "Point de Vie",
      value: pv,
      onPress: async () => {
        await incrStat("pv");
      },
    },
    {
      label: "Mana",
      value: mana,
      onPress: async () => {
        await incrStat("mana");
      },
    },
    {
      label: "Résist. Mana",
      value: resMana,
      onPress: async () => {
        await incrStat("resMana");
      },
    },
    {
      label: "Récup. Mana",
      value: recupMana,
      onPress: async () => {
        await incrStat("recupMana");
      },
    },
  ];

  return (
    <View style={[style.flexRow, style.flexWrap, { padding: 20 }]}>
      {statsHandlers.map((sh, index) => {
        return (
          <StatsField
            label={sh.label}
            value={sh.value}
            upgradeAvailable={get("stars") >= 1}
            onUpgrade={async () => {
              await spend("stars", 1, async () => {
                await sh.onPress();
              });
            }}
            key={index}
          ></StatsField>
        );
      })}
      <StatsTips></StatsTips>
    </View>
  );
}
