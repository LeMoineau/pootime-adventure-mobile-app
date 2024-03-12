import { Image, Linking, Modal, ModalProps, Text, View } from "react-native";
import SettingsPage from "../../views/settings/SettingsPage";
import SettingsHeader from "../../views/settings/SettingsHeader";
import { SettingsScrollView } from "../../views/settings/SettingsScrollView";
import { style } from "../../../utils/style-utils";

export default function TipsSettingsModal({ ...props }: {} & ModalProps) {
  return (
    <>
      <Modal {...props} animationType="fade">
        <SettingsPage
          header={
            <SettingsHeader
              title="Faire un don"
              onPressBack={props.onRequestClose}
            ></SettingsHeader>
          }
        >
          <View style={[style.flexCol, { flex: 1 }]}>
            <View style={[style.flexRow, style.justifyCenter, { flex: 1 }]}>
              <Image
                source={{
                  uri: "https://storage.ko-fi.com/cdn/useruploads/9195469e-a3e8-45d6-91e8-5873e33e66d2_241cd3f8-7405-4896-bf43-d754e17aff68.png",
                }}
                style={[
                  style.roundedFull,
                  style.overflowHidden,
                  { width: 150, height: 150 },
                ]}
              ></Image>
            </View>
            <Text
              style={[
                style.textMd,
                style.textCenter,
                { fontWeight: "500", marginTop: 10 },
              ]}
            >
              Pierrot_
            </Text>
            <Text
              style={[
                style.textCenter,
                { fontSize: 13, paddingHorizontal: 20, marginBottom: 15 },
              ]}
            >
              Indie Developer 🧙‍♂️ loving to create mobile app, websites and
              software ✨
            </Text>
          </View>
          <SettingsScrollView
            items={[
              {
                label: `☕  Buy me a coffee !`,
                onPress: () => {
                  Linking.openURL("https://ko-fi.com/pierrot_");
                },
              },
              {
                label: `🍱  Check my bento !`,
                onPress: () => {
                  Linking.openURL("https://bento.me/pierrrot");
                },
              },
              {
                label: `🌳  Check my linktree !`,
                onPress: () => {
                  Linking.openURL("https://linktr.ee/pierrot_");
                },
              },
            ]}
          ></SettingsScrollView>
        </SettingsPage>
      </Modal>
    </>
  );
}
