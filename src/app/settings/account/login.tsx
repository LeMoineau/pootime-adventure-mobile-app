import { Button, Text, View } from "react-native";
import { style } from "../../../utils/style-utils";
import FormInputField from "../../../components/common/fields/FormInputField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthentication } from "../../../hooks/common/firebase/use-authentification";
import { colors } from "../../../utils/color-utils";
import SettingsPage from "../../../components/features/settings/components/SettingsPage";
import SettingsHeader from "../../../components/features/settings/components/SettingsHeader";
import { router } from "expo-router";

export default function LoginPage() {
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
        router.dismissTo({
          pathname: "/settings/account",
          params: { updateUser: "true" },
        });
      },
      (e) => {
        console.error(e);
      },
    );
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <SafeAreaView edges={{ top: "off" }} style={{ flex: 1 }}>
      <SettingsPage
        header={
          <SettingsHeader
            title="Se connecter"
            onPressBack={router.back}
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
              field: { onChange, onBlur },
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
              field: { onChange, onBlur },
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
