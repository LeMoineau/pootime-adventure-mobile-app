import { router, Stack } from "expo-router";
import useBackHandler from "../../hooks/common/ui/useBackHandler";

export default function AdventureZoneSelectorLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
