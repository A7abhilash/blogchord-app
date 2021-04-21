import React from "react";
import { View, Text, Image } from "react-native";
import { globalColors, globalStyles } from "./../styles/globalStyles";

export default function CustomError() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("./../../assets/icons/error.png")}
        style={{
          width: 80,
          height: 80,
          resizeMode: "contain",
        }}
      />
      <Text
        style={[
          globalStyles.textSubTitle,
          { color: globalColors.Danger, marginVertical: 20 },
        ]}
      >
        Error
      </Text>
    </View>
  );
}
