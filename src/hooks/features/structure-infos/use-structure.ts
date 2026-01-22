import { useState } from "react";
import { Resources } from "../../../config/constants/Resources";
import { StructureName } from "../../../config/constants/Structures";
import { useResourcesStore } from "../../../stores/resources.store";
import { useVillageStore } from "../../../stores/village.store";
import { Structure } from "../../../types/village/Structure";
import { VillageUtils } from "../../../utils/village-utils";

const useStructure = () => {
  const [structName, setStructName] = useState<StructureName>();
  const { get: getResource } = useResourcesStore();
  const { get } = useVillageStore();

  const structure = (): Structure | undefined => {
    if (!structName) return;
    return VillageUtils.getStructureData(structName);
  };

  const buildable = (): boolean => {
    if (!structName) return false;
    const struct = VillageUtils.getStructureData(structName);
    if (!struct.buildingCost) return true;
    for (let r of Object.keys(struct.buildingCost) as Resources[]) {
      if (getResource(r) < struct.buildingCost[r]!) return false;
    }
    return true;
  };

  const upgradable = (): boolean => {
    if (!structName) return false;
    const costs = VillageUtils.iterateOnUpgradeCostOf(
      structName,
      get(structName).level,
    );
    for (let [resource, val] of costs) {
      if (getResource(resource) < val) return false;
    }
    return true;
  };

  const isLevelMax = (): boolean => {
    if (!structName) return false;
    return (
      VillageUtils.getStructureData(structName).upgradeCosts.find(
        (c) => c.fromLevel === get(structName).level,
      ) === undefined
    );
  };

  const iterateOnUpgradeCost = (): [Resources, number][] => {
    if (!structName) return [];
    return VillageUtils.iterateOnUpgradeCostOf(
      structName,
      get(structName).level,
    );
  };

  const iterateOnBuildingCost = (): [Resources, number][] => {
    const struct = structure();
    if (!struct || !struct.buildingCost) return [];
    return Object.keys(struct.buildingCost).map((r) => [
      r as Resources,
      struct.buildingCost![r as Resources]!,
    ]);
  };

  return {
    setStructName,
    structure,
    buildable,
    upgradable,
    iterateOnUpgradeCost,
    iterateOnBuildingCost,
    isLevelMax,
  };
};

export default useStructure;
