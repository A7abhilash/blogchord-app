import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors, globalStyles } from "../../styles/globalStyles";

export default function ProfileVisit({ route }) {
  const { userId } = route.params;

  return (
    <View style={globalStyles.component}>
      <Text style={{ color: globalColors.Light }}>{userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
