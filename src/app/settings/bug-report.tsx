import { ActivityIndicator, TextInput, View } from "react-native";
import { style } from "../../constants/style/styles";
import SettingsPage from "../../components/features/settings/SettingsPage";
import SettingsHeader from "../../components/features/settings/SettingsHeader";
import { router } from "expo-router";
import { colors } from "../../constants/style/colors";
import StandardButton from "../../components/common/buttons/StandardButton";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import useMailsender from "../../hooks/features/settings/use-mailsender";
import { useState } from "react";
import { fa } from "zod/v4/locales";

export default function DonationSettings() {
  const { send } = useMailsender();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      edges={{ top: "off", bottom: "maximum" }}
      style={{ flex: 1, backgroundColor: colors.white }}
    >
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
            { flex: 1, width: "100%", paddingHorizontal: 10 },
          ]}
        >
          <TextInput
            numberOfLines={3}
            multiline
            placeholder="Une description du bug, une suggestion, un message..."
            style={[
              style.border,
              {
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 5,
                verticalAlign: "top",
                height: 160,
              },
            ]}
            value={message}
            onChangeText={setMessage}
          ></TextInput>
        </View>
      </SettingsPage>
      <StandardButton
        textStyle={{
          fontSize: 17,
          color: colors.white,
          textAlign: "left",
          fontWeight: "600",
        }}
        bgColor={loading ? colors.gray[400] : colors.primary}
        style={{ paddingHorizontal: 20, paddingBottom: 10 }}
        appendIcon={
          loading ? (
            <ActivityIndicator color={colors.white}></ActivityIndicator>
          ) : (
            <ExpoIcon
              name="send"
              size={20}
              style={{ color: colors.white }}
            ></ExpoIcon>
          )
        }
        onPress={() => {
          if (message.length > 5) {
            setLoading(true);
            send({ message })
              .then(() => {
                setMessage("");
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }}
      >
        Envoyer
      </StandardButton>
    </SafeAreaView>
  );
}
