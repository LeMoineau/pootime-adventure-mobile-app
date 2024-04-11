import { StructureName } from "../../../../common/config/game-data/Structures";
import ToiletPower from "./toilet/ToiletPower";
import YarisPower from "./yaris/YarisPower";

export default function StructurePower({
  structName,
}: {
  structName: StructureName;
}) {
  return (
    <>
      {structName === "toilet" && <ToiletPower></ToiletPower>}
      {structName === "yaris" && <YarisPower></YarisPower>}
    </>
  );
}
