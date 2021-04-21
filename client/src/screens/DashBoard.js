import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { globalColors } from "../styles/globalStyles";

const DashBoard = () => {
  const { user, setIsAuthenticated } = useAuth();

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalColors.Dark,
      }}
    >
      <Text style={{ fontSize: 20, color: globalColors.Light }}>
        {user?.displayName}
      </Text>
      <Image
        source={{ uri: user?.image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginVertical: 10,
        }}
      />
      <Button title="Logout" onPress={signOut} color={globalColors.Danger} />
    </View>
  );
};

export default DashBoard;
