import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { Dimensions } from "../utils/constant";

const Review = ({
  rating,
  remark,
  description,
  profilePicture,
  name,
  date,
}) => {
  const renderStar = () => {
    return [1, 2, 3, 4, 5].map((_, index) => {
      return (
        <Image
          key={index}
          source={
            index < rating
              ? require("../assets/icons/star.png")
              : require("../assets/icons/star_1.png")
          }
          style={styles.starIcon}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text variant="labelLarge">{remark}</Text>
        <View style={styles.starContainer}>{renderStar()}</View>
      </View>
      <Text style={styles.reviewDescription} variant="bodyMedium">
        {description}
      </Text>
      <View style={styles.userContainer}>
        <Avatar.Image size={34} source={profilePicture} />
        <View>
          <Text style={{ color: palette.grey900 }} variant="labelMedium">
            {name}
          </Text>
          <Text style={{ color: palette.grey700 }} variant="bodySmall">
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Dimensions.padding / 1.33,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewDescription: {
    color: palette.grey900,
    paddingTop: Dimensions.padding / 2,
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
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2.66,
    paddingTop: Dimensions.padding / 1.33,
  },
});

export default Review;
