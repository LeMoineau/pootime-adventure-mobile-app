import { EventPoster } from "../../../types/event-posters/EventPoster";

/**
 * Les poster d'events avec leur date d'apparition.
 *
 * Attention, les mois commencent à partir de 0 (janvier = 0)
 */
export const EVENT_POSTERS: EventPoster[] = [
  {
    name: "AudreyBirthday2024",
    label: "Anniversaire Audrey 2024",
    startDate: new Date(2024, 0, 24),
    endDate: new Date(2024, 1, 24),
  },
  {
    name: "LouisBirthday2024",
    label: "Anniversaire Louis 2024",
    startDate: new Date(2024, 3, 11),
    endDate: new Date(2024, 4, 11),
  },
];
