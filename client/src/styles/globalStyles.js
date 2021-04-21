import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
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

const globalColors = {
  Dark: "#343a40",
  Secondary: "#6c757d",
  Tab: "#50555a",
  Light: "#f8f9fa",
  Danger: "#dc3545",
  Success: "#28a745",
  Warning: "#ffc107",
};

export { globalStyles, globalColors };
