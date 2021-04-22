import React from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { updateLikes } from "../db";
import { globalStyles } from "../styles/globalStyles";
import Card from "./Card";

export default function BlogContainer({ displayBlogs, isProfile, navigation }) {
  const { user } = useAuth();

  const likeBlog = async (blog) => {
    if (!blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: [...blog.likes, user._id],
      };
      await updateLikes(updatedLikes, blog._id);
    }
  };

  const dislikeBlog = async (blog) => {
    if (blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: blog.likes.filter((id) => id !== user._id),
      };
      await updateLikes(updatedLikes, blog._id);
    }
  };

  return displayBlogs?.length ? (
    <FlatList
      data={displayBlogs}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Card
          readBlog={navigation.navigate}
          blog={item}
          access={user?._id === item.user._id}
          isProfile={false}
          likes={item.likes}
          isLiked={item.likes.includes(user?._id)}
          likeBlog={likeBlog}
          dislikeBlog={dislikeBlog}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <View style={globalStyles.container}>
      <Text style={globalStyles.textSubTitle}>No Blogs Found</Text>
    </View>
  );
}
