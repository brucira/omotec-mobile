import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const DescriptionItem = ({ title = "", description = "", iconURL = null }) => {
  return (
    <View style={styles.desItemContainer}>
      <View style={styles.firstRow}>
        {iconURL && <Image source={iconURL} style={styles.iconStyle} />}
        {title && (
          <Text style={{ color: "#101828" }} variant="titleSmall">
            {title}
          </Text>
        )}
      </View>
      {description && (
        <>
          <Divider />
          <Text style={{ color: "#667085" }} variant="titleSmall">
            {description}
          </Text>
        </>
      )}
    </View>
  );
};

export const KitContent = () => {
  const coverImage = require("../../assets/kit_cover.png");
  return (
    <View style={styles.container}>
      <Image source={coverImage} style={styles.coverImage} />
      <View style={{ rowGap: 8 }}>
        <DescriptionItem
          description="Employee guide beginner edition"
          iconURL={require("../../assets/icons/book_1.png")}
          title="Book"
        ></DescriptionItem>

        <DescriptionItem
          description="pen, worksheet"
          iconURL={require("../../assets/icons/pencil.png")}
          title="Stationary supplies"
        ></DescriptionItem>

        <DescriptionItem
          description="pen, worksheet"
          iconURL={require("../../assets/icons/pencil.png")}
          title="Stationary supplies"
        ></DescriptionItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Dimensions.padding,
    rowGap: Dimensions.margin,
  },
  coverImage: {
    borderRadius: 8,
    height: 149,
    width: "100%",
  },
  desItemContainer: {
    borderColor: palette.grey200,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    rowGap: 12,
  },
  firstRow: { alignItems: "center", columnGap: 8, flexDirection: "row" },
  iconStyle: { height: 20, width: 20 },
});
