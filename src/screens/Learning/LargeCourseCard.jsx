import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const LargeCourseCard = ({
  batch,
  sessions,
  tasks,
  location,
  title,
  date,
  trainer,
  subject,
  duration,
  avgPerformance,
  avgProgress,
  startDate,
  endDate,
  coverImage,
  progressNumerator,
  progressDenominator,
  learningType,
}) => {
  const calendarSource = require("../../assets/icons/calender.png");
  const userSource = require("../../assets/icons/user.png");
  const bookSource = require("../../assets/icons/book.png");
  const clockSource = require("../../assets/icons/clock_five.png");
  const calendarRangeSource = require("../../assets/icons/calendar_range.png");
  const trendSource = require("../../assets/icons/trend_up.png");

  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.container}
    >
      <Image source={coverImage} style={styles.banner} />
      <View style={styles.cardContent}>
        <Text
          style={{ marginBottom: Dimensions.margin / 4 }}
          variant="labelSmall"
        >
          {learningType === "course"
            ? `${sessions + " Session •" + " Batch " + batch + " • " + location}`
            : `${tasks + " Tasks •" + " Batch " + batch + " • " + location}`}
        </Text>
        <Text numberOfLines={2} variant="titleSmall">
          {title}
        </Text>
        <View style={{ paddingVertical: Dimensions.padding / 2 }}>
          <View style={{ flexDirection: "row", gap: Dimensions.padding / 2 }}>
            <Tag
              iconSource={
                learningType === "course" ? calendarSource : bookSource
              }
              backgroundColor={palette.primaryStudent50}
              label={learningType === "course" ? date : subject}
              textColor={CombinedDefaultTheme.colors.primary}
            />
            <Tag
              backgroundColor={palette.error50}
              iconSource={learningType === "course" ? userSource : clockSource}
              label={learningType === "course" ? trainer : duration}
              textColor={palette.error600}
            />
          </View>
        </View>
        <View style={styles.progress}>
          <ProgressBar
            color={palette.success600}
            progress={progressNumerator / progressDenominator}
            style={styles.progressBar}
          />
          <Text style={styles.progressText} variant="labelSmall">
            {progressNumerator + "/" + progressDenominator}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.singleItemContainer}>
            <Image
              source={
                learningType === "course" ? trendSource : calendarRangeSource
              }
              style={styles.endIcons}
              tintColor={palette.grey700}
            />
            <Text style={{ color: palette.grey700 }} variant="bodySmall">
              {learningType === "course" ? "Avg. Performance:" : "Start Date"}
            </Text>
            <Text style={{ color: palette.grey900 }} variant="bodySmall">
              {learningType === "course" ? avgPerformance : startDate}
            </Text>
          </View>
          <View style={styles.singleItemContainer}>
            <Image
              source={
                learningType === "course" ? trendSource : calendarRangeSource
              }
              style={styles.endIcons}
              tintColor={palette.grey700}
            />
            <Text style={{ color: palette.grey700 }} variant="bodySmall">
              {" "}
              {learningType === "course" ? "Avg. Progress:" : "End Date"}
            </Text>
            <Text style={{ color: palette.grey900 }} variant="bodySmall">
              {learningType === "course" ? avgProgress : endDate}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    height: 121,
    padding: 0,
    resizeMode: "cover",
    width: "100%",
  },
  cardContent: {
    // flex: 1,
    paddingHorizontal: Dimensions.padding / 1.14,
    paddingVertical: Dimensions.padding / 1.33,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    // flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  contentStyleContainer: {
    padding: 0,
  },
  downIcon: {
    height: Dimensions.padding,
    width: Dimensions.padding,
  },
  endIcons: {
    height: Dimensions.margin / 1.06,
    resizeMode: "contain",
    width: Dimensions.margin / 1.06,
  },
  progress: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.6,
    width: "100%",
  },
  progressBar: {
    borderRadius: Dimensions.margin,
    height: Dimensions.margin / 2,
    width: 280,
  },
  progressText: {},
  singleItemContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
});

export default LargeCourseCard;
