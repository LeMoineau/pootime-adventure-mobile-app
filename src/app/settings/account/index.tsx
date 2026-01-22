import { Text } from "react-native";
import useModals from "../../../hooks/common/ui/use-modals";
import useMassiveStoreLoader from "../../../hooks/common/admin/user-massive-store-loader";
import { useAuthentication } from "../../../hooks/common/firebase/use-authentification";
import { useUserDataTable } from "../../../hooks/common/firestore/use-user-data-table";
import { useEffect, useState } from "react";
import SettingsPage from "../../../components/features/settings/SettingsPage";
import SettingsHeader from "../../../components/features/settings/SettingsHeader";
import { SettingsScrollView } from "../../../components/features/settings/SettingsScrollView";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomConfirmModal from "../../../components/common/modals/primitives/CustomConfirmModal";

export default function AccountSettings() {
  const { isVisible, show, hide } = useModals<
    "confirm-reset" | "confirm-disconnect"
  >();
  const router = useRouter();
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

  const { updateUser } = useLocalSearchParams<{ updateUser: string }>();

  useEffect(() => {
    console.log("update user", updateUser);
  }, [updateUser]);

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Votre compte"
            onPressBack={router.back}
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
              onPress: () => router.push("/settings/account/login"),
            },
            {
              icon: "person-add-alt-1",
              label: "Se créer un compte",
              disabled: user && !user.isAnonymous,
              hasRightArrow: true,
              onPress: () => router.push("/settings/account/register"),
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
      <CustomConfirmModal
        visible={isVisible("confirm-reset")}
        title="Suppresion des données"
        desc="Êtes-vous sûr de vouloir supprimer toutes vos données ? (Cette action est irréversible)"
        containerStyle={{ gap: 20 }}
        onConfirmBtnPress={() => {
          massiveStoreReset();
        }}
        onRequestClose={() => hide("confirm-reset")}
      ></CustomConfirmModal>
      <CustomConfirmModal
        visible={isVisible("confirm-disconnect")}
        title="Déconnexion"
        desc="Êtes-vous sûr de vouloir vous déconnecter ? (Vos données ne seront plus sauvegardées)"
        containerStyle={{ gap: 20 }}
        onConfirmBtnPress={() => {
          massiveStoreReset();
        }}
        onRequestClose={() => hide("confirm-disconnect")}
      ></CustomConfirmModal>
    </>
  );
}
