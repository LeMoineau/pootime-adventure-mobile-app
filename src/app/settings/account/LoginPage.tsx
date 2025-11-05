import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import SettingsHeader from "../elements/SettingsHeader";
import SettingsPage from "../elements/SettingsPage";
import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";
import FormInputField from "../../../common/components/fields/FormInputField";
import useAccountFormValidation from "../../../common/hooks/settings/account/use-account-form-validation";
import { useUserAuth } from "../../../common/hooks/firebase/use-user-auth";
import Alert from "../../../common/components/text/Alert";
import ConfirmModal from "../../../common/components/modals/primitives/ConfirmModal";
import useModals from "../../../common/hooks/use-modals";
import useMassiveStoreLoader from "../../../common/hooks/admin/user-massive-store-loader";
import { useUserDataTable } from "../../../common/hooks/firestore/use-user-data-table";

export default function LoginPage() {
  const navigator: useNavigationType = useNavigation();
  const { isVisible, hide, show } = useModals<"confirm-login">();
  const { authError, connectWithEmailAndPassword } = useUserAuth();
  const {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
    validateEmail,
    validatePassword,
    validateSignInForm,
  } = useAccountFormValidation();
  const { fetch } = useUserDataTable();
  const { massiveLoadFromUserData } = useMassiveStoreLoader();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Se connecter"
            onPressBack={navigator.goBack}
          ></SettingsHeader>
        }
      >
        <View
          style={[
            style.flexCol,
            style.wFull,
            { flex: 1, padding: 20, paddingTop: 0 },
          ]}
        >
          {authError && authError.length > 0 && (
            <>
              <Alert content={authError} variant="error"></Alert>
              <View style={[{ height: 20 }]}></View>
            </>
          )}
          <View style={[{ height: 20 }]}></View>
          <FormInputField
            label="Adresse mail"
            textContentType="emailAddress"
            onBlur={validateEmail}
            errorText={emailError}
            onChange={setEmail}
          ></FormInputField>
          <View style={[{ height: 20 }]}></View>
          <FormInputField
            label="Mot de passe"
            textContentType="password"
            secureTextEntry
            onBlur={validatePassword}
            errorText={passwordError}
            onChange={setPassword}
          ></FormInputField>
          <View style={[{ height: 20 }]}></View>
          <StandardButton
            style={[{ flex: 1, marginTop: 15 }]}
            bgColor={colors.baseProgressColor}
            viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
            textColor={colors.white}
            textStyle={[{ fontSize: 17, fontWeight: "500" }]}
            onPress={async () => {
              if (validateSignInForm()) {
                show("confirm-login");
              }
            }}
          >
            Se connecter
          </StandardButton>
        </View>
        <ConfirmModal
          visible={isVisible("confirm-login")}
          onConfirm={async () => {
            if (validateSignInForm()) {
              await connectWithEmailAndPassword(
                email,
                password,
                async (userCredential) => {
                  const userData = await fetch(userCredential.user.uid);
                  if (userData) {
                    await massiveLoadFromUserData(userData);
                    navigator.goBack();
                  }
                }
              );
            }
          }}
          onRequestClose={() => hide("confirm-login")}
        >
          <Text style={[{ marginBottom: 10 }]}>
            Etes-vous sûr de vouloir vous connecter ?
          </Text>
          <Text style={[{ color: colors.error, marginBottom: 10 }]}>
            En vous connectant, vous allez charger les données stockées sur cet
            utilisateur et donc perdre vos données actuelles.
          </Text>
          <Text>
            Si vous voulez sauvegarder vos données actuelles, veuillez créer un
            compte pour lier ces données.
          </Text>
        </ConfirmModal>
      </SettingsPage>
    </>
  );
}
