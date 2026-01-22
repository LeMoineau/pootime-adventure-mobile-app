import { useEffect, useState } from "react";
import useModals from "../../common/hooks/ui/use-modals";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import EventPosterModalMatcher from "../modals/event/EventPosterModalMatcher";
import { EVENT_POSTERS } from "../../config/constants/event-posters";

export default function EventPosterOverlay() {
  const { isVisible, hide } = useModals<"eventPosterModal">();
  const { loading, events, unlock, isUnlocked } = useItemsUnlockedStore();
  const [posterAlreadySeen, setPosterAlreadySeen] = useState(true);
  const currentEventPoster = EVENT_POSTERS.find((p) => {
    const now = new Date();
    return p.startDate <= now && p.endDate >= now;
  });

  useEffect(() => {
    if (!loading && currentEventPoster) {
      setPosterAlreadySeen(isUnlocked("events", currentEventPoster.name));
    }
  }, [loading, events]);

  return (
    <>
      {currentEventPoster && (
        <EventPosterModalMatcher
          eventPoster={currentEventPoster}
          visible={isVisible("eventPosterModal") || !posterAlreadySeen}
          onRequestClose={async () => {
            await unlock("events", currentEventPoster.name);
            setPosterAlreadySeen(true);
            hide("eventPosterModal");
          }}
        ></EventPosterModalMatcher>
      )}
    </>
  );
}
