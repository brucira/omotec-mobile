import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../styles/constStyle";
import palette from "../styles/palette";
import { Dimensions } from "../utils/constant";
import CustomMenu from "./CustomMenu";

const SIZE_16 = Dimensions.margin;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const MenuItemHanler = (item, index) => {
  return (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={item?.onItemPress}
    >
      <Image source={item.imageurl} style={styles.menuImage} />
      <Text style={{ flex: 1 }} variant="titleSmall">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const CourseTitle = ({
  title = "What is Employee Training ?",
  subTitle = "John Doe",
}) => {
  const moreIcon = require("../assets/icons/more_vertical.png");
  const menuItem = [
    {
      imageurl: require("../assets/icons/star_1.png"),
      onItemPress: () => console.log("Leave a rating"),
      title: "Leave a rating",
    },
    {
      imageurl: require("../assets/icons/share.png"),
      onItemPress: () => console.log("Share"),
      title: "Share",
    },
  ];

  return (
    <View style={styles.courseHeaderContainer}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title} variant="custom600_16">
          {title}
        </Text>
        <CustomMenu
          anchor={<Image source={moreIcon} style={styles.moreVerticalIcon} />}
        >
          {menuItem?.map(MenuItemHanler)}
        </CustomMenu>
      </View>
      <Text numberOfLines={2} style={styles.description} variant={"bodySmall"}>
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  courseHeaderContainer: {
    paddingHorizontal: SIZE_16,
    paddingTop: SIZE_16 / 2,
    rowGap: 2,
  },
  description: {
    color: palette.grey600,
  },
  menuImage: {
    height: SIZE_20,
    width: SIZE_20,
  },
  menuItem: {
    columnGap: SIZE_12,
    flexDirection: DIRECTION.ROW,
    paddingHorizontal: SIZE_16,
    paddingVertical: 8,
  },
  moreVerticalIcon: {
    height: SIZE_24,
    width: SIZE_24,
  },
  title: {
    color: palette.grey900,
  },
  titleContainer: {
    alignItems: JUSTIFY.CENTER,
    flexDirection: DIRECTION.ROW,
    justifyContent: JUSTIFY.SPACE_BETWEEN,
  },
});

export default CourseTitle;
