import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import palette from "../styles/palette";
import { Dimensions } from "../utils/constant";

const Tag = ({ iconSource, label, backgroundColor, textColor, variant }) => {
  return (
    <View style={[styles.dateChip, { backgroundColor: backgroundColor }]}>
      {iconSource && (
        <Image
          size={14}
          source={iconSource}
          style={styles.chipIcon}
          tintColor={textColor}
        />
      )}
      <Text
        style={[{ color: textColor }]}
        variant={variant ? variant : "custom500_10"}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipIcon: {
    backgroundColor: palette.transparent,
    borderRadius: 0,
    height: 14,
    padding: 0,
    resizeMode: "contain",
    width: 14,
  },
  dateChip: {
    alignItems: "center",
    alignSelf: "baseline",
    borderRadius: Dimensions.padding,
    flexDirection: "row",
    gap: Dimensions.padding / 2.66,
    paddingHorizontal: Dimensions.padding / 1.6,
    paddingVertical: Dimensions.padding / 5.33,
  },
});

export default Tag;
