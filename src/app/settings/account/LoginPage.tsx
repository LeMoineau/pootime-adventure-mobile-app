import { useNavigation } from "@react-navigation/native";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import SettingsPage from "../elements/SettingsPage";
import SettingsHeader from "../elements/SettingsHeader";
import { Button, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import FormInputField from "../../../common/components/fields/FormInputField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthentication } from "../../../common/hooks/firebase/use-authentification";
import { colors } from "../../../common/utils/color-utils";

export default function LoginPage() {
  const navigator: useNavigationType = useNavigation();
  const { authError, loginWithEmailAndPassword } = useAuthentication();

  const userSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  type UserFormType = z.infer<typeof userSchema>;

  const { control, handleSubmit } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    loginWithEmailAndPassword(
      data.email,
      data.password,
      () => {
        navigator.navigate("AccountSettings", { updateUser: true });
      },
      (e) => {
        console.error(e);
      }
    );
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <SafeAreaView edges={{ top: "off" }} style={{ flex: 1 }}>
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
            style.justifyBetween,
            { flex: 1, gap: 20, paddingHorizontal: 10 },
          ]}
        >
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <FormInputField
                errorText={error?.message}
                label="Adresse mail"
                placeholder="Entrez votre adresse mail..."
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <FormInputField
                errorText={error?.message}
                label="Mot de passe"
                placeholder="Entrez votre mot de passe..."
                onBlur={onBlur}
                onChange={onChange}
                secureTextEntry
                textContentType="password"
                showVisibilityBtn
              />
            )}
            name="password"
          />
          <View style={{ height: 0 }}></View>
          <Button title="Se connecter" onPress={handleSubmit(onSubmit)} />
          {authError && (
            <Text style={[{ color: colors.error }]}>{authError}</Text>
          )}
        </View>
      </SettingsPage>
    </SafeAreaView>
  );
}
