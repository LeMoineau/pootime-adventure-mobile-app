import useModals from "../../common/hooks/ui/use-modals";
import { EVENT_POSTERS } from "../../config/constants/event-posters";
import moment from "moment";
import { useEffect, useState } from "react";
import { EventPoster } from "../../types/event-posters/EventPoster";
import EventPosterModalMatcher from "../../components/modals/event/EventPosterModalMatcher";
import SettingsPage from "../../features/settings/components/SettingsPage";
import SettingsHeader from "../../features/settings/components/SettingsHeader";
import { SettingsScrollView } from "../../features/settings/components/SettingsScrollView";
import { router } from "expo-router";

export default function EventSettingsScreen() {
  const { isVisible, show, hide } = useModals<"posterModal">();
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
            onPressBack={router.back}
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
              setSelectedPoster({ ...p });
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
