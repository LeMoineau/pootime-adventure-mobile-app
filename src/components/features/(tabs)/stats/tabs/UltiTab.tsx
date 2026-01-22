import { View } from "react-native";
import { style } from "../../../../../constants/style/styles";
import { ItemInStore } from "../../../../../types/itemInStore";
import IconFromImage from "../../../../common/icons/IconFromImage";
import { usePooCreatureStatsStore } from "../../../../../stores/poo-creature-stats.store";
import { Ultis } from "../../../../../types/Ultis";
import UltiButton from "../UltiButton";

export default function UltiTab() {
  const { ultiSelected, level, toggleUlti } = usePooCreatureStatsStore();

  return (
    <View style={[style.flexCol]}>
      {ItemInStore.ultis.map((item, index) => {
        const ulti = Ultis[item.name];
        return (
          <UltiButton
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
                await toggleUlti(item.name);
              }
            }}
          ></UltiButton>
        );
      })}
    </View>
  );
}
