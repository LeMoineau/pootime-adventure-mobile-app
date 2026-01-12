import React, { useState } from "react";

export default function useModal() {
  const [modalContainer, setModalContainer] = useState<React.ReactNode>();

  const openModal = (modal: React.ReactNode) => {
    setModalContainer(modal);
  };

  return { modalContainer, openModal };
}
