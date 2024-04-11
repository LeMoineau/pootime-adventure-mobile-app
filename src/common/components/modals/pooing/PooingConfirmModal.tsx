import { ModalProps, Text } from "react-native";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";
import React, { useEffect, useRef, useState } from "react";
import ConfirmModal from "../primitives/ConfirmModal";
import { style } from "../../../utils/style-utils";

export default function PooingConfirmModal({
  onConfirm,
  ...props
}: {
  onConfirm?: () => void;
} & ModalProps) {
  const [enableConfirm, setEnableConfirm] = useState(false);
  const delayConfirm = 2000;
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setEnableConfirm(false);
    if (timeoutId) {
      clearTimeout(timeoutId.current);
    }
    if (props.visible) {
      timeoutId.current = setTimeout(() => {
        setEnableConfirm(true);
      }, delayConfirm);
    }
  }, [props.visible]);

  return (
    <ConfirmModal
      {...props}
      confirmButton={
        !enableConfirm
          ? () => (
              <StandardButton
                style={{ paddingTop: 10, flex: 1 }}
                bgColor={colors.gray[100]}
                viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
                textStyle={[{ fontSize: 15 }]}
              >
                Please wait...
              </StandardButton>
            )
          : undefined
      }
      onConfirm={onConfirm}
    >
      <Text>Do you have finished pooing ?</Text>
    </ConfirmModal>
  );
}
