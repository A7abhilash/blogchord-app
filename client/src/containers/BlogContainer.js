import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useDB } from "../contexts/DBContext";
import { useMsg } from "../contexts/MsgContext";
import { globalStyles } from "../styles/globalStyles";
import Card from "./Card";
import CardNotFound from "./CardNotFound";

export default function BlogContainer({
  displayBlogs,
  requestRefresh,
  navigation,
}) {
  const { user } = useAuth();
  const { updateLikes, updateBookmark, getLoggedInUserDetails, deleteBlog } =
    useDB();
  const { setToast, setAlert } = useMsg();
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    if (user) {
      getLoggedInUserDetails(user?._id).then((data) => {
        if (data.error) {
          setToast("Couldnt load your bookmarks!!!");
        } else {
          setSavedLists(data?.savedBlogsList?.blogs);
        }
      });
    }
  }, [setSavedLists, user?._id]);

  const addBookmark = async (blogId) => {
    if (!savedLists.includes(blogId)) {
      let updatedList = [blogId, ...savedLists];
      let res = await updateBookmark(updatedList, user?._id);
      setSavedLists(updatedList);
      if (res.error) {
        setToast(res.error);
      } else {
        setToast("Bookmark added ★");
      }
    } else setAlert("Wrong Action", "Blog is already saved", "Understood");
  };

  const removeBookmark = async (blogId) => {
    if (savedLists.includes(blogId)) {
      let updatedList = savedLists.filter(
        (savedId) => savedId.toString() !== blogId.toString()
      );
      let res = await updateBookmark(updatedList, user?._id);
      setSavedLists(updatedList);
      if (res.error) {
        setToast(res.error);
      } else {
        setToast("Bookmark removed ☆");
      }
    } else alert("Wrong Action", "Blog wasn't saved", "Understood");
  };
  const likeBlog = async (blog) => {
    if (!blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: [...blog.likes, user._id],
      };
      let res = await updateLikes(updatedLikes, blog._id);
      if (res.error) {
        setToast(res.error);
      }
    }
  };

  const dislikeBlog = async (blog) => {
    if (blog.likes.includes(user._id)) {
      let updatedLikes = {
        likes: blog.likes.filter((id) => id !== user._id),
      };
      let res = await updateLikes(updatedLikes, blog._id);
      if (res.error) {
        setToast(res.error);
      }
    }
  };

  const handleDelete = async (id, access) => {
    if (access) {
      let res = await deleteBlog(id);
      if (res.msg) {
        requestRefresh();
        setToast(res.msg);
      } else if (res.error) {
        setToast(res.error);
      }
    }
  };

  return displayBlogs?.length ? (
    <FlatList
      data={displayBlogs}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) =>
        item.status === "NotFound" ? (
          <CardNotFound
            blog={item}
            access={true}
            addBookmark={addBookmark}
            isBookmarked={savedLists?.includes(item._id)}
            removeBookmark={removeBookmark}
          />
        ) : (
          <Card
            navigate={navigation.navigate}
            blog={item}
            access={user?._id === item.user._id}
            isProfile={false}
            handleDelete={handleDelete}
            addBookmark={addBookmark}
            isBookmarked={savedLists?.includes(item._id)}
            removeBookmark={removeBookmark}
            likes={item.likes}
            isLiked={item.likes.includes(user?._id)}
            likeBlog={likeBlog}
            dislikeBlog={dislikeBlog}
          />
        )
      }
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <View style={globalStyles.container}>
      <Text style={globalStyles.textSubTitle}>No Blogs Found</Text>
    </View>
  );
}
