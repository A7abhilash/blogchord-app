import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Switch, TextInput } from "react-native-paper";
import { globalColors, globalStyles } from "../styles/globalStyles";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useAuth } from "../contexts/AuthContext";
import { useMsg } from "../contexts/MsgContext";
import { useDB } from "../contexts/DBContext";

const NewPost = ({ navigation }) => {
  const { user } = useAuth();
  const { setAlert, setToast } = useMsg();
  const { BACKEND_URL, headers } = useDB();
  const [disableButtons, setDisableButtons] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const richText = useRef();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const postBlog = () => {
    if (title && body) {
      setDisableButtons(true);
      let newBlog = {
        title,
        status: isSwitchOn ? "Private" : "Public",
        body,
        likes: [user?._id.toString()],
        user: user?._id,
      };
      fetch(`${BACKEND_URL}/blogs/post`, {
        method: "POST",
        headers,
        body: JSON.stringify(newBlog),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setToast(data.error);
          } else if (data.blog) {
            setTitle("");
            setBody("");
            setIsSwitchOn(false);
            setToast(data.msg);
            data.blog.user = user;
            navigation.navigate("Read Blog", { blog: data.blog });
          }
        })
        .catch(() => {
          setToast("Server Error, Please try later!");
        })
        .finally(() => setDisableButtons(false));
    } else {
      setAlert({
        title: "Error",
        msg: "No blank fields allowed.",
        text: "Understood",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.component]}>
        <Text
          style={{
            color: globalColors.Light,
            ...globalStyles.textTitle,
            textAlign: "center",
          }}
        >
          New Blog
        </Text>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginVertical: 10, flex: 1 }}>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={{
                marginVertical: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <RichEditor
                editorStyle={{
                  backgroundColor: globalColors.Dark,
                  color: globalColors.Light,
                }}
                placeholder="Write your Blog..."
                ref={richText}
                initialContentHTML={body}
                onChange={setBody}
                style={{ flex: 1 }}
                scrollEnabled={true}
              />
              <RichToolbar
                style={{ backgroundColor: globalColors.Dark }}
                selectedIconTint={{ color: globalColors.Light }}
                selectedButtonStyle={{
                  borderColor: globalColors.Secondary,
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                }}
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.setStrikethrough,
                  actions.setUnderline,
                  actions.checkboxList,
                  actions.undo,
                  actions.redo,
                ]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: globalColors.Light,
                  ...globalStyles.textSubTitle,
                }}
              >
                Set this blog as Private?
              </Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                style={{ marginLeft: "auto", marginRight: 5 }}
                color={globalColors.Danger}
              />
            </View>
            <Button
              mode="contained"
              style={{ marginBottom: 50 }}
              color={globalColors.Success}
              onPress={postBlog}
              disabled={disableButtons}
              dark={true}
            >
              Post Blog
            </Button>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPost;

const styles = StyleSheet.create({});
