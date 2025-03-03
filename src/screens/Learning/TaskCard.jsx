import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import AssignmentModal from "../../components/AssignmentModal";
import Tag from "../../components/Tag";
import TestModal from "../../components/TestModal";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const TaskCard = ({ ...items }) => {
  const [, setScheduleCallVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [assignmentVisible, setAssignmentVisible] = useState(false);
  const calendarSource = require("../../assets/icons/calender.png");
  const SCHEDULE_CALL = "schedule_call";
  const TEST = "test";
  const ASSIGNMMENT = "assignment";
  const handleCardPress = (taskType) => {
    if (taskType === SCHEDULE_CALL) {
      setScheduleCallVisible(true);
    }
    if (taskType === ASSIGNMMENT) {
      setAssignmentVisible(true);
    }
    if (taskType === TEST) {
      setTestVisible(true);
    }
  };

  return (
    <>
      <Card
        contentStyle={styles.contentStyleContainer}
        mode="outlined"
        style={styles.container}
        onPress={() => handleCardPress(items.taskType)}
      >
        <View style={styles.headerContainer}>
          <Image source={items.avatar} style={styles.banner} />
          <View style={styles.headerContentContainer}>
            <View style={styles.cardContent}>
              <Text
                numberOfLines={1}
                style={{ marginBottom: Dimensions.margin / 4 }}
                variant="labelLarge"
              >
                {items.title}
              </Text>
              <Tag
                backgroundColor={palette.tintPurple}
                label={items.status}
                textColor={CombinedDefaultTheme.colors.primary}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{ color: palette.grey600 }}
              variant={"labelLarge"}
            >
              {items.taskType}
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
              {items.start_date}
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
              {items.end_date}
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
              {items.remark === null ? "No remarks" : items.remark}
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
      <TestModal
        hideModal={() => setTestVisible(false)}
        visible={testVisible}
        {...items}
      />
      <AssignmentModal
        hideModal={() => setAssignmentVisible(false)}
        visible={assignmentVisible}
      />
    </>
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
