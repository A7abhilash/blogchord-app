import React, { useEffect, useState } from "react";
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
  navigate,
  blog,
  access,
  handleDelete,
  addBookmark,
  isBookmarked,
  removeBookmark,
  likes,
  isLiked,
  likeBlog,
  dislikeBlog,
}) => {
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  useEffect(() => {
    setLiked(isLiked);
    setLikesCount(likes.length);
  }, [isLiked, likes.length]);

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
    access &&
      Alert.alert("Action", "Choose your action on this blog?", [
        {
          text: "Cancel",
        },
        {
          text: "Edit",
          onPress: () => navigate("Edit Blog", { blog }),
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert("Delete", "Are you sure to delete this blog?", [
              {
                text: "Cancel",
              },
              {
                text: "Confirm Delete",
                onPress: () => handleDelete(blog._id, access),
              },
            ]);
          },
        },
      ]);
  };

  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          backgroundColor: access ? globalColors.Secondary : "",
          ...styles.userBar,
        }}
      >
        <TouchableOpacity
          // disabled={access}
          onPress={
            access
              ? () => navigate("Dashboard")
              : () => navigate("Profile Visit", { userId: blog.user._id })
          }
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
        </TouchableOpacity>
        {access ? (
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
        ) : (
          <TouchableOpacity
            style={{
              marginLeft: "auto",
              marginRight: 5,
            }}
            onPress={
              isBookmarked
                ? () => removeBookmark(blog._id)
                : () => addBookmark(blog._id)
            }
          >
            <Text style={{ fontSize: 28, color: globalColors.Primary }}>
              {isBookmarked ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ padding: 5 }}>
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.buttonContainer}>
          <Button
            color={globalColors.Success}
            onPress={() => navigate("Read Blog", { blog })}
          >
            Read
          </Button>
          <View
            style={{
              marginLeft: "auto",
              marginRight: 5,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={access}
              onPress={liked ? onDislike : onLike}
            >
              <Text style={{ fontSize: 20, color: globalColors.Light }}>
                {liked !== null && (liked ? "💛" : "🤍")}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 5,
                color: globalColors.Warning,
              }}
            >
              ({likesCount})
            </Text>
          </View>
        </View>
        <Text style={{ color: globalColors.Secondary, marginVertical: 5 }}>
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
