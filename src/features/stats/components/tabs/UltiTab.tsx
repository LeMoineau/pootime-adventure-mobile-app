import { View } from "react-native";
import { style } from "../../../../common/utils/style-utils";
import { ItemInStore } from "../../../../common/types/itemInStore";
import UltiView from "../UltiButton";
import IconFromImage from "../../../../common/components/icons/IconFromImage";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import { Ultis } from "../../../../common/types/Ultis";

export default function UltiTab() {
  const { ultiSelected, level, selectUlti } = usePooCreatureStatsStore();

  return (
    <View style={[style.flexCol]}>
      {ItemInStore.ultis.map((item, index) => {
        const ulti = Ultis[item.name];
        return (
          <UltiView
            key={index}
            title={ulti.title}
            desc={ulti.desc}
            icon={<IconFromImage uri={ulti.icon} size={70}></IconFromImage>}
            details={ulti.details}
            unlockLevel={ulti.unlockLevel}
            unlocked={level >= ulti.unlockLevel}
            selected={ultiSelected === item.name}
            onPress={async () => {
              if (level >= ulti.unlockLevel) {
                await selectUlti(item.name);
              }
            }}
          ></UltiView>
        );
      })}
    </View>
  );
}
