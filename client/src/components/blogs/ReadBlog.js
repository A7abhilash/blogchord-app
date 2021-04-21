import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Subheading } from "react-native-paper";
import { globalColors, globalStyles } from "../../styles/globalStyles";

export default function ReadBlog({ route, navigation }) {
  const { blog } = route.params;

  return (
    <View style={globalStyles.component}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 5,
    backgroundColor: globalColors.Dark,
  },
});
