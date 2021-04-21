import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  component: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingBottom: 70,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  textSubTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
});

const globalColors = {
  Dark: "#343a40",
  Secondary: "#6c757d",
  Tab: "#50555a",
  Card: "#50555a",
  Light: "#f8f9fa",
  Danger: "#dc3545",
  Success: "#28a745",
  Warning: "#ffc107",
};

export { globalStyles, globalColors };
