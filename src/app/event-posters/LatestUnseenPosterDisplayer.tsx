import { useEffect, useState } from "react";
import useModals from "../../common/hooks/use-modals";
import { useItemsUnlockedStore } from "../../common/stores/items-unlocked.store";
import { EventPoster } from "../../common/types/event-posters/EventPoster";
import EventPosterModalMatcher from "../../common/components/modals/event/EventPosterModalMatcher";

/**
 * Display the latest poster only if not seen by user
 */
export default function LatestUnseenPosterDisplayer({
  latestPoster,
}: {
  latestPoster: EventPoster;
}) {
  const { isVisible, hide } = useModals<"eventPosterModal">();
  const { loading, events, unlock, isUnlocked } = useItemsUnlockedStore();
  const [posterAlreadySeen, setPosterAlreadySeen] = useState(true);

  useEffect(() => {
    if (!loading) {
      setPosterAlreadySeen(isUnlocked("events", latestPoster.name));
    }
  }, [loading, events]);

  return (
    <>
      <EventPosterModalMatcher
        eventPoster={latestPoster}
        visible={isVisible("eventPosterModal") || !posterAlreadySeen}
        onRequestClose={async () => {
          await unlock("events", latestPoster.name);
          setPosterAlreadySeen(true);
          hide("eventPosterModal");
        }}
      ></EventPosterModalMatcher>
    </>
  );
}
