import {
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { colors } from "../../../utils/color-utils";
import { style } from "../../../utils/style-utils";
import PillButton from "../../buttons/PillButton";
import RightArrow from "../../icons/rightArrow";
import PooCreatureHead from "../../misc/PooCreatureHead";
import LevelProgressBar from "../../fields/LevelProgressBar";
import { usePooCreatureStyleStore } from "../../../stores/poo-creature-style.store";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsModal({ ...props }: {} & ModalProps) {
  const { name } = usePooCreatureStyleStore();
  return (
    <Modal animationType="slide" {...props}>
      <View
        style={[
          style.flexCol,
          style.itemsCenter,
          style.wFull,
          {
            flex: 1,
            backgroundColor: colors.gray[100],
            paddingTop: 20,
            paddingHorizontal: 10,
          },
        ]}
      >
        <View
          style={[
            style.wFull,
            style.flexRow,
            style.itemsCenter,
            { justifyContent: "flex-start" },
          ]}
        >
          <PillButton
            style={[{ marginRight: 5 }]}
            styleView={[{ padding: 10, borderWidth: 0 }]}
            onPress={props.onRequestClose}
          >
            <RightArrow
              size={20}
              strokeWidth={10}
              style={[{ transform: [{ rotateZ: "180deg" }] }]}
            ></RightArrow>
          </PillButton>
          <Text style={[style.wFull, style.textLg, style.textBold]}>
            Paramètres
          </Text>
        </View>
        <View
          style={[
            style.roundedFull,
            { padding: 20, marginTop: 20, backgroundColor: colors.white },
          ]}
        >
          <PooCreatureHead size={200}></PooCreatureHead>
        </View>
        <Text style={[style.textBold, style.textMd, { marginVertical: 10 }]}>
          {name}
        </Text>
        <LevelProgressBar></LevelProgressBar>
        <View style={[style.wFull, { padding: 10, marginTop: 20 }]}>
          <ScrollView
            style={[
              style.wFull,
              style.border,
              style.shadowMd,
              style.roundedLg,
              {
                backgroundColor: colors.white,
              },
            ]}
          >
            <Pressable
              style={[
                style.wFull,
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                style.border,
                { padding: 20, borderWidth: 0, borderBottomWidth: 1 },
              ]}
            >
              <View style={[style.flexRow]}>
                <Ionicons name="person" size={30}></Ionicons>
                <Text style={[style.textMd, { marginLeft: 15 }]}>
                  Informations
                </Text>
              </View>
              <RightArrow size={20}></RightArrow>
            </Pressable>
            <Pressable
              style={[
                style.wFull,
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                style.border,
                { padding: 20, borderWidth: 0, borderBottomWidth: 1 },
              ]}
            >
              <View style={[style.flexRow]}>
                <Ionicons name="gift" size={30}></Ionicons>
                <Text style={[style.textMd, { marginLeft: 15 }]}>
                  Evenements
                </Text>
              </View>
              <RightArrow size={20}></RightArrow>
            </Pressable>
            <Pressable
              style={[
                style.wFull,
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                style.border,
                { padding: 20, borderWidth: 0, borderBottomWidth: 1 },
              ]}
            >
              <View style={[style.flexRow]}>
                <Ionicons name="book" size={30}></Ionicons>
                <Text style={[style.textMd, { marginLeft: 15 }]}>Tutoriel</Text>
              </View>
              <RightArrow size={20}></RightArrow>
            </Pressable>
            <Pressable
              style={[
                style.wFull,
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                style.border,
                { padding: 20, borderWidth: 0, borderBottomWidth: 1 },
              ]}
            >
              <View style={[style.flexRow]}>
                <Ionicons name="code" size={30}></Ionicons>
                <Text style={[style.textMd, { marginLeft: 15 }]}>
                  Options Dev
                </Text>
              </View>
              <RightArrow size={20}></RightArrow>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
