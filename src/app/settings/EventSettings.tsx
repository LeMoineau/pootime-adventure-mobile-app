import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import useModals from "../../common/hooks/use-modals";
import AudreyBirthdayModal from "../../common/components/modals/event/AudreyBirthdayModal";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import LouisBirthdayModal from "../../common/components/modals/event/LouisBirthdayModal";

export default function EventSettings() {
  const { isVisible, show, hide } = useModals<
    "audreyBirthday" | "louisBirthday"
  >();
  const navigator: useNavigationType = useNavigation();

  return (
    <>
      <SettingsPage
        header={
          <SettingsHeader
            title="Evenements"
            onPressBack={navigator.goBack}
          ></SettingsHeader>
        }
      >
        <SettingsScrollView
          items={[
            {
              label: "Anniversaire Audrey",
              subLabel: "le 24/01/24",
              hasRightArrow: true,
              onPress: () => {
                show("audreyBirthday");
              },
            },
            {
              label: "Anniversaire Louis",
              subLabel: "le 11/04/24",
              hasRightArrow: true,
              onPress: () => {
                show("louisBirthday");
              },
            },
          ]}
        ></SettingsScrollView>
      </SettingsPage>
      <AudreyBirthdayModal
        visible={isVisible("audreyBirthday")}
        onRequestClose={() => {
          hide("audreyBirthday");
        }}
      ></AudreyBirthdayModal>
      <LouisBirthdayModal
        visible={isVisible("louisBirthday")}
        onRequestClose={() => {
          hide("louisBirthday");
        }}
      ></LouisBirthdayModal>
    </>
  );
}
