import { ModalProps } from "react-native";
import EventModal from "../primitives/EventModal";

export default function LouisBirthdayModal(props: ModalProps) {
  return (
    <EventModal
      {...props}
      imageUrl="https://bigstones.fr/pootime-adventure/events/louisBirthday.jpeg"
    ></EventModal>
  );
}
