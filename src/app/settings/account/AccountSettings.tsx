import { Text } from "react-native";
import SettingsPage from "../elements/SettingsPage";
import SettingsHeader from "../elements/SettingsHeader";
import { SettingsScrollView } from "../elements/SettingsScrollView";
import useModals from "../../../common/hooks/use-modals";
import ConfirmModal from "../../../common/components/modals/primitives/ConfirmModal";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import useMassiveStoreLoader from "../../../common/hooks/admin/user-massive-store-loader";
import { useAuthentication } from "../../../common/hooks/firebase/use-authentification";
import { useUserDataTable } from "../../../common/hooks/firestore/use-user-data-table";

export default function AccountSettings() {
  const { isVisible, show, hide } = useModals<
    "confirm-reset" | "confirm-disconnect"
  >();
  const navigator: useNavigationType = useNavigation();
  const {
    user,
    isConnected,
    isAnonymous,
    isSynched,
    createAnonymousAccount,
    disconnect,
  } = useAuthentication();
  const { create: createUserData } = useUserDataTable();
  const { massiveStoreReset, generateUserDataFromStores } =
    useMassiveStoreLoader();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Votre compte"
            onPressBack={navigator.goBack}
          ></SettingsHeader>
        }
      >
        <SettingsScrollView
          title="Statuts"
          items={[
            {
              icon: isConnected ? "check" : "close",
              label: isConnected
                ? `Connecté ${isAnonymous ? "(Anonyme)" : ""}`
                : "Non connecté",
              subLabel: isConnected
                ? `ID: #${user?.uid}`
                : `Veuillez vérifier votre connexion internet`,
              variant: isConnected ? "success" : "error",
            },
            {
              icon: !isSynched ? "close" : "check",
              label: !isSynched ? "Compte non lié" : "Compte lié",
              subLabel: !isSynched
                ? "Veuillez créer un compte pour lier vos données"
                : "",
              variant: !isSynched ? "error" : "success",
            },
          ]}
        ></SettingsScrollView>
        <SettingsScrollView
          title="Synchronisation des données"
          items={[
            {
              icon: "google",
              label: "Lier à Google",
              disabled: true,
              hasRightArrow: true,
              onPress: () => show("confirm-disconnect"),
            },
            {
              icon: "account-circle",
              label: "Se connecter",
              hasRightArrow: true,
              onPress: () => navigator.navigate("LoginPage"),
            },
            {
              icon: "person-add-alt-1",
              label: "Se créer un compte",
              hasRightArrow: true,
              onPress: () => navigator.navigate("RegisterPage"),
            },
            {
              icon: "person-4",
              label: "Créer un compte anonyme",
              hasRightArrow: true,
              disabled: isConnected,
              onPress: () => {
                createAnonymousAccount(async (user) => {
                  await createUserData(user.uid, generateUserDataFromStores());
                });
              },
            },
            {
              icon: "cancel-presentation",
              label: "Se déconnecter",
              variant: "error",
              onPress: () => show("confirm-disconnect"),
            },
          ]}
        ></SettingsScrollView>
        <SettingsScrollView
          title="Gestion des données"
          items={[
            {
              label: "Reset",
              subLabel: "Efface toutes vos données",
              onPress: () => show("confirm-reset"),
            },
          ]}
        ></SettingsScrollView>
      </SettingsPage>
      <ConfirmModal
        visible={isVisible("confirm-reset")}
        onConfirm={async () => {
          await massiveStoreReset();
        }}
        onRequestClose={() => hide("confirm-reset")}
      >
        <Text>
          Etes-vous sûr de vouloir supprimer toutes vos données ? (Cette action
          est irréversible)
        </Text>
      </ConfirmModal>
      <ConfirmModal
        visible={isVisible("confirm-disconnect")}
        onConfirm={async () => {
          await disconnect();
          await massiveStoreReset();
        }}
        onRequestClose={() => hide("confirm-disconnect")}
      >
        <Text>
          Etes-vous sûr de vouloir vous déconnecter ? Vos données ne seront plus
          sauvegardées.
        </Text>
      </ConfirmModal>
    </>
  );
}
