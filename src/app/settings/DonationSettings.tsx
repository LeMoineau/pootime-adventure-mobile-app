import { Image, Linking, Modal, ModalProps, Text, View } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import { style } from "../../common/utils/style-utils";
import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";

export default function DonationSettings() {
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Faire un don"
            onPressBack={navigator.goBack}
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
        <View style={[{ height: 20 }]}></View>
        <SettingsScrollView
          items={[
            {
              label: `☕  Buy me a coffee !`,
              hasRightArrow: true,
              onPress: () => {
                Linking.openURL("https://ko-fi.com/pierrot_");
              },
            },
            {
              label: `🍱  Check my bento !`,
              hasRightArrow: true,
              onPress: () => {
                Linking.openURL("https://bento.me/pierrrot");
              },
            },
            {
              label: `🌳  Check my linktree !`,
              hasRightArrow: true,
              onPress: () => {
                Linking.openURL("https://linktr.ee/pierrot_");
              },
            },
          ]}
        ></SettingsScrollView>
      </SettingsPage>
    </>
  );
}
