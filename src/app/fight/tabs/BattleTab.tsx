import { Pressable, Text, View } from "react-native";
import { useBattleStore } from "../../../common/stores/battle.store";
import { useEffect } from "react";

export default function BattleTab() {
  const { socket } = useBattleStore();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected!");
    });
  });

  return (
    <View>
      <Pressable
        onPress={() => {
          socket.emit("coucou");
        }}
      >
        <Text>coucou</Text>
      </Pressable>
    </View>
  );
}
