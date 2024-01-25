import { Modal, ModalProps, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import StandardButton from "../../buttons/StandardButton";
import { colors } from "../../../utils/color-utils";
import StarIcon from "../../icons/star";
import PooCoinIcon from "../../icons/pooCoin";
import WoolIcon from "../../icons/sheep/wool";

export default function RewardModal({
  children,
  starEarn,
  pooCoinEarn,
  woolEarn,
  ...props
}: {
  children?: React.ReactNode;
  starEarn?: number;
  pooCoinEarn?: number;
  woolEarn?: number;
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
          {children}
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
            {starEarn !== undefined ? (
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
            ) : (
              <></>
            )}
            {pooCoinEarn !== undefined ? (
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
            ) : (
              <></>
            )}
            {woolEarn !== undefined ? (
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
                    { marginRight: 5, color: colors.pink[400] },
                  ]}
                >
                  {woolEarn}
                </Text>
                <WoolIcon size={30}></WoolIcon>
              </View>
            ) : (
              <></>
            )}
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
