import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import SelectOptions from "../components/dashboard/SelectOptions";
import BlogContainer from "../containers/BlogContainer";
import UserProfile from "../containers/UserProfile";
import Loading from "../screens/Loading";
import { useAuth } from "../contexts/AuthContext";
import { getLoggedInUserDetails } from "../db";
import { globalColors, globalStyles } from "../styles/globalStyles";
import { useMsg } from "../contexts/MsgContext";

const DashBoard = ({ navigation }) => {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [loading, setLoading] = useState(true);
  const [allBlogs, setAllBlogs] = useState(null);
  const [selectedOption, setSelectedOption] = useState("all");
  const [displayBlogs, setDisplayBlogs] = useState(null);
  const [savedBlogs, setSavedBlogs] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const fetchBlogs = () => {
    setLoading(true);
    setDisplayBlogs(null);
    getLoggedInUserDetails(user._id)
      .then((data) => {
        if (data.error) {
          setToast(data.error);
        } else if (data.blogs) {
          setAllBlogs(data.blogs);
          setDisplayBlogs(data.blogs);
          setSavedBlogs(data.savedBlogs);
        }
      })
      .finally(() => setLoading(false));
  };

  const setSelection = (id) => {
    setSelectedOption(id);

    switch (id) {
      case "all":
        return setDisplayBlogs(allBlogs);
      case "public":
        return setDisplayBlogs(
          allBlogs.filter((blog) => blog.status === "Public")
        );
      case "private":
        return setDisplayBlogs(
          allBlogs.filter((blog) => blog.status === "Private")
        );
      case "saved":
      default:
        return setDisplayBlogs(savedBlogs);
    }
  };

  return (
    <View style={globalStyles.component}>
      <UserProfile user={user} isProfile={true} />
      <SelectOptions
        selectedOption={selectedOption}
        selectOptions={setSelection}
        requestRefresh={fetchBlogs}
        loading={loading}
      />
      {loading && <Loading />}
      {displayBlogs && (
        <BlogContainer
          navigation={navigation}
          requestRefresh={fetchBlogs}
          displayBlogs={displayBlogs}
          isProfile={true}
        />
      )}
    </View>
  );
};

export default DashBoard;
