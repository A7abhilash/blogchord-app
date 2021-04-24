import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import CustomError from "../components/CustomError";
import { globalColors, globalStyles } from "../styles/globalStyles";
import Loading from "./../screens/Loading";
import { useMsg } from "../contexts/MsgContext";
import { BACKEND_URL } from "./../db";
import BlogContainer from "../containers/BlogContainer";

const Home = ({ navigation }) => {
  const { setToast } = useMsg();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    setError(false);
    setBlogs(null);
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
  };

  if (error) return <CustomError />;

  return (
    <View style={[globalStyles.component]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: globalColors.Light, ...globalStyles.textTitle }}>
          Recent Blogs
        </Text>
        <TouchableOpacity
          disabled={loading}
          onPress={fetchBlogs}
          style={{ marginLeft: "auto", marginRight: 5 }}
        >
          <Image
            source={require("./../../assets/icons/refresh.png")}
            style={{
              width: 25,
              height: 25,
              resizeMode: "contain",
              tintColor: globalColors.Info,
            }}
          />
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
      {blogs !== null && (
        <BlogContainer
          displayBlogs={blogs}
          navigation={navigation}
          requestRefresh={fetchBlogs}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
