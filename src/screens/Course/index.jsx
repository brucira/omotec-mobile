import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import ListAccordion from "../../components/ListAccordion";
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
  const checkCircle = require("../../assets/icons/check-circle.png");
  const statusCircle = require("../../assets/icons/status.png");
  const statusPurpleCircle = require("../../assets/icons/status_purple.png");
  const navigation = useNavigation();

  const navigationHandler = (type) => {
    navigation.navigate(RouteNames.CoursePreview, { type: type || null });
  };

  const SessionItems1 = [
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
  ];

  const SessionItems2 = [
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
  ];

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Action
          icon={require("../../assets/icons/chevron_left.png")}
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
            description="1/4 | 28min"
            listData={SessionItems1}
            title="Session 1"
            onItemPress={navigationHandler}
          ></ListAccordion>
          <ListAccordion
            description="1/4 | 28min"
            listData={SessionItems2}
            title="Session 2"
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
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  bannerImage: {
    height: 146,
    marginBottom: 24,
    width: "100%",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  coursetitleContainer: {
    paddingHorizontal: 16,
    rowGap: 2,
  },
  detailsContainer: {
    flex: 1,
    rowGap: 16,
  },
  sessionsContainer: {
    borderBottomColor: "#EAECF0",
    borderBottomWidth: 1,
    borderTopColor: "#EAECF0",
    borderTopWidth: 1,
    flex: 1,
  },
  spanDot: {
    color: "#475467",
    fontWeight: 100,
  },
  subText: {
    color: "#475467",
    letterSpacing: 0,
  },
  titleText: {
    color: "#101828",
    // fontFamily: "Inter",
    // fontSize: 18,
    // fontWeight: 700,
    // letterSpacing: 0,
    // lineHeight: 28,
  },
});

export default CourseDetail;
