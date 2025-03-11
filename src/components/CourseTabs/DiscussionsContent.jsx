import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;

export const DiscussionsContent = () => {
  const linkIcon = require("../../assets/icons/external_link.png");
  const note =
    "You can visit the Forums page to see all the different topics and discussions that are available. From there, you can post a question, start a new discussion, or join an existing conversation.";
  return (
    <View style={styles.container}>
      <Text style={styles.noteText} variant="custom400_14">
        {note}
      </Text>
      <TouchableOpacity style={styles.linkContainer}>
        <Text style={styles.linkTextStyle} variant="custom500_14">
          Discussions
        </Text>
        <Image source={linkIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Dimensions.padding,
    rowGap: 6,
  },
  icon: { height: SIZE_20, width: SIZE_20 },
  linkContainer: {
    alignItems: JUSTIFY.FLEX_START,
    columnGap: 8,
    flexDirection: DIRECTION.ROW,
    paddingVertical: 10,
  },
  linkTextStyle: {
    color: CombinedDefaultTheme.colors.primary,
    textAlign: JUSTIFY.JUSTIFY,
  },
  noteText: {
    color: palette.grey700,
    textAlign: JUSTIFY.JUSTIFY,
  },
});
