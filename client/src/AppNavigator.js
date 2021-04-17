import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import AuthNavigator from "./AuthNavigator";

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  const Stack = createStackNavigator();

  return (
    isAuthenticated !== null && (
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen name="Blogchord" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
