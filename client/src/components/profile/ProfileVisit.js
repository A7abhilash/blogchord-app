import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BlogContainer from "../../containers/BlogContainer";
import UserProfile from "../../containers/UserProfile";
import { useMsg } from "../../contexts/MsgContext";
import { BACKEND_URL } from "../../db";
import { globalColors, globalStyles } from "../../styles/globalStyles";
import CustomError from "../CustomError";
import Loading from "./../../screens/Loading";

export default function ProfileVisit({ route, navigation }) {
  const { userId } = route.params;
  const { setToast } = useMsg();
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(false);
      fetch(`${BACKEND_URL}/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.user) {
            setProfile(data.user);
            setBlogs(data.blogs);
          } else if (data.error) {
            setError(true);
            setToast(data.error);
          }
        })
        .catch((err) => {
          // console.log(err);
          setToast("Server error, Please try later");
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (error) return <CustomError />;

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      {loading && <Loading />}
      {profile && <UserProfile user={profile} isProfile={true} />}
      {blogs !== null && (
        <>
          <Text
            style={{
              color: globalColors.Light,
              ...globalStyles.textTitle,
              marginTop: 10,
            }}
          >
            Blogs
          </Text>
          <BlogContainer displayBlogs={blogs} navigation={navigation} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
