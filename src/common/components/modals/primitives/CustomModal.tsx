import {
  ColorValue,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import TextWithSubShadow from "../../text/TextWithSubShadow";
import StandardButton from "../../buttons/StandardButton";
import Color from "color";
import PillButton from "../../buttons/PillButton";
import PlusIcon from "../../icons/plus";

interface ModalActionBtn {
  text: string;
  color?: ColorValue;
  dontCloseModalOnPress?: boolean;
  onPress?: () => void;
}

export default function CustomModal({
  visible,
  title,
  desc,
  mainColor = colors.gray[400],
  actionsBtns = [],
  closeWhenPressingTransparentOverlay,
  children,
  containerStyle,
  onRequestClose,
}: {
  visible: boolean;
  title: string;
  desc?: string;
  mainColor?: ColorValue;
  actionsBtns?: ModalActionBtn[];
  closeWhenPressingTransparentOverlay?: boolean;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onRequestClose?: (event: NativeSyntheticEvent<any>) => void;
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={[
          style.justifyCenter,
          style.itemsCenter,
          { flex: 1, padding: 20, backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={(evt) => {
          if (closeWhenPressingTransparentOverlay) {
            onRequestClose && onRequestClose(evt);
          }
        }}
      >
        <View
          style={[
            style.wFull,
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            {
              paddingHorizontal: 7,
              paddingVertical: 7,
              backgroundColor: mainColor,
              borderRadius: 5,
              gap: 10,
            },
          ]}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(evt) => {
            evt.stopPropagation();
          }}
        >
          <TextWithSubShadow style={{ fontSize: 20, textAlign: "center" }}>
            {title}
          </TextWithSubShadow>
          <View
            style={[
              style.shadowMd,
              style.wFull,
              style.flexCol,
              style.itemsCenter,
              {
                justifyContent: "flex-start",
                paddingTop: 20,
                paddingBottom: 10,
                paddingHorizontal: 10,
                backgroundColor: colors.white,
                borderRadius: 5,
                borderColor: colors.gray[300],
                gap: 20,
              },
              containerStyle,
            ]}
          >
            {desc && <Text>{desc}</Text>}
            {children}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {actionsBtns.map((btn, index) => (
                <StandardButton
                  key={index}
                  style={[{ flex: 1, maxWidth: "50%", minWidth: 90 }]}
                  bgColor={btn.color?.toString() ?? colors.primary}
                  textColor={colors.white}
                  viewStyle={[
                    {
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    },
                  ]}
                  borderColor={Color(btn.color ?? colors.primary)
                    .darken(0.2)
                    .toString()}
                  textStyle={[{ flex: 1, fontSize: 15, fontWeight: "500" }]}
                  onPress={(evt) => {
                    btn.onPress && btn.onPress();
                    !btn.dontCloseModalOnPress &&
                      onRequestClose &&
                      onRequestClose(evt);
                  }}
                >
                  {btn.text}
                </StandardButton>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
