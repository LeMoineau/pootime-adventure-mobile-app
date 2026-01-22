import { router } from "expo-router";
import CustomModal from "../../../../components/modals/primitives/CustomModal";
import { colors } from "../../../../utils/color-utils";

export default function WinAgainstEntityModal({
  zoneIndex,
}: {
  zoneIndex: number;
}) {
  return (
    <CustomModal
      visible={true}
      title="Bravo !"
      desc={`Vous avez gagné !`}
      mainColor={colors.green[400]}
      containerStyle={{ gap: 20 }}
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
