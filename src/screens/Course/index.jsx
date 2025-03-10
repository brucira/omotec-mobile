import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import ListAccordion from "../../components/ListAccordion";
import { RESIZE_MODE, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  Dimensions,
  RouteNames,
  SESSION_1,
  SESSION_2,
} from "../../utils/constant";

const CourseDetail = () => {
  const bannerImage = require("../../assets/course_details_banner.png");
  const backIcon = require("../../assets/icons/chevron_left.png");
  const navigation = useNavigation();

  const navigationHandler = (type) => {
    navigation.navigate(RouteNames.CoursePreview, { type: type || null });
  };

  const [session1, setSession1] = React.useState(SESSION_1);
  const [session2, setSession2] = React.useState(SESSION_2);

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
          <Text style={styles.titleText} variant="custom700_18">
            Your Creative peak
          </Text>
          <Text style={styles.subText} variant="bodySmall">
            8 Sessions
            <Text style={styles.spanDot} variant="custom100_12">
              &nbsp;•&nbsp;
            </Text>
            30 mins of video left
            <Text style={styles.spanDot} variant="custom100_12">
              &nbsp;•&nbsp;
            </Text>
            40 mins of reading left
          </Text>
        </View>
        <ScrollView style={styles.sessionsContainer}>
          <ListAccordion
            listData={session1}
            updateData={setSession1}
            onItemPress={navigationHandler}
          ></ListAccordion>
          <ListAccordion
            listData={session2}
            updateData={setSession2}
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
