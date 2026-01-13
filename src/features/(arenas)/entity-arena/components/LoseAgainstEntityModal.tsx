import { router } from "expo-router";
import CustomModal from "../../../../common/components/modals/primitives/CustomModal";
import { colors } from "../../../../common/utils/color-utils";
import { Monster } from "../../../../common/models/entities/monsters/Monster";

export default function LoseAgainstEntityModal({
  monster,
  zoneIndex,
}: {
  monster: Monster;
  zoneIndex: number;
}) {
  return (
    <CustomModal
      visible={true}
      title="Perdu !"
      desc={`Vous avez perdu contre ${monster.name}`}
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
              pathname: "/(arenas)/monster",
              params: { zoneIndex },
            });
          },
        },
      ]}
    ></CustomModal>
  );
}
