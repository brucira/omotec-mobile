import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";

import ListAccordion from "../../components/ListAccordion";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { ACCORDIOM_ITEM_ICON, Dimensions } from "../../utils/constant";

const CourseDetail = ({ navigation }) => {
  const bannerImage = require("../../assets/course_details_banner.png");
  const checkCircle = require("../../assets/icons/check-circle.png");
  const statusCircle = require("../../assets/icons/status.png");
  const statusPurpleCircle = require("../../assets/icons/status_purple.png");

  const navigationHandler = () => {
    console.log("click");
  };

  const SessionItems = [
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.text,
      icon: checkCircle,
      text: "5 Min",
      title: "Welcome to Employee Training 101",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.video,
      icon: statusPurpleCircle,
      selected: true,
      showResource: true,
      text: "5 Min",
      title: "Welcome to Employee Training?",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.video,
      icon: statusCircle,
      text: "5 Min",
      title: "Benefits of Employee Training",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.globel,
      icon: statusCircle,
      text: "Web link",
      title: "How to Set Up an Employee Training Plan",
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
          <Text style={styles.subText}>
            8 Sessions
            <Text style={styles.spanDot}>•</Text>
            30 mins of video left
            <Text style={styles.spanDot}>•</Text>
            40 mins of reading left
          </Text>
        </View>
        <ScrollView style={styles.sessionsContainer}>
          <ListAccordion
            description="1/4 | 28min"
            listData={SessionItems}
            title="Session 1"
            onItemPress={navigationHandler}
          ></ListAccordion>
          <ListAccordion
            description="1/4 | 28min"
            listData={SessionItems}
            title="Session 2"
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
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 100,
    letterSpacing: 0,
    lineHeight: 16,
  },
  subText: {
    color: "#475467",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 16,
  },
  titleText: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 28,
  },
});

export default CourseDetail;
