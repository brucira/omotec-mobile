import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Divider, ProgressBar, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames } from "../../utils/constant";

const CourseTabCard = ({ activeTab, title, date, trainer, learningType }) => {
  const calendarSource = require("../../assets/icons/calender.png");
  const clockSource = require("../../assets/icons/clock_five.png");
  const COURSE = "course";
  const navigation = useNavigation();
  const TAB_USER = "Users";
  const TAB_TYPE = "Users";
  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.container}
      onPress={() =>
        navigation.navigate(RouteNames.CourseDetail, {
          title,
        })
      }
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/avatar_two.png")}
          style={styles.banner}
        />
        <View style={styles.headerContentContainer}>
          <View style={styles.cardContent}>
            <Text
              numberOfLines={1}
              style={{ marginBottom: Dimensions.margin / 4 }}
              variant="labelLarge"
            >
              Magnus Carlson
            </Text>
            <Tag
              backgroundColor={palette.tintPurple}
              label={"Trainer"}
              textColor={CombinedDefaultTheme.colors.primary}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{ color: palette.grey600 }}
            variant={activeTab === TAB_USER ? "labelMedium" : "labelLarge"}
          >
            {activeTab === TAB_USER
              ? "dolores.chambers@example.com"
              : "Schedule Call"}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View
        style={[
          styles.statsContainer,
          {
            flexDirection: activeTab === TAB_USER ? "column" : "row",
            justifyContent: activeTab === TAB_USER ? null : "space-between",
          },
        ]}
      >
        <View style={styles.singleItemContainer}>
          <Image
            source={activeTab === TAB_USER ? clockSource : calendarSource}
            style={styles.endIcons}
            tintColor={palette.grey700}
          />
          <Text style={{ color: palette.grey700 }} variant="bodySmall">
            {activeTab === TAB_USER ? "Last login:" : "Start:"}
          </Text>
          <Text style={{ color: palette.grey900 }} variant="bodySmall">
            {learningType === COURSE ? date : date}
          </Text>
        </View>
        {activeTab !== TAB_USER && (
          <View style={styles.singleItemContainer}>
            <Image
              source={activeTab === TAB_USER ? clockSource : calendarSource}
              style={styles.endIcons}
              tintColor={palette.grey700}
            />
            <Text style={{ color: palette.grey700 }} variant="bodySmall">
              {activeTab === TAB_USER ? "Last login:" : "Start:"}
            </Text>
            <Text style={{ color: palette.grey900 }} variant="bodySmall">
              {learningType === COURSE ? date : date}
            </Text>
          </View>
        )}
        {activeTab === TAB_USER && (
          <View style={styles.certificate}>
            <View style={styles.singleItemContainer}>
              <Image
                source={
                  learningType === COURSE ? calendarSource : calendarSource
                }
                style={styles.endIcons}
                tintColor={palette.grey700}
              />
              <Text style={{ color: palette.grey700 }} variant="bodySmall">
                {" "}
                {learningType === COURSE ? "Enrollment date:" : "End Date"}
              </Text>
              <Text style={{ color: palette.grey900 }} variant="bodySmall">
                {learningType === COURSE ? date : date}
              </Text>
            </View>
            <View style={styles.certificateContainer}>
              <Image
                source={require("../../assets/icons/download.png")}
                style={styles.download}
              />
              <Text
                style={{ color: CombinedDefaultTheme.colors.primary }}
                variant="labelMedium"
              >
                Certificate
              </Text>
            </View>
          </View>
        )}
      </View>
      {activeTab !== TAB_USER && (
        <>
          <Divider style={styles.divider} />

          <View style={styles.certificate}>
            <View style={styles.singleItemContainer}>
              <Text style={{ color: palette.grey700 }} variant="bodySmall">
                {"Remark:"}
              </Text>
              <Text style={{ color: palette.grey900 }} variant="bodySmall">
                {trainer}
              </Text>
            </View>
            <View style={styles.certificateContainer}>
              <Image
                source={require("../../assets/icons/eye.png")}
                style={styles.download}
              />
              <Text
                style={{ color: CombinedDefaultTheme.colors.primary }}
                variant="labelMedium"
              >
                View Issue
              </Text>
            </View>
          </View>
        </>
      )}
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
    paddingHorizontal: 0,
    paddingVertical: 0,
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
    // justifyContent: "space-between",
  },
  upcoming: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.77,
  },
});

export default CourseTabCard;
