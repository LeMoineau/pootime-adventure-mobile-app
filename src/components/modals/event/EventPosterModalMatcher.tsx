import { EventPoster } from "../../../types/event-posters/EventPoster";
import AudreyBirthdayModal from "./AudreyBirthdayModal";
import LouisBirthdayModal from "./LouisBirthdayModal";
import { ModalProps } from "react-native";

export default function EventPosterModalMatcher({
  eventPoster,
  ...props
}: {
  eventPoster: EventPoster;
} & ModalProps) {
  const matcher: { [key: string]: (p: any) => React.ReactNode } = {
    AudreyBirthday2024: (p: any) => (
      <AudreyBirthdayModal {...p}></AudreyBirthdayModal>
    ),
    LouisBirthday2024: (p: any) => (
      <LouisBirthdayModal {...p}></LouisBirthdayModal>
    ),
  };

  return matcher[eventPoster.name](props);
}
