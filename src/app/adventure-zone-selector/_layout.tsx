import { router, Stack } from "expo-router";
import useBackHandler from "../../common/hooks/ui/useBackHandler";

export default function AdventureZoneSelectorLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
