import React, { useRef, useState } from "react";
import { View } from "react-native";

export default function useModal() {
  const [modalContainer, setModalContainer] = useState<React.ReactNode>();
  const modals = useRef<React.ReactNode[]>([]);

  const openModal = (modal: React.ReactNode) => {
    modals.current = [...modals.current, modal];
    _updateModalContainer();
  };

  /**
   * Close latest opened modal
   */
  const popModal = () => {
    modals.current = [...modals.current.splice(1)];
    _updateModalContainer();
  };

  const _updateModalContainer = () => {
    setModalContainer(
      modals.current.map((modal, index) => <View key={index}>{modal}</View>),
    );
  };

  return { modalContainer, openModal, popModal };
}
