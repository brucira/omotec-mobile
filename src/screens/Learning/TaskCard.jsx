import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames } from "../../utils/constant";

const TaskCard = ({
  avatar,
  end_date,
  id,
  remark,
  start_date,
  status,
  taskType,
  test,
  title,
}) => {
  const calendarSource = require("../../assets/icons/calender.png");
  const clockSource = require("../../assets/icons/clock_five.png");
  const COURSE = "course";
  const navigation = useNavigation();
  const TAB_USER = "Users";

  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.container}
      //   onPress={() =>
      //     navigation.navigate(RouteNames.ProjectDetail, {
      //       title,
      //     })
      //   }
    >
      <View style={styles.headerContainer}>
        <Image source={avatar} style={styles.banner} />
        <View style={styles.headerContentContainer}>
          <View style={styles.cardContent}>
            <Text
              numberOfLines={1}
              style={{ marginBottom: Dimensions.margin / 4 }}
              variant="labelLarge"
            >
              {title}
            </Text>
            <Tag
              backgroundColor={palette.tintPurple}
              label={status}
              textColor={CombinedDefaultTheme.colors.primary}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{ color: palette.grey600 }}
            variant={"labelLarge"}
          >
            {taskType}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View
        style={[
          styles.statsContainer,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={styles.singleItemContainer}>
          <Image
            source={calendarSource}
            style={styles.endIcons}
            tintColor={palette.grey700}
          />
          <Text style={{ color: palette.grey700 }} variant="bodySmall">
            {"Start:"}
          </Text>
          <Text style={{ color: palette.grey900 }} variant="bodySmall">
            {start_date}
          </Text>
        </View>

        <View style={styles.singleItemContainer}>
          <Image
            source={calendarSource}
            style={styles.endIcons}
            tintColor={palette.grey700}
          />
          <Text style={{ color: palette.grey700 }} variant="bodySmall">
            {"End:"}
          </Text>
          <Text style={{ color: palette.grey900 }} variant="bodySmall">
            {end_date}
          </Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.certificate}>
        <View style={styles.singleItemContainer}>
          <Text style={{ color: palette.grey700 }} variant="bodySmall">
            {"Remark:"}
          </Text>
          <Text style={{ color: palette.grey900 }} variant="bodySmall">
            {remark === null ? "No remarks" : remark}
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

export default TaskCard;
