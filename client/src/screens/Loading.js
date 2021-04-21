import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "./../styles/globalStyles";

export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.textSubTitle}>Loading...</Text>
    </View>
  );
}
