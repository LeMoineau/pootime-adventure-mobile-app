import { Modal, ModalProps, Pressable, View } from "react-native";
import React from "react";
import { style } from "../../../utils/style-utils";
import DialogBubble from "../../views/DialogBubble";

export default function DialogBubbleModal({ ...props }: ModalProps) {
  return (
    <Modal animationType="slide" transparent {...props}>
      <Pressable
        onPress={(evt) => props.onRequestClose && props.onRequestClose(evt)}
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: "rgba(0, 0, 0, 0.4)" },
        ]}
      >
        <View
          style={[
            {
              position: "absolute",
              top: 50,
              left: 0,

              // width: 200,
              // height: 50,
            },
          ]}
        >
          <DialogBubble
            trianglePosition={[0, 35]}
            direction="up"
          ></DialogBubble>
        </View>
      </Pressable>
    </Modal>
  );
}
