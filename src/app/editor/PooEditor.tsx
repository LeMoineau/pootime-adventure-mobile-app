import { SafeAreaView, View } from "react-native";
import AnimatedBackground from "../../common/components/misc/AnimatedBackground";
import { style } from "../../common/utils/style-utils";
import EditorTopBar from "./navigation/EditorTopBar";
import PooCreature from "../../common/components/misc/PooCreature";
import RoundedScrollView from "../../common/components/views/rounded-scroll-view/RoundedScrollView";
import PooBodyEditIcon from "../../common/components/icons/pooBodyEdit";
import BodyEditorView from "./body-editor/BodyEditorView";
import PooHeadEditIcon from "../../common/components/icons/pooHeadEdit";
import PooFaceEditIcon from "../../common/components/icons/pooFaceEdit";
import FaceEditorView from "./face-editor/FaceEditorView";
import HeadEditorView from "./head-editor/HeadEditorView";

export default function PooEditor() {
  return (
    <SafeAreaView style={[style.wFull, style.hFull]}>
      <AnimatedBackground
        imageUri="https://bigstones.fr/pootime-adventure/poobg.png"
        bgColor="#FFE5A3"
      ></AnimatedBackground>
      <View
        style={[
          style.wFull,
          style.hFull,
          style.flexCol,
          style.itemsCenter,
          { paddingTop: 80 },
        ]}
      >
        <EditorTopBar></EditorTopBar>
        <PooCreature width={150}></PooCreature>
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
        ></RoundedScrollView>
      </View>
    </SafeAreaView>
  );
}
