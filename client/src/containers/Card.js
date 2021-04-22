import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { globalColors, globalStyles } from "../styles/globalStyles";

const Card = ({
  readBlog,
  blog,
  access,
  addBookmark,
  isBookmarked,
  removeBookmark,
  likes,
  isLiked,
  likeBlog,
  dislikeBlog,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes?.length);

  // useEffect(() => {
  //   setLiked(isLiked);
  //   setLikesCount(likes.length);
  // }, [isLiked, likes.length]);

  const onLike = () => {
    // console.log("Like");
    setLiked(true);
    setLikesCount((prev) => prev + 1);
    likeBlog(blog);
  };

  const onDislike = () => {
    // console.log("Dislike");
    setLiked(false);
    setLikesCount((prev) => prev - 1);
    dislikeBlog(blog);
  };

  const handlePressMoreOptions = () => {
    Alert.alert(
      "Action",
      "Choose your action on this blog?",
      access
        ? [
            {
              text: "Cancel",
            },
            {
              text: "Edit",
            },
            {
              text: "Delete",
            },
          ]
        : [
            {
              text: "Cancel",
            },
            isBookmarked
              ? {
                  text: "UnBookmark",
                  onPress: () => removeBookmark(blog._id),
                }
              : {
                  text: "Bookmark",
                  onPress: () => addBookmark(blog._id),
                },
          ]
    );
  };

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
        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: 5,
          }}
          onPress={handlePressMoreOptions}
        >
          <Image
            source={require("./../../assets/icons/more.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 5 }}>
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.buttonContainer}>
          <Button
            color={globalColors.Success}
            onPress={() => readBlog("Read Blog", { blog })}
          >
            Read
          </Button>
          <Button
            mode={liked ? "contained" : "outlined"}
            disabled={access}
            color={globalColors.Warning}
            style={{
              marginLeft: "auto",
              marginRight: 5,
              borderColor: globalColors.Warning,
            }}
            onPress={liked ? onDislike : onLike}
          >
            {liked ? "Unlike" : "Like"} ({likesCount})
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
    alignItems: "center",
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
