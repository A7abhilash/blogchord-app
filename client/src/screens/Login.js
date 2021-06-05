import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import { globalColors, globalStyles } from "../styles/globalStyles";
import config from "../config";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: config.expoClientId,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // console.log(response);

      try {
        AsyncStorage.setItem("accessToken", authentication.accessToken).then(
          () => {
            setIsAuthenticated(true);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [response]);

  return (
    <View style={globalStyles.container}>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Image
          source={require("./../../assets/icons/icon.png")}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            color: globalColors.Danger,
            textAlign: "center",
          }}
        >
          Blogchord
        </Text>
      </View>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
