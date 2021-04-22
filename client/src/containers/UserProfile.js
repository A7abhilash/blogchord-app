import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { globalColors } from "../styles/globalStyles";

export default function UserProfile({ user }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20,
        borderBottomColor: globalColors.Secondary,
        borderBottomWidth: 2,
        borderStyle: "solid",
      }}
    >
      <Image
        source={{ uri: user?.image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          color: globalColors.Light,
          marginLeft: "auto",
          marginRight: 30,
        }}
      >
        {user?.displayName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
