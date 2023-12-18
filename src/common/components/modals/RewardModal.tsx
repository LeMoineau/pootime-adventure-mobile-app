import { useEffect, useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import StandardButton from "../buttons/StandardButton";
import { colors } from "../../utils/color-utils";
import StarIcon from "../icons/star";
import PooCoinIcon from "../icons/pooCoin";
import usePooCurve from "../../hooks/use-poo-curve";

export default function RewardModal({
  isVisible,
  starEarn,
  pooCoinEarn,
  ...props
}: {
  isVisible?: boolean;
  starEarn: number;
  pooCoinEarn: number;
} & ModalProps) {
  return (
    <Modal animationType="slide" transparent {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20 },
        ]}
      >
        <View
          style={[
            style.rounded,
            style.shadowMd,
            style.wFull,
            style.justifyCenter,
            style.itemsCenter,
            { padding: 20, backgroundColor: "white" },
          ]}
        >
          <Text
            style={[
              style.textXl,
              style.textBold,
              { marginTop: 10, marginBottom: 20, color: colors.violet[500] },
            ]}
          >
            Congratulation 🎉
          </Text>
          <Text style={[style.textSm, style.textCenter]}>
            Vous avez posé une belle pêche !
          </Text>
          <Text style={[style.textSm, style.textCenter]}>
            Voici ce que <Text style={[style.textBold]}>Mr. Poopoo</Text> a
            trouvé pendant ce temps là !
          </Text>
          <View
            style={[
              style.wFull,
              style.border,
              style.roundedSm,
              style.flexRow,
              {
                backgroundColor: colors.gray[50],
                borderColor: colors.gray[200],
                padding: 20,
                marginVertical: 20,
              },
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
                  style.textMd,
                  { marginRight: 5, color: colors.blue[500] },
                ]}
              >
                {starEarn}
              </Text>
              <StarIcon size={30}></StarIcon>
            </View>
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
                  style.textMd,
                  { marginRight: 5, color: colors.yellow[500] },
                ]}
              >
                {pooCoinEarn}
              </Text>
              <PooCoinIcon size={30}></PooCoinIcon>
            </View>
          </View>
          <StandardButton
            style={{ paddingTop: 10 }}
            bgColor={colors.teal[400]}
            textColor={colors.white}
            onPress={props.onRequestClose}
          >
            Earn rewards
          </StandardButton>
        </View>
      </View>
    </Modal>
  );
}
