import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import AuthNavigator from "./AuthNavigator";
import { globalColors } from "./styles/globalStyles";
import ReadBlog from "./components/blogs/ReadBlog";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfileVisit from "./components/profile/ProfileVisit";
import EditBlog from "./components/blogs/EditBlog";

export default function AppNavigator() {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) {
    return <Loading />;
  }

  const Stack = createStackNavigator();

  return (
    isAuthenticated !== null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: globalColors.Danger },
            headerTintColor: globalColors.Light,
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "500",
            },
          }}
        >
          {isAuthenticated && user ? (
            <>
              <Stack.Screen
                name="Blogchord"
                component={AuthNavigator}
                options={{
                  headerTitle: "Blogchord",
                  headerRight: () => <Logout />,
                }}
              />
              <Stack.Screen name="Read Blog" component={ReadBlog} />
              <Stack.Screen name="Edit Blog" component={EditBlog} />
              <Stack.Screen
                name="Profile Visit"
                component={ProfileVisit}
                options={{
                  headerTitle: "User",
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

const Logout = () => {
  const { setIsAuthenticated } = useAuth();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={logOut} style={{ marginRight: 10 }}>
      <Image
        source={require("./../assets/icons/logout.png")}
        style={{ width: 24, height: 24, resizeMode: "center" }}
      />
    </TouchableOpacity>
  );
};
