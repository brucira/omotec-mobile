import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import ListAccordion from "../../components/ListAccordion";
import { RESIZE_MODE, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  ACCORDIOM_ITEM_ICON,
  ACCORDIOM_ITEM_TYPE,
  Dimensions,
  RouteNames,
} from "../../utils/constant";

const CourseDetail = () => {
  const bannerImage = require("../../assets/course_details_banner.png");
  const checkCircle = require("../../assets/icons/check_circle.png");
  const statusCircle = require("../../assets/icons/status.png");
  const backIcon = require("../../assets/icons/chevron_left.png");
  const statusPurpleCircle = require("../../assets/icons/status_purple.png");
  const navigation = useNavigation();

  const navigationHandler = (type) => {
    navigation.navigate(RouteNames.CoursePreview, { type: type || null });
  };

  const SessionItems1 = {
    description: "1/4 | 28min",
    items: [
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.text,
        leftIcon: checkCircle,
        text: "5 Min",
        title: "Welcome to Employee Training 101",
        type: ACCORDIOM_ITEM_TYPE.OVERVIEW,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.video,
        leftIcon: statusPurpleCircle,
        selected: true,
        showResource: true,
        text: "5 Min",
        title: "Welcome to Employee Training?",
        type: ACCORDIOM_ITEM_TYPE.VIDEO,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.video,
        leftIcon: statusCircle,
        text: "5 Min",
        title: "Course Video",
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.reading,
        leftIcon: statusCircle,
        text: "Reading",
        title: "Reading PDF",
        type: ACCORDIOM_ITEM_TYPE.READING,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.weblink,
        leftIcon: statusCircle,
        text: "Web link",
        title: "How to Set Up an Employee Training Plan",
        type: ACCORDIOM_ITEM_TYPE.WEBLINK,
      },
    ],
    title: "Session 1",
  };

  const SessionItems2 = {
    description: "1/4 | 28min",
    items: [
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.video,
        leftIcon: statusCircle,
        text: "6 Min",
        title: "What is Employee Training?",
        type: ACCORDIOM_ITEM_TYPE.VIDEO,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.test,
        leftIcon: statusCircle,
        text: "15 Min",
        title: "Test",
        type: ACCORDIOM_ITEM_TYPE.TEST,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.assignment,
        leftIcon: statusCircle,
        text: "45 Min",
        title: "Assignment",
        type: ACCORDIOM_ITEM_TYPE.ASSIGNMENT,
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.weblink,
        leftIcon: statusCircle,
        text: "45 Min",
        title: "About the Critique Framework",
        type: ACCORDIOM_ITEM_TYPE.WEBLINK,
      },
    ],
    title: "Session 2",
  };

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Action
          icon={backIcon}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
      </Appbar>
      <Image source={bannerImage} style={styles.bannerImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.coursetitleContainer}>
          <Text style={styles.titleText}>Your Creative peak</Text>
          <Text style={styles.subText} variant="bodySmall">
            8 Sessions
            <Text style={styles.spanDot} variant="labelMedium">
              &nbsp;•&nbsp;
            </Text>
            30 mins of video left
            <Text style={styles.spanDot} variant="labelMedium">
              &nbsp;•&nbsp;
            </Text>
            40 mins of reading left
          </Text>
        </View>
        <ScrollView style={styles.sessionsContainer}>
          <ListAccordion
            listData={SessionItems1}
            onItemPress={navigationHandler}
          ></ListAccordion>
          <ListAccordion
            listData={SessionItems2}
            onItemPress={navigationHandler}
          ></ListAccordion>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: RESIZE_MODE.CONTAIN,
    width: Dimensions.margin * 1.25,
  },
  bannerImage: {
    height: Dimensions.margin * 9.125,
    marginBottom: Dimensions.margin * 1.5,
    width: SIZE.FULL,
  },
  container: {
    backgroundColor: CombinedDefaultTheme?.colors?.background,
    flex: 1,
  },
  coursetitleContainer: {
    paddingHorizontal: Dimensions.margin,
    rowGap: 2,
  },
  detailsContainer: {
    flex: 1,
    rowGap: Dimensions.margin,
  },
  sessionsContainer: {
    borderBottomColor: palette.grey200,
    borderBottomWidth: 1,
    borderTopColor: palette.grey200,
    borderTopWidth: 1,
    flex: 1,
  },
  spanDot: {
    color: palette.grey600,
    fontWeight: 100,
  },
  subText: {
    color: palette.grey600,
    letterSpacing: 0,
  },
  titleText: {
    color: palette.grey900,
  },
});

export default CourseDetail;
