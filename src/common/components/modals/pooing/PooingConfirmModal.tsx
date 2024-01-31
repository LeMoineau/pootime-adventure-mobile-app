import { ModalProps, Text } from "react-native";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";
import React, { useEffect, useRef, useState } from "react";
import ConfirmModal from "../primitives/ConfirmModal";

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
                style={{ paddingTop: 10 }}
                bgColor={colors.gray[100]}
              >
                Confirm
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
