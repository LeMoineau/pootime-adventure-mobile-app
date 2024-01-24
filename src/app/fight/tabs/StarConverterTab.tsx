import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ResourceConverterButton from "../../../common/components/buttons/ResourceConverterButton";
import { useState } from "react";
import ConfirmModal from "../../../common/components/modals/ConfirmModal";
import { useResourcesStore } from "../../../common/stores/resources.store";

export default function StarConverterTab() {
  return (
    <View
      style={[
        style.flexRow,
        style.flexWrap,
        style.justifyCenter,
        { padding: 20 },
      ]}
    >
      <ResourceConverterButton
        from="pooCoins"
        to="stars"
        price={1000}
      ></ResourceConverterButton>
    </View>
  );
}
