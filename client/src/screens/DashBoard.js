import React from "react";
import { View, Text, Image } from "react-native";
import UserProfile from "../containers/UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { globalColors, globalStyles } from "../styles/globalStyles";

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <View style={globalStyles.component}>
      <UserProfile user={user} isProfile={true} />
    </View>
  );
};

export default DashBoard;
