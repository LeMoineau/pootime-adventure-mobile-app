import { GestureResponderEvent, Modal, ModalProps, View } from "react-native";
import SettingsPage from "../../features/settings/components/SettingsPage";
import SettingsHeader from "../../features/settings/components/SettingsHeader";
import { SettingsScrollView } from "../../features/settings/components/SettingsScrollView";
import useModals from "../../common/hooks/ui/use-modals";
import { useNavigationType } from "../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { EVENT_POSTERS } from "../../config/constants/event-posters";
import moment from "moment";
import { useEffect, useState } from "react";
import { EventPoster } from "../../common/types/event-posters/EventPoster";
import EventPosterModalMatcher from "../../common/components/modals/event/EventPosterModalMatcher";

export default function EventSettings() {
  const { isVisible, show, hide } = useModals<"posterModal">();
  const navigator: useNavigationType = useNavigation();
  const [selectedPoster, setSelectedPoster] = useState<EventPoster>();

  useEffect(() => {
    if (selectedPoster) {
      show("posterModal");
    }
  }, [selectedPoster]);

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
          items={EVENT_POSTERS.map((p) => ({
            label: p.label,
            subLabel: `du ${moment(p.startDate)
              .format("DD/MM/YY")
              .toString()} au ${moment(p.endDate)
              .format("DD/MM/YY")
              .toString()}`,
            hasRightArrow: true,
            onPress: () => {
              setSelectedPoster(p);
            },
          }))}
        ></SettingsScrollView>
      </SettingsPage>
      {selectedPoster && (
        <EventPosterModalMatcher
          eventPoster={selectedPoster}
          visible={isVisible("posterModal")}
          onRequestClose={() => {
            hide("posterModal");
          }}
        ></EventPosterModalMatcher>
      )}
    </>
  );
}
