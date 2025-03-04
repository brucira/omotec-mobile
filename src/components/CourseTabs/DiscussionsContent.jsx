import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { Dimensions } from "../../utils/constant";

export const DiscussionsContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noteText} variant="bodyMedium">
        You can visit the Forums page to see all the different topics and
        discussions that are available. From there, you can post a question,
        start a new discussion, or join an existing conversation.
      </Text>
      <TouchableOpacity style={styles.linkContainer}>
        <Text style={styles.linkTextStyle} variant="bodyMedium">
          Discussions
        </Text>
        <Image
          source={require("../../assets/icons/external_link.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Dimensions.padding,
    rowGap: 6,
  },
  icon: { height: 20, width: 20 },
  linkContainer: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
    paddingVertical: 10,
  },
  linkTextStyle: {
    color: "#852DCD",
    textAlign: "justify",
  },
  noteText: {
    color: "#344054",
    textAlign: "justify",
  },
});
