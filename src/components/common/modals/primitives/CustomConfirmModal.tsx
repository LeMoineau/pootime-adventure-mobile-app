import { colors } from "../../../../utils/color-utils";
import CustomModal, { CustomModalProps } from "./CustomModal";

export default function CustomConfirmModal({
  visible,
  title = "Confirmation",
  desc,
  mainColor = colors.primary,
  closeWhenPressingTransparentOverlay = true,
  onCancelBtnPress,
  onConfirmBtnPress,
  onRequestClose,
  ...props
}: {
  title?: string;
  onCancelBtnPress?: () => void;
  onConfirmBtnPress?: () => void;
} & Omit<CustomModalProps, "title">) {
  return (
    <CustomModal
      visible={visible}
      desc={desc}
      title={title}
      closeWhenPressingTransparentOverlay={closeWhenPressingTransparentOverlay}
      onRequestClose={() => {
        onRequestClose && onRequestClose();
        onCancelBtnPress && onCancelBtnPress();
      }}
      actionsBtns={[
        { text: "Annuler", color: colors.red[400], onPress: onCancelBtnPress },
        {
          text: "Confirmer",
          color: colors.green[400],
          onPress: onConfirmBtnPress,
        },
      ]}
      containerStyle={props.containerStyle}
      mainColor={mainColor}
      {...props}
    ></CustomModal>
  );
}
