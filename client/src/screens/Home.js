import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors } from "../styles/globalStyles";

const Home = () => {
  return (
    <View style={{ backgroundColor: globalColors.Dark }}>
      <Text style={{ color: globalColors.Light }}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
