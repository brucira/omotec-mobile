import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const CommentView = () => {
  const star = 2;
  const comment =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const courseComment = true;

  const renderStar = () => {
    return [1, 2, 3, 4, 5].map((_, index) => {
      return (
        <Image
          key={index}
          source={
            index < star
              ? require("../assets/icons/star.png")
              : require("../assets/icons/star_1.png")
          }
          style={styles.starIcon}
        />
      );
    });
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: courseComment ? "column" : "column-reverse" },
      ]}
    >
      <View style={styles.header}>
        <Image source={require("../assets/male.png")} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.userRow}>
            <Text style={styles.userName} variant="titleMedium">
              Sahil Dabas
            </Text>
            {courseComment && (
              <View style={styles.starContainer}>{renderStar()}</View>
            )}
          </View>
          <Text style={styles.timeAgo} variant="bodyMedium">
            2 weeks ago
          </Text>
        </View>
      </View>
      <View style={{ paddingLeft: courseComment ? 64 : 0 }}>
        <Text style={styles.commentText} variant="bodyMedium">
          {comment}
        </Text>
      </View>
    </View>
  );
};

export default CommentView;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 88,
    height: 48,
    width: 48,
  },
  commentContainer: {
    paddingLeft: 64,
  },
  commentText: {
    color: "#101828",
  },
  container: {
    rowGap: 12,
  },
  header: {
    alignItems: "center",
    columnGap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  starContainer: {
    alignItems: "center",
    columnGap: 4,
    flexDirection: "row",
  },
  starIcon: {
    height: 16,
    width: 16,
  },
  timeAgo: {
    color: "#475467",
  },
  userName: {
    color: "#101828",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
