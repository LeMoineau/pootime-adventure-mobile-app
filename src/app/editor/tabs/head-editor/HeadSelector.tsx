import { colors } from "../../../../common/utils/color-utils";
import EditSelector, { EditSelectorProps } from "../../EditSelector";
import { PooHeads } from "../../../../common/types/PooHeads";
import { MathUtils } from "../../../../common/utils/math-utils";
import { usePooCreatureStatsStore } from "../../../../common/stores/poo-creature-stats.store";
import { Resources } from "../../../../common/types/Resources";
import { CurveUtils } from "../../../../common/utils/curve-utils";

export default function HeadSelector({
  name,
  onRequestSelect,
  ...props
}: {
  name: string;
  onRequestSelect?: (
    name: string,
    price?: number,
    resource?: Resources
  ) => void;
} & EditSelectorProps) {
  const { level } = usePooCreatureStatsStore();
  return (
    <EditSelector
      {...props}
      bgColor={colors.white}
      onPress={() =>
        onRequestSelect && onRequestSelect(name, props.price, props.resource)
      }
    >
      {PooHeads[name]({
        fillColor: CurveUtils.calculateHeadColor(level),
        style: {
          width: 80,
          height: 80,
        },
      })}
    </EditSelector>
  );
}
