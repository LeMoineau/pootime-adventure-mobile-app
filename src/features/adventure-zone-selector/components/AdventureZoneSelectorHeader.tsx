import { View } from "react-native";
import { colors } from "../../../common/utils/color-utils";
import PooCreatureBadge from "../../../components/misc/poo-creature/PooCreatureBadge";
import TextWithSubShadow from "../../../components/text/TextWithSubShadow";

/**
 * Sticky header of aventure zone selector
 *
 * The first view container is used bu the "stickyHeader" feature of the parent scrollView
 * @returns
 */
export default function AdventureZoneSelectorHeader() {
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 7,
          gap: 10,
          backgroundColor: colors.primary,
        }}
      >
        <PooCreatureBadge size={40}></PooCreatureBadge>
        <TextWithSubShadow style={{ fontSize: 20 }}>
          Où souhaitez-vous partir ?
        </TextWithSubShadow>
      </View>
    </View>
  );
}
