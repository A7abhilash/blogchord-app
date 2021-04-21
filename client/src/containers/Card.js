import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { globalColors, globalStyles } from "../styles/globalStyles";

const Card = ({ blog, access }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          backgroundColor: access ? globalColors.Secondary : "",
          ...styles.userBar,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: blog.user.image }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 35,
              marginRight: 10,
              resizeMode: "contain",
            }}
          />
          <Text style={{ color: globalColors.Danger, fontSize: 16 }}>
            {blog.user.displayName}
          </Text>
        </View>
      </View>

      <View style={{ padding: 5 }}>
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.buttonContainer}>
          <Button color={globalColors.Success} onPress={""}>
            Read
          </Button>
          <Button
            mode="outlined"
            disabled={access}
            color={globalColors.Warning}
            style={{
              marginLeft: "auto",
              marginRight: 5,
              borderColor: globalColors.Warning,
            }}
            onPress={""}
          >
            Like
          </Button>
        </View>
        <Text style={{ color: globalColors.Light, marginVertical: 5 }}>
          {new Date(blog.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    backgroundColor: globalColors.Card,
    borderRadius: 15,
  },
  userBar: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: globalColors.Secondary,
    flexDirection: "row",
  },
  title: {
    ...globalStyles.textSubTitle,
    color: globalColors.Light,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
