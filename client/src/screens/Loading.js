import React from "react";
import { View, ActivityIndicator } from "react-native";
import { globalColors, globalStyles } from "./../styles/globalStyles";

export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator
        animating={true}
        color={globalColors.Danger}
        size={30}
      />
    </View>
  );
}
