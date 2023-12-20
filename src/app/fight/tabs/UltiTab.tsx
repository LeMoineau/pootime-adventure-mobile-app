import { View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import UltiView from "../elements/UltiView";
import PenIcon from "../../../common/components/icons/pen";

export default function UltiTab() {
  return (
    <View style={[style.flexCol]}>
      <UltiView
        icon={<PenIcon size={40}></PenIcon>}
        title="test"
        desc="une description farfelue"
        details={{ mana: 10, degat: 30 }}
        price={40}
      ></UltiView>
    </View>
  );
}
