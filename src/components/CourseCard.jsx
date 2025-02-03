import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import Tag from "./Tag";

const CourseCard = ({ index }) => {
  const calenderSource = require("../assets/icons/calender.png");
  const userSource = require("../assets/icons/user.png");
  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.container}
    >
      <Image source={require("../assets/dummy_1.png")} style={styles.banner} />
      <View style={styles.cardContent}>
        <Text variant="titleLarge">Mastering Python</Text>
        <Text variant="bodyMedium">Batch 1</Text>
        <View style={{ paddingVertical: Dimensions.padding / 1.33 }}>
          <View style={{ flexDirection: "row", gap: Dimensions.padding / 2 }}>
            <Tag
              backgroundColor={palette.primaryStudent50}
              iconSource={calenderSource}
              label={"May 1 - Jun 30"}
              textColor={CombinedDefaultTheme.colors.primary}
            />
            <Tag
              backgroundColor={palette.error50}
              iconSource={userSource}
              label={"John Doe"}
              textColor={palette.error600}
            />
          </View>
        </View>
        <View style={styles.upcoming}>
          <Text variant="labelMedium">Upcoming Task:</Text>
          <Image
            source={require("../assets/icons/chevron_down.png")}
            style={styles.downIcon}
          />
        </View>
        <View style={styles.progress}>
          <ProgressBar
            color={palette.success600}
            progress={11 / 12}
            style={styles.progressBar}
          />
          <Text style={styles.progressText} variant="labelSmall">
            11 /12
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    height: 157,
    padding: 0,
    resizeMode: "contain",
    width: "auto",
  },
  cardContent: {
    // flex: 1,
    padding: Dimensions.padding / 1.33,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    // flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 254,
  },
  contentStyleContainer: {
    padding: 0,
  },
  downIcon: {
    height: Dimensions.padding,
    width: Dimensions.padding,
  },
  progress: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  progressBar: {
    borderRadius: Dimensions.margin,
    height: Dimensions.margin / 2,
    width: 183,
  },
  progressText: {},
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
});

export default CourseCard;
