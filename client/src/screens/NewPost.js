import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors } from "../styles/globalStyles";

const NewPost = () => {
  return (
    <View style={{ backgroundColor: globalColors.Dark }}>
      <Text style={{ color: globalColors.Light }}>New Post</Text>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({});
