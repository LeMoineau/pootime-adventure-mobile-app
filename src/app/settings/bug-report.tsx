import { TextInput, View } from "react-native";
import { style } from "../../common/utils/style-utils";
import SettingsPage from "../../features/settings/components/SettingsPage";
import SettingsHeader from "../../features/settings/components/SettingsHeader";
import { router } from "expo-router";
import { colors } from "../../common/utils/color-utils";
import StandardButton from "../../components/buttons/StandardButton";

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
