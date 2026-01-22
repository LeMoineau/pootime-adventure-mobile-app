import { router, Slot, Stack } from "expo-router";
import useBackHandler from "../../hooks/ui/useBackHandler";

export default function VillageLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Slot></Slot>;
}
