import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { globalColors } from "../styles/globalStyles";

export default function UserProfile({ user }) {
  const { user: currentUser } = useAuth();
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
      <View style={{ flex: 2 }}>
        <Image
          source={{ uri: user?.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}
        />
      </View>
      <View
        style={{
          flex: 6,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: globalColors.Light,
            textAlign: "center",
          }}
        >
          {user?.displayName}
        </Text>
        {currentUser?._id !== user._id && (
          <Button mode="contained" color={globalColors.Info}>
            Visit Profile
          </Button>
        )}
      </View>
    </View>
  );
}
