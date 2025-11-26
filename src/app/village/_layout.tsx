import { router, Slot, Stack } from "expo-router";
import useBackHandler from "../../common/hooks/ui/useBackHandler";

export default function VillageLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Slot></Slot>;
}
