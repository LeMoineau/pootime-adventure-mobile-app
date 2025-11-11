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
import { useEffect, useState } from "react";

export default function AccountSettings({
  route,
}: {
  route?: { params?: { updateUser: boolean } };
}) {
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
  const { update } = useUserDataTable();
  const { massiveStoreReset, generateUserDataFromStores } =
    useMassiveStoreLoader();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("update user", route?.params?.updateUser);
  }, [route?.params?.updateUser]);

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
                ? `Connecté ${
                    isAnonymous ? "(Anonyme)" : "(" + user?.email + ")"
                  }`
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
            // {
            //   icon: "google",
            //   label: "Lier à Google",
            //   disabled: true,
            //   hasRightArrow: true,
            //   onPress: () => show("confirm-disconnect"),
            // },
            {
              icon: "account-circle",
              label: "Se connecter",
              disabled: user && !user.isAnonymous,
              hasRightArrow: true,
              onPress: () => navigator.navigate("LoginPage"),
            },
            {
              icon: "person-add-alt-1",
              label: "Se créer un compte",
              disabled: user && !user.isAnonymous,
              hasRightArrow: true,
              onPress: () => navigator.navigate("RegisterPage"),
            },
            {
              icon: "person-4",
              label: "Créer un compte anonyme",
              hasRightArrow: false,
              disabled: isConnected || loading,
              onPress: () => {
                if (!loading) {
                  setLoading(true);
                  createAnonymousAccount(() => {
                    setLoading(false);
                  });
                }
              },
            },
            {
              icon: "save-alt",
              label: "Sauvegarder ses données",
              hasRightArrow: false,
              disabled: !isConnected || loading,
              onPress: () => {
                if (user && !loading) {
                  setLoading(true);
                  update(user.uid, generateUserDataFromStores()).then(() => {
                    setLoading(false);
                  });
                }
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
