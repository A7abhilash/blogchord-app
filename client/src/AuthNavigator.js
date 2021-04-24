import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NewPost from "./screens/NewPost";
import DashBoard from "./screens/DashBoard";
import Home from "./screens/Home";
import { globalColors } from "./styles/globalStyles";

const AuthNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 10,
          left: 15,
          right: 15,
          elevation: 2,
          backgroundColor: globalColors.Dark,
          borderRadius: 15,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Image
                source={require("./../assets/icons/home.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  tintColor: focused ? globalColors.Danger : globalColors.Light,
                }}
              />
              <Text
                style={{
                  color: focused ? globalColors.Danger : globalColors.Light,
                  fontSize: 15,
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
                  color: globalColors.Light,
                  fontSize: 50,
                }}
              >
                +
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
              <Image
                source={require("./../assets/icons/user.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  tintColor: focused ? globalColors.Danger : globalColors.Light,
                }}
              />
              <Text
                style={{
                  color: focused ? globalColors.Danger : globalColors.Light,
                  fontSize: 15,
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
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          backgroundColor: globalColors.Danger,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    // top: 5,
  },
});
