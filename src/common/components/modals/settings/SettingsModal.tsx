import { Modal, ModalProps, ScrollView, Text, View } from "react-native";
import { colors } from "../../../utils/color-utils";
import { style } from "../../../utils/style-utils";
import PillButton from "../../buttons/PillButton";
import RightArrow from "../../icons/rightArrow";
import PooCreature from "../../misc/PooCreature";

export default function SettingsModal({ ...props }: {} & ModalProps) {
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
            paddingVertical: 20,
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
            Parametres
          </Text>
        </View>
        <PooCreature width={230}></PooCreature>
      </View>
    </Modal>
  );
}
