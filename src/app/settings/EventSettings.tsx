import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import SettingsPage from "./elements/SettingsPage";
import SettingsHeader from "./elements/SettingsHeader";
import { SettingsScrollView } from "./elements/SettingsScrollView";
import useModals from "../../common/hooks/use-modals";
import AudreyBirthdayModal from "../../common/components/modals/event/AudreyBirthdayModal";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

export default function EventSettings() {
  const { isVisible, show, hide } = useModals<"audreyBirthday">();
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
          ]}
        ></SettingsScrollView>
      </SettingsPage>
      <AudreyBirthdayModal
        visible={isVisible("audreyBirthday")}
        onRequestClose={() => {
          hide("audreyBirthday");
        }}
      ></AudreyBirthdayModal>
    </>
  );
}
