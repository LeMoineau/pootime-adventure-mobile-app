import { Image, Text, View } from "react-native";
import { style } from "../../utils/style-utils";
import SettingsPage from "../../components/features/settings/components/SettingsPage";
import SettingsHeader from "../../components/features/settings/components/SettingsHeader";
import { SettingsScrollView } from "../../components/features/settings/components/SettingsScrollView";
import { router } from "expo-router";
import * as Linking from "expo-linking";

export default function DonationSettings() {
  return (
    <SettingsPage
      header={
        <SettingsHeader
          title="Faire un don"
          onPressBack={router.back}
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
          Un p'tit dev rigolo 🧙‍♂️ qui porte le nom d'un des éléments les plus
          commun sur Terre ✨
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
  );
}
