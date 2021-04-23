import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Subheading } from "react-native-paper";
import UserProfile from "../../containers/UserProfile";
import { globalColors, globalStyles } from "../../styles/globalStyles";
import { RichEditor } from "react-native-pell-rich-editor";

export default function ReadBlog({ route, navigation }) {
  const { blog } = route.params;

  return (
    <ScrollView style={globalStyles.component}>
      <Text
        style={{
          ...globalStyles.textSubTitle,
          color: globalColors.Danger,
          textAlign: "center",
        }}
      >
        Author
      </Text>
      <UserProfile user={blog.user} navigate={navigation.navigate} />
      <Card style={styles.cardContainer}>
        <Card.Content
          style={{ backgroundColor: globalColors.Secondary, paddingTop: 5 }}
        >
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
          {/* <Text
            style={{
              color: globalColors.Light,
              marginVertical: 5,
              fontSize: 18,
            }}
          >
            {blog.body}
          </Text> */}
          <RichEditor
            editorStyle={{
              backgroundColor: globalColors.Dark,
              color: globalColors.Light,
            }}
            disabled={true}
            initialContentHTML={blog.body}
            style={{ flex: 1 }}
            scrollEnabled={true}
          />
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
