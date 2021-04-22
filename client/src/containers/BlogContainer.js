import React from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { globalStyles } from "../styles/globalStyles";
import Card from "./Card";

export default function BlogContainer({ displayBlogs, isProfile, navigation }) {
  const { user } = useAuth();

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
