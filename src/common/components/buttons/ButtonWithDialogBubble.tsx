import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import DialogBubble from "../views/DialogBubble";
import { useBlurStore } from "../../stores/style/blur.store";

export default function ButtonWithDialogBubble({
  button,
  dialogBubblePosition,
}: {
  button: React.ReactNode;
  dialogBubblePosition: "above" | "under";
}) {
  const { enableBlur } = useBlurStore();
  const [showBubble, setShowBubble] = useState(false);

  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          { backgroundColor: "blue", minWidth: 250, zIndex: 20 },
        ]}
      >
        <Pressable
          onPress={() => {
            console.log("coucou");
            enableBlur();
            setShowBubble(true);
          }}
        >
          {button}
        </Pressable>
        {showBubble && (
          <DialogBubble
            direction={dialogBubblePosition === "above" ? "down" : "up"}
            viewStyle={[
              { position: "absolute", left: 0, zIndex: 20 },
              dialogBubblePosition === "above"
                ? { bottom: "100%" }
                : { top: "100%" },
            ]}
          >
            <Text>coucou</Text>
          </DialogBubble>
        )}
      </View>
    </>
  );
}
