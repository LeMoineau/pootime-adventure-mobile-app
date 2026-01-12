import { router } from "expo-router";
import CustomModal from "../../../common/components/modals/primitives/CustomModal";
import { Entity } from "../../../common/types/battle/entity-battle/EntityBattleTypes";
import { colors } from "../../../common/utils/color-utils";

export default function LoseAgainstEntityModal({
  entity,
  zoneIndex,
}: {
  entity: Entity;
  zoneIndex: number;
}) {
  return (
    <CustomModal
      visible={true}
      title="Perdu !"
      desc={`Vous avez perdu contre ${entity.name}`}
      mainColor={colors.red[400]}
      actionsBtns={[
        {
          text: "Quitter",
          color: colors.gray[400],
          onPress: () => {
            router.back();
          },
        },
        {
          text: "Repartir !",
          onPress: () => {
            router.back();
            router.push({
              pathname: "/(arenas)/entity",
              params: { zoneIndex },
            });
          },
        },
      ]}
    ></CustomModal>
  );
}
