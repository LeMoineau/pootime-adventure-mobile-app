import { ModalProps } from "react-native";
import EventModal from "../primitives/EventModal";

export default function AudreyBirthdayModal({ ...props }: {} & ModalProps) {
  return (
    <EventModal
      {...props}
      imageUrl="https://bigstones.fr/pootime-adventure/events/audreyBirthday.jpg"
    ></EventModal>
  );
}
