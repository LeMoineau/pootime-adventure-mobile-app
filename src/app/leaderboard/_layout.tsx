import { router, Slot } from "expo-router";
import useBackHandler from "../../hooks/common/ui/useBackHandler";

export default function LeaderboardLayout() {
  useBackHandler(() => {
    router.back();
  });

  return <Slot></Slot>;
}
