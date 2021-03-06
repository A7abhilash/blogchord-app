import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../styles/globalStyles";

export default function SelectOptions({
  selectOptions,
  selectedOption,
  requestRefresh,
  loading,
}) {
  const options = [
    {
      id: "all",
      title: "All",
    },
    {
      id: "public",
      title: "Public",
    },
    {
      id: "private",
      title: "Private",
    },
    {
      id: "saved",
      title: "Saved",
    },
  ];

  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10,
      }}
    >
      {options.map((option) =>
        option.id === selectedOption ? (
          <Text key={option.id} style={styles.selectedTitle}>
            {option.title}
          </Text>
        ) : (
          <TouchableOpacity
            key={option.id}
            onPress={() => selectOptions(option.id)}
          >
            <Text style={styles.unselectedTitle}>{option.title}</Text>
          </TouchableOpacity>
        )
      )}
      <TouchableOpacity disabled={loading} onPress={requestRefresh}>
        <Image
          source={require("./../../../assets/icons/refresh.png")}
          style={{
            width: 20,
            height: 20,
            resizeMode: "contain",
            tintColor: globalColors.Info,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedTitle: {
    color: globalColors.Danger,
    borderBottomColor: globalColors.Danger,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  unselectedTitle: {
    color: globalColors.Light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
