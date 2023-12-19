import { useState } from "react";
import PooBodyEditIcon from "../../common/components/icons/pooBodyEdit";
import PooFaceEditIcon from "../../common/components/icons/pooFaceEdit";
import PooHeadEditIcon from "../../common/components/icons/pooHeadEdit";
import { colors } from "../../common/utils/color-utils";
import { style } from "../../common/utils/style-utils";
import { Pressable, ScrollView, View } from "react-native";
import EditorTabSelectorButton from "./navigation/EditorTabSelectorButton";
import BodyEditorView from "./body-editor/BodyEditorView";
import FaceEditorView from "./face-editor/FaceEditorView";

export default function EditorScrollView() {
  const [tabSelected, setTabSelected] = useState<number>(0);

  return (
    <ScrollView
      style={[
        style.wFull,
        style.shadowMd,
        style.border,
        {
          marginTop: 20,
          backgroundColor: colors.white,
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      ]}
    >
      <View
        style={[
          style.flexRow,
          style.wFull,
          {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[300],
          },
        ]}
      >
        <EditorTabSelectorButton
          tabAssign={0}
          tabSelected={tabSelected}
          contentIcon={<PooBodyEditIcon size={35}></PooBodyEditIcon>}
          onPress={setTabSelected}
        ></EditorTabSelectorButton>

        <EditorTabSelectorButton
          tabAssign={1}
          tabSelected={tabSelected}
          contentIcon={<PooHeadEditIcon size={35}></PooHeadEditIcon>}
          onPress={setTabSelected}
        ></EditorTabSelectorButton>

        <EditorTabSelectorButton
          tabAssign={2}
          tabSelected={tabSelected}
          contentIcon={<PooFaceEditIcon size={35}></PooFaceEditIcon>}
          onPress={setTabSelected}
        ></EditorTabSelectorButton>
      </View>
      {tabSelected === 0 && <BodyEditorView></BodyEditorView>}
      {tabSelected === 2 && <FaceEditorView></FaceEditorView>}
    </ScrollView>
  );
}
