import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const PopularCourseCard = ({
  index,
  coverImage,
  location,
  rating,
  title,
  session,
  duration,
  enrolls,
  isLast,
}) => {
  return (
    <Card
      style={[
        styles.container,
        { marginRight: isLast ? Dimensions.margin : 0 },
      ]}
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
    >
      <Image source={coverImage} style={styles.banner} />
      <View style={styles.cardContent}>
        <View style={styles.locationAndRating}>
          <Text style={{ color: palette.warning500 }} variant="custom500_10">
            {location}
          </Text>
          <View style={{ flexDirection: "row", gap: Dimensions.margin / 4 }}>
            <Image
              source={require("../../assets/icons/star.png")}
              style={styles.star}
            />
            <Text style={{ color: palette.grey600 }} variant="labelMedium">
              {rating}
            </Text>
          </View>
        </View>
        <Text style={{ color: palette.grey900 }} variant="custom600_14">
          {title}
        </Text>
        <View>
          <Text style={{ color: palette.grey600 }} variant="custom400_10">
            {session} Session • {duration}
          </Text>
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
          </View>
          <Text style={{ color: palette.grey700 }} variant="custom400_10">
            {" "}
            + {enrolls} Others
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: Dimensions.margin / 16,
    height: Dimensions.margin / 1.33,
    width: Dimensions.margin / 1.33,
  },
  avatarGroup: {
    flexDirection: "row",
    height: Dimensions.margin / 1.33,
  },
  avatarOverlap: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: 1,
    height: Dimensions.margin / 1.33,
    marginLeft: -Dimensions.margin / 2,
    width: Dimensions.margin / 1.33,
  },
  banner: {
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    height: 107,
    padding: 0,
    resizeMode: "contain",
    width: "auto",
  },
  calendarContentFooter: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Dimensions.padding / 4,
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
    width: 229,
  },
  contentStyleContainer: {
    padding: 0,
  },
  downIcon: {
    height: Dimensions.padding,
    width: Dimensions.padding,
  },
  locationAndRating: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progress: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  progressBar: {
    borderRadius: 16,
    height: 8,
    width: 183,
  },
  progressText: {},
  star: {
    height: Dimensions.margin / 1.14,
    width: Dimensions.margin / 1.14,
  },
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
});

export default PopularCourseCard;
