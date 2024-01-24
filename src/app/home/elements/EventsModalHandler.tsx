import { useState } from "react";
import AudreyBirthdayModal from "../../../common/components/modals/event/AudreyBirthdayModal";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";

export default function EventsModalHandler() {
  const [showEventModal, setShowEventModal] = useState(true);
  const { events, unlock } = useItemsUnlockedStore();
  return (
    <>
      {!events.includes("audreyBirthday") && (
        <AudreyBirthdayModal
          visible={showEventModal}
          onRequestClose={async () => {
            await unlock("events", "audreyBirthday");
            setShowEventModal(false);
          }}
        ></AudreyBirthdayModal>
      )}
    </>
  );
}
