import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { ItemInStore } from "../../../common/types/itemInStore";
import UltiView from "../elements/UltiView";
import IconFromImage from "../../../common/components/icons/IconFromImage";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";
import { Ultis } from "../../../common/types/Ultis";

export default function UltiTab() {
  const { spendStar } = useResourcesStore();
  const { ultis, unlockUlti } = useItemsUnlockedStore();
  const { ultiSelected, selectUlti } = usePooCreatureStatsStore();

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
            price={item.price}
            unlocked={ultis.includes(item.name)}
            selected={ultiSelected === item.name}
            onPress={async () => {
              if (!ultis.includes(item.name)) {
                await spendStar(item.price, async () => {
                  await unlockUlti(item.name);
                  await selectUlti(item.name);
                });
              } else {
                await selectUlti(item.name);
              }
            }}
          ></UltiView>
        );
      })}
    </View>
  );
}
