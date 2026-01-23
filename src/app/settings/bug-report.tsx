import {
  ActivityIndicator,
  Animated,
  Text,
  TextInput,
  View,
} from "react-native";
import { style } from "../../constants/style/styles";
import SettingsPage from "../../components/features/settings/SettingsPage";
import SettingsHeader from "../../components/features/settings/SettingsHeader";
import { router } from "expo-router";
import { colors } from "../../constants/style/colors";
import StandardButton from "../../components/common/buttons/StandardButton";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import useMailsender from "../../hooks/features/settings/use-mailsender";
import { useEffect, useState } from "react";
import useAnimatedValue from "../../hooks/common/ui/use-animated-value";

const ALERT_DURATION = 3000;
const ALERT_SUCCESS_MESSAGE =
  "Votre message a bien été envoyé ! Merci beaucoup pour votre retour !";
const ALERT_ERROR_MESSAGE = (err: string) =>
  `Mince ! Une erreur est survenue : "${err}". Hésitez pas à prévenir le dev directement via ses réseaux !`;

export default function DonationSettings() {
  const { send } = useMailsender();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { enable, animValue, setEnabled } = useAnimatedValue({ duration: 500 });

  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (enable) {
      setTimeout(() => {
        setEnabled(false);
      }, ALERT_DURATION);
    }
  }, [enable]);

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
            { flex: 1, width: "100%", paddingHorizontal: 10, gap: 20 },
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
          <Animated.View
            style={{
              opacity: animValue,
              backgroundColor: success ? colors.green[300] : colors.red[300],
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{}}>{alertMessage}</Text>
          </Animated.View>
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
                setAlertMessage(ALERT_SUCCESS_MESSAGE);
                setSuccess(true);
              })
              .catch((err: Error) => {
                console.error(err);
                setAlertMessage(ALERT_ERROR_MESSAGE(err.message));
                setSuccess(false);
              })
              .finally(() => {
                setLoading(false);
                setEnabled(true);
              });
          }
        }}
      >
        Envoyer
      </StandardButton>
    </SafeAreaView>
  );
}
