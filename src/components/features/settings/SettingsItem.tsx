import { Pressable, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import RightArrow from "../../common/icons/rightArrow";
import ExpoIcon, { AllIconNames } from "../../common/icons/ExpoIcon";
import { colors } from "../../../constants/style/colors";
import { useState } from "react";

export interface SettingsItemProps {
  icon?: AllIconNames;
  label: string;
  subLabel?: string;
  hasRightArrow?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  variant?: "standard" | "error" | "fade" | "success";
}

const MAX_SUBLABEL_MINIMIZED_LENGTH = 200;

export default function SettingsItem({
  icon,
  label,
  subLabel,
  hasRightArrow,
  disabled,
  onPress,
  variant,
}: {} & SettingsItemProps) {
  const [maximazed, setMaximazed] = useState(false);
  const subLabelTooBig =
    subLabel && subLabel.length > MAX_SUBLABEL_MINIMIZED_LENGTH;

  return (
    <Pressable
      style={[
        style.wFull,
        style.flexRow,
        style.justifyBetween,
        style.itemsCenter,
        style.border,
        {
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor:
            variant === "error"
              ? colors.red[100]
              : variant === "success"
                ? colors.green[100]
                : colors.gray[50],
          borderColor:
            variant === "error"
              ? colors.red[200]
              : variant === "fade"
                ? colors.gray[50]
                : variant === "success"
                  ? colors.green[200]
                  : colors.gray[200],
          borderRadius: 10,
          marginBottom: 15,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => {
        if (!disabled) {
          onPress && onPress();
        }
      }}
    >
      <View
        style={[
          style.flexRow,
          style.itemsCenter,
          style.hFull,
          { flex: 1, paddingRight: 0 },
        ]}
      >
        {icon && <ExpoIcon name={icon} size={20}></ExpoIcon>}
        <View style={[{ flex: 1, marginLeft: icon ? 15 : 0 }]}>
          <Text style={[{ color: colors.black, fontSize: 17 }]}>{label}</Text>
          {subLabel && (
            <View style={[style.flexRow, { flex: 1 }]}>
              <Text
                style={[
                  style.textSm,
                  { flex: 1, color: colors.black, opacity: 0.5 },
                ]}
              >
                {subLabelTooBig && !maximazed
                  ? `${subLabel.substring(0, MAX_SUBLABEL_MINIMIZED_LENGTH)}...`
                  : subLabel}
              </Text>
              {subLabelTooBig && (
                <Pressable
                  style={[{ padding: 10 }]}
                  onPress={() => {
                    setMaximazed(!maximazed);
                  }}
                >
                  <ExpoIcon
                    name={!maximazed ? "chevron-down" : "chevron-up"}
                    size={15}
                  ></ExpoIcon>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>
      {hasRightArrow && <RightArrow size={15}></RightArrow>}
    </Pressable>
  );
}
