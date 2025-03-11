import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const UserCard = ({
  avatar,
  certificatePresent,
  email,
  enrollmentDate,
  id,
  lastLogin,
  position,
  title,
}) => {
  const calendarSource = require("../../assets/icons/calender.png");
  const clockSource = require("../../assets/icons/clock_five.png");
  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.container}
      // onPress={() =>
      //   navigation.navigate(RouteNames.ProjectDetail, {
      //     title,
      //   })
      // }
    >
      <View style={styles.headerContainer}>
        <Image source={avatar} style={styles.banner} />
        <View style={styles.headerContentContainer}>
          <View style={styles.cardContent}>
            <Text
              numberOfLines={1}
              style={styles.userTitle}
              variant="labelLarge"
            >
              {title}
            </Text>
            <Tag
              backgroundColor={palette.tintPurple}
              label={"Trainer"}
              textColor={CombinedDefaultTheme.colors.primary}
              variant={"labelMedium"}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{ color: palette.grey600 }}
            variant={"bodySmall"}
          >
            {email}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.statsContainer}>
        <View style={styles.singleItemContainer}>
          <Image
            source={clockSource}
            style={styles.endIcons}
            tintColor={palette.grey700}
          />
          <Text style={{ color: palette.grey700 }} variant="custom400_12">
            {"Last login:"}
          </Text>
          <Text
            style={{ color: palette.grey900, lineHeight: Dimensions.margin }}
            variant="custom500_12"
          >
            {lastLogin}
          </Text>
        </View>

        <View style={styles.certificate}>
          <View style={styles.singleItemContainer}>
            <Image
              source={calendarSource}
              style={styles.endIcons}
              tintColor={palette.grey700}
            />
            <Text style={{ color: palette.grey700 }} variant="bodySmall">
              {" "}
              {"Enrollment date:"}
            </Text>
            <Text style={{ color: palette.grey900 }} variant="labelMedium">
              {enrollmentDate}
            </Text>
          </View>
          {certificatePresent && (
            <View style={styles.certificateContainer}>
              <Image
                source={require("../../assets/icons/download.png")}
                style={styles.download}
              />
              <Text
                style={{
                  color: CombinedDefaultTheme.colors.primary,
                  lineHeight: Dimensions.margin,
                }}
                variant="custom500_12"
              >
                Certificate
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: Dimensions.margin * 2.75,
    padding: 0,
    resizeMode: "cover",
    width: Dimensions.margin * 2.75,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  certificate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  certificateContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2.66,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 1.33,
    paddingBottom: Dimensions.margin / 1.33,
    paddingHorizontal: 0,
  },
  contentStyleContainer: {
    padding: Dimensions.padding,
  },
  divider: {
    marginVertical: Dimensions.margin / 1.33,
  },
  downIcon: {
    height: Dimensions.padding,
    width: Dimensions.padding,
  },
  download: {
    height: Dimensions.margin,
    resizeMode: "contain",
    width: Dimensions.margin,
  },
  endIcons: {
    height: Dimensions.margin / 1.06,
    resizeMode: "contain",
    width: Dimensions.margin / 1.06,
  },

  headerContainer: {
    flexDirection: "row",
  },
  headerContentContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: Dimensions.padding / 1.14,
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
    maxWidth: 221,
  },
  statsContainer: {
    flexDirection: "column",
    gap: Dimensions.margin / 2,
    justifyContent: null,
    // justifyContent: "space-between",
  },
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
  userTitle: {
    color: palette.grey900,
    marginBottom: Dimensions.margin / 4,
    maxWidth: "70%",
  },
});

export default UserCard;
