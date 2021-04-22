import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useMsg } from "../contexts/MsgContext";
import { updateLikes, updateBookmark, getLoggedInUserDetails } from "../db";
import { globalStyles } from "../styles/globalStyles";
import Card from "./Card";

export default function BlogContainer({ displayBlogs, isProfile, navigation }) {
  const { user } = useAuth();
  const { setToast, setAlert } = useMsg();
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    getLoggedInUserDetails(user?._id).then((data) => {
      setSavedLists(data.savedBlogsList.blogs);
    });
  }, [setSavedLists, user?._id]);

  const addBookmark = async (blogId) => {
    if (!savedLists.includes(blogId)) {
      let updatedList = [blogId, ...savedLists];
      let res = await updateBookmark(updatedList, user?._id);
      setSavedLists(updatedList);
      setToast(res.status === 200 ? "Bookmark added ★" : res.error);
    } else setAlert("Wrong Action", "Blog is already saved", "Understood");
  };

  const removeBookmark = async (blogId) => {
    if (savedLists.includes(blogId)) {
      let updatedList = savedLists.filter(
        (savedId) => savedId.toString() !== blogId.toString()
      );
      let res = await updateBookmark(updatedList, user?._id);
      setSavedLists(updatedList);
      setAlert(res.status === 200 ? "Bookmark removed ☆" : res.error);
    } else alert("Wrong Action", "Blog wasn't saved", "Understood");
  };
  const likeBlog = async (blog) => {
    if (!blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: [...blog.likes, user._id],
      };
      let data = await updateLikes(updatedLikes, blog._id);
      if (data.error) {
        setToast(data.error);
      }
    }
  };

  const dislikeBlog = async (blog) => {
    if (blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: blog.likes.filter((id) => id !== user._id),
      };
      let data = await updateLikes(updatedLikes, blog._id);
      if (data.error) {
        setToast(data.error);
      }
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
          addBookmark={addBookmark}
          isBookmarked={savedLists.includes(item._id)}
          removeBookmark={removeBookmark}
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
