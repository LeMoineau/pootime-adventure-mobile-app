import { EVENT_POSTERS } from "../../common/config/constants/event-posters";
import EventPosterMatcher from "../../common/components/modals/event/EventPosterModalMatcher";
import LatestUnseenPosterDisplayer from "./LatestUnseenPosterDisplayer";

export default function EventPosterOverlay() {
  const currentEventPoster = EVENT_POSTERS.find((p) => {
    const now = new Date();
    return p.startDate <= now && p.endDate >= now;
  });

  console.log(currentEventPoster);

  return (
    <>
      {currentEventPoster && (
        <LatestUnseenPosterDisplayer
          latestPoster={currentEventPoster}
        ></LatestUnseenPosterDisplayer>
      )}
    </>
  );
}
