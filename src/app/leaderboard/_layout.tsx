import { router, Slot } from "expo-router";
import useBackHandler from "../../common/hooks/ui/useBackHandler";

export default function LeaderboardLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Slot></Slot>;
}
