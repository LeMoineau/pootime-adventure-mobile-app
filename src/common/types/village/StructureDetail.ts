export type StructureDetailName = "pooStartingTimer";
export type StructureDetail = DateDetail | ElapsedTimeDetail | {};
export type DateDetail = string;
export type ElapsedTimeDetail = number;

export function isDateDetail(detail: StructureDetail): detail is DateDetail {
  return typeof detail === "string";
}

export function isElapsedTimeDetail(
  detail: StructureDetail
): detail is ElapsedTimeDetail {
  return typeof detail === "number";
}
