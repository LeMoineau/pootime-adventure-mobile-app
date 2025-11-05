import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useFirebase } from "../../../common/stores/firebase/firebase.store";
import SettingsPage from "../elements/SettingsPage";
import SettingsHeader from "../elements/SettingsHeader";
import { SettingsScrollView } from "../elements/SettingsScrollView";
import { Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import InputField from "../../../common/components/fields/InputField";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";
import useAccountFormValidation from "../../../common/hooks/settings/account/use-account-form-validation";
import FormInputField from "../../../common/components/fields/FormInputField";
import { useUserAuth } from "../../../common/hooks/firebase/use-user-auth";
import Alert from "../../../common/components/text/Alert";

export default function RegisterPage() {
  const navigator: useNavigationType = useNavigation();
  const { authError, createAccountWithEmailAndPassword } = useUserAuth();
  const {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmail,
    setPassword,
    setConfirmPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateRegisterForm,
  } = useAccountFormValidation();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Créer un compte"
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
          <FormInputField
            label="Confirmer mot de passe"
            textContentType="password"
            secureTextEntry
            onBlur={validateConfirmPassword}
            errorText={confirmPasswordError}
            onChange={setConfirmPassword}
          ></FormInputField>
          <View style={[{ height: 20 }]}></View>
          <StandardButton
            style={[{ flex: 1, marginTop: 15 }]}
            bgColor={colors.baseProgressColor}
            viewStyle={[style.roundedFull, { paddingVertical: 15 }]}
            textColor={colors.white}
            textStyle={[{ fontSize: 17, fontWeight: "500" }]}
            onPress={async () => {
              if (validateRegisterForm()) {
                await createAccountWithEmailAndPassword(email, password, () => {
                  navigator.goBack();
                });
              }
            }}
          >
            Créer son compte
          </StandardButton>
        </View>
      </SettingsPage>
    </>
  );
}
