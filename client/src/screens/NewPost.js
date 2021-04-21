import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";

const NewPost = () => {
  return (
    <View style={[globalStyles.component]}>
      <Text style={{ color: globalColors.Light, ...globalStyles.textTitle }}>
        New Post
      </Text>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({});
