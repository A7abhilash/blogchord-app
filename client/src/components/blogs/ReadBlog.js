import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Subheading } from "react-native-paper";
import UserProfile from "../../containers/UserProfile";
import { globalColors, globalStyles } from "../../styles/globalStyles";

export default function ReadBlog({ route }) {
  const { blog } = route.params;

  return (
    <ScrollView style={globalStyles.component}>
      <Text
        style={{
          ...globalStyles.textTitle,
          color: globalColors.Danger,
          textAlign: "center",
        }}
      >
        Author
      </Text>
      <UserProfile user={blog.user} />
      <Card style={styles.cardContainer}>
        <Card.Content style={{ backgroundColor: globalColors.Secondary }}>
          <Text
            style={{
              ...globalStyles.textTitle,
              color: globalColors.Warning,
              textAlign: "center",
            }}
          >
            {blog.title}
          </Text>
          <Subheading
            style={{
              color: globalColors.Light,
              marginVertical: 5,
              textAlign: "center",
            }}
          >
            {new Date(blog.createdAt).toDateString()}
          </Subheading>
        </Card.Content>
        <Card.Content>
          <Text
            style={{
              color: globalColors.Light,
              marginVertical: 5,
              fontSize: 18,
            }}
          >
            {blog.body}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: globalColors.Dark,
  },
});
