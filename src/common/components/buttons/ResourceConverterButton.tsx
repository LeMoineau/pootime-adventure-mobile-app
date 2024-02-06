import { Pressable, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import { Resources } from "../../types/Resources";
import ResourceIcon from "../icons/ResourceIcon";
import { colors } from "../../utils/color-utils";
import { useResourcesStore } from "../../stores/resources.store";
import { useState } from "react";
import ConfirmModal from "../modals/primitives/ConfirmModal";
import { MathUtils } from "../../utils/math-utils";

export default function ResourceConverterButton({
  from,
  to,
  price,
  nbGive,
  onPress,
}: {
  from: Resources;
  to: Resources;
  price: number;
  nbGive?: number;
  onPress?: (
    from: Resources,
    to: Resources,
    price: number,
    nbGive?: number
  ) => void;
}) {
  const { spend, earn } = useResourcesStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  return (
    <>
      <Pressable
        style={[{ marginHorizontal: 10 }]}
        onPress={() => {
          onPress && onPress(from, to, price, nbGive);
          setShowConfirmModal(true);
        }}
      >
        <View
          style={[
            style.flexCol,
            style.justifyBetween,
            style.itemsCenter,
            style.shadowMd,
            style.rounded,
            style.border,
            { width: 100, height: 100, backgroundColor: colors.gray[50] },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.justifyCenter,
              style.itemsCenter,
              { flex: 1 },
            ]}
          >
            <Text
              style={[
                style.textLg,
                style.textBold,
                style.textShadowMd,
                { color: colors.gray[50], marginRight: 5 },
              ]}
            >
              {nbGive === undefined
                ? 1
                : MathUtils.convertToReduceStrFormat(nbGive)}
            </Text>
            <ResourceIcon resource={to} size={50}></ResourceIcon>
          </View>
          <View
            style={[
              style.flexRow,
              style.justifyCenter,
              style.itemsCenter,
              style.wFull,
              style.rounded,

              {
                backgroundColor: colors.blue[400],
                paddingVertical: 5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            ]}
          >
            <Text
              style={[style.textBold, { color: colors.white, marginRight: 5 }]}
            >
              {MathUtils.convertToReduceStrFormat(price)}
            </Text>
            <ResourceIcon resource={from} size={20}></ResourceIcon>
          </View>
        </View>
      </Pressable>
      <ConfirmModal
        visible={showConfirmModal}
        onRequestClose={() => {
          setShowConfirmModal(false);
        }}
        onConfirm={async () => {
          spend(from, price, async () => {
            await earn(to, nbGive === undefined ? 1 : nbGive);
          });
        }}
      >
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.flexWrap,
            style.itemsCenter,
          ]}
        >
          <Text>Voulez-vous dépenser {price} </Text>
          <ResourceIcon resource={from} size={25}></ResourceIcon>
          <Text style={[{ marginLeft: 3 }]}> pour {nbGive ?? 1} </Text>
          <ResourceIcon resource={to} size={25}></ResourceIcon>
        </View>
      </ConfirmModal>
    </>
  );
}
