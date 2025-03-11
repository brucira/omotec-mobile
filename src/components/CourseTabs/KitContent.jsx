import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { DIRECTION, JUSTIFY, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_8 = SIZE_16 * 0.5;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;

const DescriptionItem = ({ title = "", description = "", iconURL = null }) => {
  return (
    <View style={styles.desItemContainer}>
      <View style={styles.firstRow}>
        {iconURL && <Image source={iconURL} style={styles.iconStyle} />}
        {title && (
          <Text style={styles.titleText} variant="custom500_14">
            {title}
          </Text>
        )}
      </View>
      {description && (
        <>
          <Divider />
          <Text style={styles.descriptionText} variant="custom500_14">
            {description}
          </Text>
        </>
      )}
    </View>
  );
};

export const KitContent = () => {
  const coverImage = require("../../assets/kit_cover.png");
  const descriptionItems = [
    {
      description: "Employee guide beginner edition",
      iconURL: require("../../assets/icons/book_1.png"),
      title: "Book",
    },
    {
      description: "pen, worksheet",
      iconURL: require("../../assets/icons/pencil.png"),
      title: "Stationary supplies",
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={coverImage} style={styles.coverImage} />
      <View style={styles.rowGap}>
        {descriptionItems.map((item, index) => (
          <DescriptionItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE_16,
    rowGap: SIZE_16,
  },
  coverImage: {
    borderRadius: SIZE_8,
    height: 149,
    width: SIZE.FULL,
  },
  desItemContainer: {
    borderColor: palette.grey200,
    borderRadius: SIZE_8,
    borderWidth: 1,
    padding: SIZE_12,
    rowGap: SIZE_12,
  },
  descriptionText: {
    color: palette.grey500,
  },
  firstRow: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_8,
    flexDirection: DIRECTION.ROW,
  },
  iconStyle: {
    height: SIZE_20,
    width: SIZE_20,
  },
  rowGap: {
    rowGap: SIZE_8,
  },
  titleText: {
    color: palette.grey900,
  },
});
