import {
  Image,
  Modal,
  ModalProps,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../../utils/style-utils";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";

export default function AudreyBirthdayModal({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & ModalProps) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal animationType="slide" transparent {...props}>
      <Pressable onPress={props.onRequestClose}>
        <View
          style={[
            style.justifyCenter,
            style.itemsCenter,
            { width: width, height: height, padding: 15 },
          ]}
        >
          <View
            style={[
              style.wFull,
              style.hFull,
              style.rounded,
              style.overflowHidden,
            ]}
          >
            <Image
              source={{
                uri: "https://bigstones.fr/pootime-adventure/events/audreyBirthday.jpg",
              }}
              resizeMode="contain"
              style={[style.wFull, style.hFull]}
            ></Image>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
