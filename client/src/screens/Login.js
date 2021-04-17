import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import globalStyles from "../styles/globalStyles";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1046350094084-h1mc7rdmoh4673m0hdf0os75n7vvv2dg.apps.googleusercontent.com",
    // expoClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      //   console.log(response);

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
      <Button
        disabled={!request}
        title="Login with Goggle"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
