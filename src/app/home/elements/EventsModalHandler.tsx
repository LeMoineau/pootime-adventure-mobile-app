import AudreyBirthdayModal from "../../../common/components/modals/event/AudreyBirthdayModal";
import { useItemsUnlockedStore } from "../../../common/stores/items-unlocked.store";
import useModals from "../../../common/hooks/use-modals";
import LouisBirthdayModal from "../../../common/components/modals/event/LouisBirthdayModal";

export default function EventsModalHandler() {
  const { isVisible, hide } = useModals<"audreyBirthday" | "louisBirthday">();
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
      {!isUnlocked("events", "louisBirthday") && (
        <LouisBirthdayModal
          visible={
            isVisible("louisBirthday") || !isUnlocked("events", "louisBirthday")
          }
          onRequestClose={async () => {
            await unlock("events", "louisBirthday");
            hide("louisBirthday");
          }}
        ></LouisBirthdayModal>
      )}
    </>
  );
}
