import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NewPost from "./screens/NewPost";
import DashBoard from "./screens/DashBoard";
import Home from "./screens/Home";
import globalStyles from "./styles/globalStyles";

const AuthNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: globalStyles.bgTab,
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Text
                style={{
                  color: focused ? globalStyles.textDanger : "#748c94",
                  fontSize: 18,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={NewPost}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Text
                style={{
                  color: "#748c94",
                  fontSize: 18,
                }}
              >
                Screen2
              </Text>
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashBoard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Text
                style={{
                  color: focused ? globalStyles.textDanger : "#748c94",
                  fontSize: 18,
                }}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthNavigator;

const CustomTabButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: globalStyles.textDanger,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    // top: 5,
  },
});
