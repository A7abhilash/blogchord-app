import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomError from "../components/CustomError";
import { globalColors, globalStyles } from "../styles/globalStyles";
import Loading from "./../screens/Loading";
import { useMsg } from "../contexts/MsgContext";
import { BACKEND_URL } from "./../db";
import BlogContainer from "../containers/BlogContainer";

const Home = () => {
  const { setToast } = useMsg();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${BACKEND_URL}/blogs/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(true);
          setToast(data.error);
        } else {
          setBlogs(data);
        }
      })
      .catch((err) => {
        setError(true);
        setToast("Server Error, Please Try Later");
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) return <CustomError />;

  return (
    <View style={[globalStyles.component]}>
      {loading && <Loading />}
      <Text style={{ color: globalColors.Light, ...globalStyles.textTitle }}>
        Recent Blogs
      </Text>
      {blogs !== null && <BlogContainer displayBlogs={blogs} />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
