import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import AuthNavigator from "./AuthNavigator";
import { globalColors } from "./styles/globalStyles";
import ReadBlog from "./components/blogs/ReadBlog";

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  const Stack = createStackNavigator();

  return (
    isAuthenticated !== null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: globalColors.Tab },
            headerTintColor: globalColors.Danger,
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerTitle: "Blogchord",
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Blogchord"
                component={AuthNavigator}
                // options={}
              />
              <Stack.Screen name="Read Blog" component={ReadBlog} />
              {/* 
                <Stack.Screen 
                  name="Edit Blog"
                  component={EditBlog}
                />
              */}
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
