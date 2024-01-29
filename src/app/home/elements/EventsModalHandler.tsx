import AudreyBirthdayModal from "../../../common/components/modals/event/AudreyBirthdayModal";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import useModals from "../../../common/hooks/use-modals";

export default function EventsModalHandler() {
  const { isVisible, hide } = useModals<"audreyBirthday">();
  const { unlock, isUnlocked } = useItemsUnlockedStore();
  return (
    <>
      {!isUnlocked("events", "audreyBirthday") && (
        <AudreyBirthdayModal
          visible={
            isVisible("audreyBirthday") ||
            !isUnlocked("events", "audreyBirthday")
          }
          onRequestClose={async () => {
            await unlock("events", "audreyBirthday");
            hide("audreyBirthday");
          }}
        ></AudreyBirthdayModal>
      )}
    </>
  );
}
