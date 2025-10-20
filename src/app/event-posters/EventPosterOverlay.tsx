import { EVENT_POSTERS } from "../../common/config/constants/event-posters";
import LatestUnseenPosterDisplayer from "./LatestUnseenPosterDisplayer";

export default function EventPosterOverlay() {
  const currentEventPoster = EVENT_POSTERS.find((p) => {
    const now = new Date();
    return p.startDate <= now && p.endDate >= now;
  });

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
