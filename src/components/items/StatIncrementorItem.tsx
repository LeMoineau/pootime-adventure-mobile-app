import { Animated, Text, TouchableOpacity, View } from "react-native";
import StatIcon from "../icons/StatIcon";
import { PooCreatureStats } from "../../types/PooCreatureStats";
import { stats } from "../../common/constants/stats/stats";
import { usePooCreatureStatsStore } from "../../common/stores/poo-creature-stats.store";
import { useResourcesStore } from "../../common/stores/resources.store";
import { useEffect } from "react";
import { colors } from "../../common/utils/color-utils";
import StandardButton from "../buttons/StandardButton";
import ExpoIcon from "../icons/ExpoIcon";
import useAnimatedValue from "../../common/hooks/ui/use-animated-value";
import { DefaultValues } from "../../config/DefaultValues";
import { useShallow } from "zustand/react/shallow";

export default function StatIncrementorItem({
  stat,
  selected,
  onPress,
}: {
  stat: keyof Omit<PooCreatureStats, "ultiSelected" | "currentExp" | "level">;
  selected?: boolean;
  onPress?: () => void;
}) {
  const {
    getStat,
    resetStat: _resetStat,
    incrStat: _incrStat,
    ..._stats
  } = usePooCreatureStatsStore();
  const { stars, spend, earn } = useResourcesStore(
    useShallow(({ inventory, spend, earn }) => ({
      stars: inventory.stars,
      spend,
      earn,
    })),
  );

  const { animValue, setEnabled } = useAnimatedValue({
    duration: 100,
  });

  let mult = 1;
  if (stat === "pv" || stat === "mana") {
    mult = 5;
  }

  let maxStat = Math.max(
    _stats.pv / 5,
    _stats.attaque,
    _stats.defense,
    _stats.mana / 5,
    _stats.recupMana,
    _stats.resMana,
  );

  useEffect(() => {
    setEnabled(!!selected);
  }, [selected]);

  const resetStat = () => {
    const earned =
      (getStat(stat) - DefaultValues.PooCreatureStats[stat]) / mult;
    if (earned > 0) {
      earn("stars", earned);
      _resetStat(stat);
    }
  };

  const incrStat = (val: number | "max") => {
    if (val === "max") {
      val = stars;
    }
    if (val <= 0 || val > stars) return;
    spend("stars", val, () => {
      _incrStat(stat, val);
    });
  };

  const purchasable = (val: number) => {
    return val <= stars;
  };

  return (
    <Animated.View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 5,
        paddingVertical: 0,
        overflow: "hidden",
        height: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [70, 120],
        }),
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 15,
          paddingVertical: 5,
        }}
        onPress={onPress}
      >
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.gray[100],
              borderRadius: 10,
              padding: 10,
            }}
          >
            <StatIcon size={40} statKey={stat}></StatIcon>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 7,
              alignItems: "baseline",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Text>{stats[stat].label}</Text>
            <Text style={{ fontWeight: 800, fontSize: 20 }}>
              {getStat(stat)}
            </Text>
          </View>
          <View
            style={{
              height: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              width: `${(getStat(stat) / mult / maxStat) * 100}%`,
              minWidth: 15,
            }}
          ></View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <StandardButton
          style={{ flex: 1 }}
          bgColor={colors.orange[400]}
          viewStyle={{
            height: 35,
            paddingVertical: 0,
            paddingHorizontal: 0,
            display: "flex",
            justifyContent: "center",
          }}
          onPress={resetStat}
        >
          <ExpoIcon
            style={{ color: colors.white }}
            name="refresh"
            size={20}
          ></ExpoIcon>
        </StandardButton>
        {[1, 5, 10, -1].map((val, index) => (
          <StandardButton
            key={index}
            style={{ flex: 1 }}
            bgColor={
              purchasable(val === -1 ? 1 : val)
                ? colors.orange[400]
                : colors.gray[400]
            }
            viewStyle={{
              height: 35,
              paddingVertical: 0,
              paddingHorizontal: 0,
              display: "flex",
              justifyContent: "center",
              opacity: purchasable(val === -1 ? 1 : val) ? 1 : 0.7,
            }}
            textStyle={{
              fontSize: 15,
              fontWeight: 600,
              color: colors.white,
            }}
            onPress={() => {
              incrStat(val === -1 ? "max" : val);
            }}
            disabled={!purchasable(val === -1 ? 1 : val)}
          >
            {val === -1 ? "MAX" : `+${val}`}
          </StandardButton>
        ))}
      </View>
    </Animated.View>
  );
}
