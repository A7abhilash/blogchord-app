import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  bgDark: {
    backgroundColor: "#343a40",
  },
  bgSecondary: {
    backgroundColor: "#6c757d",
  },
  bgTab: {
    backgroundColor: "#50555a8f",
  },
  textDark: {
    color: "#343a40",
  },
  textLight: {
    color: "#f8f9fa",
  },
  textDanger: {
    color: "#dc3545",
  },
  textSuccess: {
    color: "#28a745",
  },
  textWarning: {
    color: "#ffc107",
  },
  textTitle: {
    fontSize: 26,
    fontWeight: "600",
  },
  textSubTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default globalStyles;
