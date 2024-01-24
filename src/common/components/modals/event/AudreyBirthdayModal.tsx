import {
  Modal,
  ModalProps,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { style } from "../../../utils/style-utils";

export default function AudreyBirthdayModal({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & ModalProps) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal animationType="slide" transparent {...props}>
      <View
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { width: 0.9 * width, height: 0.7 * height, padding: 20 },
        ]}
      ></View>
    </Modal>
  );
}
