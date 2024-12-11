import { Modal, ModalProps, Text, View } from "react-native";
import SettingsPage from "../elements/SettingsPage";
import SettingsHeader from "../elements/SettingsHeader";
import { SettingsScrollView } from "../elements/SettingsScrollView";
import useModals from "../../../common/hooks/use-modals";
import ConfirmModal from "../../../common/components/modals/primitives/ConfirmModal";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import { usePooCreatureStatsStore } from "../../../common/stores/poo-creature-stats.store";
import { usePooCreatureStyleStore } from "../../../common/stores/poo-creature-style.store";
import { useResourcesStore } from "../../../common/stores/resources.store";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useVillageStore } from "../../../common/stores/village.store";
import { useFirebase } from "../../../common/stores/firebase/firebase.store";
import { useUserAuth } from "../../../common/hooks/firebase/use-user-auth";
import { useEffect, useState } from "react";
import StandardButton from "../../../common/components/buttons/StandardButton";
import { colors } from "../../../common/utils/color-utils";
import { style } from "../../../common/utils/style-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import useMassiveStoreLoader from "../../../common/hooks/admin/user-massive-store-loader";

export default function AccountSettings() {
  const { isVisible, show, hide } = useModals<
    "confirm-reset" | "confirm-disconnect"
  >();
  const navigator: useNavigationType = useNavigation();
  const { currentUser } = useFirebase();
  const { disconnect } = useUserAuth();
  const { massiveStoreReset } = useMassiveStoreLoader();

  const [connected, setConnected] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const updateStatutsIndicator = () => {
    setConnected(currentUser !== undefined && currentUser !== null);
    setIsAnonymous(!currentUser || currentUser!.isAnonymous);
  };

  useEffect(() => {
    updateStatutsIndicator();
  }, [currentUser]);

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
          actionChild={
            <StandardButton
              style={[{ width: 100, marginRight: 10 }]}
              bgColor={colors.gray[400]}
              viewStyle={[
                style.roundedSm,
                { paddingVertical: 3, paddingHorizontal: 10 },
              ]}
              prependIcon={
                <ExpoIcon
                  name="refresh"
                  style={[{ color: colors.white }]}
                ></ExpoIcon>
              }
              textColor={colors.white}
              textStyle={[{ fontSize: 12, fontWeight: "500" }]}
              onPress={async () => {
                updateStatutsIndicator();
              }}
            >
              Rafraichir
            </StandardButton>
          }
          items={[
            {
              icon: connected ? "check" : "close",
              label: connected ? "Connecté" : "Non connecté",
              subLabel: connected
                ? `ID: #${currentUser?.uid}`
                : `Veuillez vérifier votre connexion internet`,
              variant: connected ? "success" : "error",
            },
            {
              icon: isAnonymous ? "close" : "check",
              label: isAnonymous ? "Compte non lié" : "Compte lié",
              subLabel: isAnonymous
                ? "Veuillez lier votre compte pour sécuriser vos données"
                : "",
              variant: isAnonymous ? "error" : "success",
            },
          ]}
        ></SettingsScrollView>
        <SettingsScrollView
          title="Synchronisation des données"
          items={[
            // {
            //   icon: "google",
            //   label: "Lier à Google",
            //   hasRightArrow: true,
            //   onPress: () => show("confirm-disconnect"),
            // },
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
          // setConnected(false);
          // setIsAnonymous(true);
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
