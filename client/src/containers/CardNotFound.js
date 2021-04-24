import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";

const CardNotFound = ({
  blog,
  access,
  addBookmark,
  removeBookmark,
  isBookmarked,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require("./../../assets/icons/not-found.png")}
        style={{
          width: 60,
          height: 60,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: globalColors.Light,
          marginVertical: 5,
        }}
      >
        {blog.body}
      </Text>
      {access && (
        <>
          <Text style={{ color: globalColors.Secondary }}>
            Remove from bookmarks?
          </Text>
          <TouchableOpacity
            onPress={
              isBookmarked
                ? () => removeBookmark(blog._id)
                : () => addBookmark(blog._id)
            }
          >
            <Image
              source={
                isBookmarked
                  ? require("./../../assets/icons/star-1.png")
                  : require("./../../assets/icons/star-2.png")
              }
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: globalColors.Primary,
              }}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default CardNotFound;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    backgroundColor: globalColors.Card,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 10,
  },
});
