import {
  Image,
  Modal,
  ModalProps,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { style } from "../../../common/utils/style-utils";

export default function EventModal({
  imageUrl,
  ...props
}: { imageUrl: string } & ModalProps) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      {...props}
    >
      <Pressable onPress={props.onRequestClose}>
        <View
          style={[
            style.justifyCenter,
            style.itemsCenter,
            {
              width: width,
              height: height,
              padding: 15,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
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
                uri: imageUrl,
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
