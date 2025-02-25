import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames } from "../../utils/constant";

const DocumentCard = ({
  cover,
  documentType,
  id,
  lastModified,
  modifiedBy,
  title,
}) => {
  const calendarSource = require("../../assets/icons/calender.png");
  const userSource = require("../../assets/icons/user.png");
  const bookSource = require("../../assets/icons/book.png");
  const clockSource = require("../../assets/icons/clock_five.png");
  const calendarRangeSource = require("../../assets/icons/calendar_range.png");
  const trendSource = require("../../assets/icons/trend_up.png");
  const COURSE = "course";
  const navigation = useNavigation();

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
      <Image source={cover} style={styles.banner} />
      <View style={styles.cardContent}>
        <Tag
          backgroundColor={palette.primaryStudent50}
          iconSource={bookSource}
          label={documentType}
          textColor={CombinedDefaultTheme.colors.primary}
        />
        <Text
          numberOfLines={2}
          style={styles.documentTitle}
          variant="titleSmall"
        >
          {title}
        </Text>
        <View style={styles.cardFooter}>
          <Text>
            Last Modified on: <Text>{lastModified}</Text>
          </Text>
          <View style={styles.modified}>
            <Text>{" by"}</Text>
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.modifiedBy}
            />
            <Text>{modifiedBy}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: Dimensions.padding / 2,
    height: 131,
    padding: 0,
    resizeMode: "cover",
    width: "100%",
  },
  cardContent: {
    // flex: 1,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding / 1.33,
  },
  cardFooter: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: Dimensions.padding / 2,
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
  documentTitle: {
    paddingTop: Dimensions.padding / 2,
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
  modified: {
    flexDirection: "row",
    gap: Dimensions.margin / 4,
  },
  modifiedBy: {
    borderRadius: Dimensions.margin * 3,
    height: Dimensions.margin,
    resizeMode: "contain",
    width: Dimensions.margin,
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

export default DocumentCard;
