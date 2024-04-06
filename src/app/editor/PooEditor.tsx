import { SafeAreaView, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import EditorTopBar from "./navigation/EditorTopBar";
import PooCreature from "../../common/components/misc/poo-creature/PooCreature";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooBodyEditIcon from "../../common/components/icons/ui/pooBodyEdit";
import BodyEditorView from "./tabs/body-editor/BodyEditorView";
import PooHeadEditIcon from "../../common/components/icons/ui/pooHeadEdit";
import PooFaceEditIcon from "../../common/components/icons/ui/pooFaceEdit";
import FaceEditorView from "./tabs/face-editor/FaceEditorView";
import HeadEditorView from "./tabs/head-editor/HeadEditorView";
import CustomPage from "../../common/components/navigation/CustomPage";
import PooCoinsConverterIcon from "../../common/components/icons/ui/pooCoinsConverter";
import PooCoinsConverterTab from "./tabs/PooCoinsConverterTab";
import { colors } from "../../common/utils/color-utils";

export default function PooEditor() {
  return (
    <CustomPage bgColor={colors.transparent}>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.itemsCenter,
          { paddingTop: 80 },
        ]}
      >
        {/* <EditorTopBar></EditorTopBar> */}
        <RoundedScrollView
          tabs={[
            {
              icon: <PooBodyEditIcon size={35}></PooBodyEditIcon>,
              content: <BodyEditorView></BodyEditorView>,
            },
            {
              icon: <PooHeadEditIcon size={35}></PooHeadEditIcon>,
              content: <HeadEditorView></HeadEditorView>,
            },
            {
              icon: <PooFaceEditIcon size={35}></PooFaceEditIcon>,
              content: <FaceEditorView></FaceEditorView>,
            },
          ]}
          endTabs={[
            {
              icon: <PooCoinsConverterIcon size={35}></PooCoinsConverterIcon>,
              content: <PooCoinsConverterTab></PooCoinsConverterTab>,
            },
          ]}
        ></RoundedScrollView>
      </View>
    </CustomPage>
  );
}
