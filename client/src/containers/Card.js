import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";

const Card = ({ blog }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{blog.title}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: globalColors.Card,
  },
  title: {
    ...globalStyles.textSubTitle,
    color: globalColors.Danger,
  },
});
