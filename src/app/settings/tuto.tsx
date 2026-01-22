import { Text } from "react-native";
import { style } from "../../utils/style-utils";
import PooUltiIcon from "../../components/common/icons/pooUlti";
import SettingsPage from "../../features/settings/components/SettingsPage";
import SettingsHeader from "../../features/settings/components/SettingsHeader";
import { router } from "expo-router";

export default function TutoSettings() {
  return (
    <SettingsPage
      header={
        <SettingsHeader
          title="Tutoriel"
          onPressBack={router.back}
        ></SettingsHeader>
      }
    >
      <PooUltiIcon style={[{ marginTop: 20 }]}></PooUltiIcon>
      <Text style={[style.textLg, style.textBold, { marginTop: 0 }]}>
        Coming soon...
      </Text>
    </SettingsPage>
  );
}
