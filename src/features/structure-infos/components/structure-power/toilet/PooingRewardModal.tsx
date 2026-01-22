import { usePooCreatureStyleStore } from "../../../../../stores/poo-creature-style.store";
import { colors } from "../../../../../utils/color-utils";
import CustomRewardModal, {
  CustomRewardModalProps,
} from "../../../../../components/common/modals/primitives/CustomRewardModal";
import { useEffect, useRef, useState } from "react";
import CustomModal from "../../../../../components/common/modals/primitives/CustomModal";

export default function PooingRewardModal({
  rewards,
  onPressEarnBtn,
  ...props
}: Omit<CustomRewardModalProps, "title">) {
  const { name } = usePooCreatureStyleStore();
  const [emptyReward, setEmptyReward] = useState(true);

  useEffect(() => {
    for (let r of rewards) {
      if (r.number > 0) {
        setEmptyReward(false);
        return;
      }
    }
    setEmptyReward(true);
  }, [rewards]);

  if (emptyReward) {
    return (
      <CustomModal
        title="Mince..."
        desc="Il semblerait que vous ne soyez pas resté assez longtemps aux toilettes... 👀"
        mainColor={colors.red[400]}
        visible={props.visible}
        closeWhenPressingTransparentOverlay
        containerStyle={{ gap: 20 }}
        actionsBtns={[
          {
            text: "Fermer",
            color: colors.red[400],
            onPress: () => {
              props.onRequestClose && props.onRequestClose();
            },
          },
        ]}
        onRequestClose={props.onRequestClose}
      ></CustomModal>
    );
  }

  return (
    <CustomRewardModal
      title={"Succès !"}
      desc={`Vous avez posé une belle pêche ! Voici ce que ${name} a trouvé pendant ce temps là !`}
      rewards={rewards}
      onPressEarnBtn={onPressEarnBtn}
      onRequestClose={props.onRequestClose}
      {...props}
    ></CustomRewardModal>
  );
}
