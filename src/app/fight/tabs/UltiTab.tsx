import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import { ItemInStore } from "../../../common/types/itemInStore";
import UltiView from "../elements/UltiView";
import IconFromImage from "../../../common/components/icons/IconFromImage";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";

export default function UltiTab() {
  const { spendStar } = useResourcesStore();
  const { ultiUnlocked, unlockUlti } = useItemsUnlockedStore();
  const { ultiSelected, selectUlti } = usePooCreatureStatsStore();

  return (
    <View style={[style.flexCol]}>
      {ItemInStore.ultis.map((u, index) => {
        return (
          <UltiView
            key={index}
            title={u.title}
            desc={u.desc}
            icon={<IconFromImage uri={u.icon} size={70}></IconFromImage>}
            details={u.details}
            price={u.price}
            unlocked={ultiUnlocked.includes(u.title)}
            selected={ultiSelected === u.title}
            onPress={async () => {
              if (!ultiUnlocked.includes(u.title)) {
                await spendStar(u.price, async () => {
                  await unlockUlti(u.title);
                  await selectUlti(u.title);
                });
              } else {
                await selectUlti(u.title);
              }
            }}
          ></UltiView>
        );
      })}
    </View>
  );
}
