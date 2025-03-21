import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import Tag from "./Tag";

const CourseCard = ({ index, isLast }) => {
  const calenderSource = require("../assets/icons/calender.png");
  const userSource = require("../assets/icons/user.png");
  return (
    <Card
      style={[
        styles.container,
        { marginRight: isLast ? Dimensions.margin : 0 },
      ]}
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
    >
      <Image source={require("../assets/dummy_1.png")} style={styles.banner} />
      <View style={styles.cardContent}>
        <Text
          numberOfLines={1}
          style={{ color: palette.grey900 }}
          variant="custom600_16"
        >
          Mastering Python
        </Text>
        <Text variant="bodySmall">Batch 1</Text>
        <View style={{ paddingVertical: Dimensions.padding / 1.33 }}>
          <View style={{ flexDirection: "row", gap: Dimensions.padding / 2 }}>
            <Tag
              backgroundColor={palette.primaryStudent50}
              iconSource={calenderSource}
              label={"May 1 - Jun 30"}
              textColor={CombinedDefaultTheme.colors.primary}
              variant={"custom500_10"}
            />
            <Tag
              backgroundColor={palette.error50}
              iconSource={userSource}
              label={"John Doe"}
              textColor={palette.error600}
              variant={"custom500_10"}
            />
          </View>
        </View>
        <View style={styles.upcoming}>
          <Text
            style={{ color: palette.grey500, lineHeight: Dimensions.margin }}
            variant="labelMedium"
          >
            Upcoming Tasks:
          </Text>
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
          <Text style={styles.progressText} variant="labelMedium">
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
  progressText: {
    color: palette.grey600,
  },
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
});

export default CourseCard;
