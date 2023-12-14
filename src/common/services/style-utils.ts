import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  itemsCenter: {
    alignItems: "center",
  },
  wFull: {
    width: "100%",
  },
  hFull: {
    height: "100%",
  },
  shadowMd: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  textSm: {
    fontSize: 12,
  },
  textMd: {
    fontSize: 20,
  },
  textLg: {
    fontSize: 25,
  },
  rounded: {
    borderRadius: 10,
  },
});
