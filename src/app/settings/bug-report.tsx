import { TextInput, View } from "react-native";
import { style } from "../../constants/style/styles";
import SettingsPage from "../../components/features/settings/SettingsPage";
import SettingsHeader from "../../components/features/settings/SettingsHeader";
import { router } from "expo-router";
import { colors } from "../../constants/style/colors";
import StandardButton from "../../components/common/buttons/StandardButton";

export default function DonationSettings() {
  return (
    <SettingsPage
      header={
        <SettingsHeader
          title="Signaler un bug"
          onPressBack={router.back}
        ></SettingsHeader>
      }
    >
      <View
        style={[
          style.flexCol,
          style.justifyBetween,
          { flex: 1, width: "100%", paddingHorizontal: 20 },
        ]}
      >
        <TextInput
          numberOfLines={3}
          multiline
          placeholder="Une description du bug..."
          style={[
            style.border,
            {
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            },
          ]}
        ></TextInput>
        <StandardButton textStyle={{ fontSize: 15 }} bgColor={colors.primary}>
          Envoyer
        </StandardButton>
      </View>
    </SettingsPage>
  );
}
