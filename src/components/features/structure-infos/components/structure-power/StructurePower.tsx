import { StructureName } from "../../../../../config/constants/Structures";
import ToiletPower from "./toilet/ToiletPower";
import YarisPower from "./yaris/YarisPower";

export default function StructurePower({
  structName,
}: {
  structName: StructureName;
}) {
  return (
    <>
      {structName === "toilet" && (
        <ToiletPower dateNow={Date.now()}></ToiletPower>
      )}
      {structName === "yaris" && <YarisPower></YarisPower>}
    </>
  );
}
