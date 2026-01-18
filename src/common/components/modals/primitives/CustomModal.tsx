import {
  ColorValue,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { style } from "../../../utils/style-utils";
import { colors } from "../../../utils/color-utils";
import TextWithSubShadow from "../../text/TextWithSubShadow";
import StandardButton from "../../buttons/StandardButton";
import Color from "color";
import { he } from "zod/v4/locales";

export interface ModalActionBtn {
  text: string;
  color?: ColorValue;
  dontCloseModalOnPress?: boolean;
  onPress?: () => void;
}

export interface CustomModalProps {
  visible: boolean;
  title: string;
  desc?: string;
  mainColor?: ColorValue;
  actionsBtns?: ModalActionBtn[];
  closeWhenPressingTransparentOverlay?: boolean;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onRequestClose?: () => void;
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
}: CustomModalProps) {
  const { width, height } = useWindowDimensions();

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
          {
            maxWidth: width,
            maxHeight: height,
            flex: 1,
            padding: 20,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        ]}
        onPress={() => {
          if (closeWhenPressingTransparentOverlay) {
            onRequestClose && onRequestClose();
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
                gap: 10,
              },
              containerStyle,
            ]}
          >
            {desc && <Text style={{ textAlign: "center" }}>{desc}</Text>}
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
                  onPress={() => {
                    btn.onPress && btn.onPress();
                    !btn.dontCloseModalOnPress &&
                      onRequestClose &&
                      onRequestClose();
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
