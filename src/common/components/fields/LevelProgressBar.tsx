import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { usePooCreatureStatsStore } from "../../stores/poo-creature-stats.store";
import { MathUtils } from "../../utils/math-utils";
import ProgressBar, { ProgressBarProps } from "./ProgressBar";

export default function LevelProgressBar({
  ...props
}: ProgressBarProps & ViewProps) {
  const { level, currentExp } = usePooCreatureStatsStore();
  return (
    <ProgressBar
      {...props}
      max={MathUtils.calculateExpNeedForNextLevel(level)}
      current={currentExp}
      appendText={`${level}`}
    ></ProgressBar>
  );
}
