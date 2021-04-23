import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMsg } from "../../contexts/MsgContext";
import { BACKEND_URL } from "../../db";
import { globalColors, globalStyles } from "../../styles/globalStyles";
import CustomError from "../CustomError";

export default function ProfileVisit({ route }) {
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
    <View style={globalStyles.component}>
      <Text style={{ color: globalColors.Light }}>{userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
