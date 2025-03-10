import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const CalendarCard = ({ item }) => {
  return (
    <View>
      <View
        style={[styles.dailyCourseCard, { backgroundColor: item.background }]}
      >
        <Image source={item.gradient} style={styles.gradient} />
        <View style={styles.dailyCourseCardContent}>
          <View>
            <Text numberOfLines={1} style={styles.title} variant="custom600_16">
              UI/UX Design Course
            </Text>
            <View style={styles.subHeading}>
              <Text style={styles.timeAndLocation} variant="bodySmall">
                2:00 - 4:00 PM
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  paddingHorizontal: Dimensions.padding / 6,
                }}
              >
                &bull;
              </Text>
              <Text style={styles.timeAndLocation} variant="bodySmall">
                Mumbai
              </Text>
            </View>
          </View>
          <View style={styles.calendarContentFooter}>
            <View style={styles.avatarGroup}>
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatarOverlap}
              />
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatarOverlap}
              />
              <Image
                source={require("../../assets/avatar.png")}
                style={styles.avatarOverlap}
              />
            </View>
            <Text
              style={{ color: palette.grey700, letterSpacing: 0 }}
              variant="bodySmall"
            >
              {" "}
              + 57 Others
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: Dimensions.margin / 16,
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
  },
  avatarGroup: {
    flexDirection: "row",
    height: Dimensions.margin * 1.5,
  },
  avatarOverlap: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: 1,
    height: Dimensions.margin * 1.5,
    marginLeft: -Dimensions.margin / 2,
    width: Dimensions.margin * 1.5,
  },
  calendarContentFooter: {
    alignItems: "center",
    flexDirection: "row",
  },
  calendarHeadingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 2,
    paddingRight: Dimensions.padding,
  },
  containerBox: {
    paddingLeft: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  contentHeadingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.14,
    paddingRight: Dimensions.padding,
  },
  dailyCalendarCardContainer: {},
  dailyCourseCard: {
    borderRadius: Dimensions.margin / 2,
    height: 122,
    marginRight: Dimensions.margin / 1.33,
    marginTop: Dimensions.padding,
    position: "relative",
    width: 204,
  },
  dailyCourseCardContent: {
    gap: Dimensions.margin * 1.5,
    padding: Dimensions.padding,
  },
  gradient: {
    height: 90,
    left: -8,
    position: "absolute",
    resizeMode: "contain",
    top: 16,
  },
  subHeading: {
    alignItems: "center",
    color: palette.grey600,
    flexDirection: "row",
  },
  timeAndLocation: {
    color: palette.grey600,
    letterSpacing: 0,
  },
  title: {
    color: palette.grey900,
  },
});

export default CalendarCard;
