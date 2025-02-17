import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Badge, Button, ProgressBar, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const ENROLLMENT = "enrollment";
const NEW_COURSE = "newCourse";
const GRADES = "grades";
const FEEDBACK = "feedback";
const CERTIFICATE = "certificate";
const ASSIGNMENT = "assignment";
const NotificationCard = ({
  course,
  notificationType,
  imageSource,
  duration,
  grade,
  feedback,
  fileName,
  fileSize,
  fileUri,
  newNotification,
  progress,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            notificationType === ENROLLMENT
              ? "rgba(133, 45, 205, 0.05)"
              : palette.transparent,
          paddingHorizontal: Dimensions.padding,
        },
      ]}
    >
      <View>
        <Image source={imageSource} style={styles.notificationImage} />
        {newNotification === true && (
          <Badge size={8} style={styles.newNotification}></Badge>
        )}
      </View>
      <View style={styles.contentSection}>
        <View style={styles.titleAndDuration}>
          <View style={styles.contentContainer}>
            <Text style={styles.heading} variant="labelLarge">
              {notificationType === NEW_COURSE
                ? `Hello, Welcome to ${course} course!`
                : notificationType === GRADES
                  ? `Your grade for ${course} has 
been posted.`
                  : notificationType === FEEDBACK
                    ? `You have received a feedback!`
                    : notificationType === CERTIFICATE
                      ? `Your certificate is ready!`
                      : notificationType === ASSIGNMENT
                        ? `File Uploaded Succesfully`
                        : notificationType === ENROLLMENT
                          ? "New Course has been added."
                          : null}
            </Text>
          </View>
          <Text style={{ color: palette.grey500 }} variant="bodySmall">
            {/* 15 min */}
            {duration}
          </Text>
        </View>
        <View>
          <Text style={{ color: palette.grey600 }} variant="bodySmall">
            {/* You have been added to a new course */}
            {notificationType === NEW_COURSE
              ? "You have been added to a new course"
              : notificationType === GRADES
                ? `Grade received:  ${grade}`
                : notificationType === FEEDBACK
                  ? `Course: ${course}`
                  : notificationType === CERTIFICATE
                    ? `${course} certificate is out now.`
                    : notificationType === ASSIGNMENT
                      ? `${course} assignment has been uploaded`
                      : notificationType === ENROLLMENT
                        ? `Check out the new course now.`
                        : null}
          </Text>
          {notificationType === FEEDBACK && (
            <View style={styles.feedbackComment}>
              <Text numberOfLines={1} variant="bodyMedium">
                {/* This is looking good! */}
                {feedback}
              </Text>
            </View>
          )}
          {notificationType === ASSIGNMENT && (
            <TouchableOpacity
              style={styles.assignmentContainer}
              onPress={() => {}}
            >
              <View style={styles.fileContent}>
                <Image
                  source={require("../../assets/icons/file.png")}
                  style={styles.file}
                />
                <View style={styles.content}>
                  <View>
                    <Text numberOfLines={1} variant="labelSmall">
                      {fileName}
                    </Text>
                    <Text numberOfLines={1} variant="labelSmall">
                      {fileSize}
                    </Text>
                    <View style={styles.progress}>
                      <ProgressBar
                        color={palette.success600}
                        progress={progress / 100}
                        style={styles.progressBar}
                      />
                      <Text style={styles.progressText} variant="labelSmall">
                        {progress} %
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../../assets/icons/check.png")}
                    style={styles.check}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          <Button
            compact
            contentStyle={styles.buttonContent}
            labelStyle={{ marginHorizontal: 0, marginVertical: 0 }}
            mode="text"
            style={styles.button}
          >
            {notificationType === NEW_COURSE
              ? "View"
              : notificationType === GRADES
                ? `View grades`
                : notificationType === FEEDBACK
                  ? `View feedback`
                  : notificationType === CERTIFICATE
                    ? `View`
                    : notificationType === ENROLLMENT
                      ? `View`
                      : notificationType === ASSIGNMENT
                        ? null
                        : null}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  assignmentContainer: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    marginTop: Dimensions.margin / 1.33,
    paddingLeft: Dimensions.padding / 2.66,
    paddingRight: Dimensions.padding / 1.14,
    paddingVertical: Dimensions.padding / 2.66,
  },
  button: {
    // backgroundColor: "red",
    marginTop: Dimensions.margin / 4,
  },
  buttonContent: {
    alignContent: "flex-start",
    alignSelf: "baseline",
    height: "auto",
    minHeight: 0,
    padding: 0,
  },
  check: {
    height: Dimensions.margin,
    width: Dimensions.margin,
  },
  container: {
    flexDirection: "row",
    gap: Dimensions.margin / 1.06,
    paddingVertical: Dimensions.padding / 1.14,
    width: "auto",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    maxWidth: "85%",
    minWidth: "85%",
  },
  contentSection: {
    flex: 1,
  },
  feedbackComment: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    marginTop: Dimensions.padding / 1.142,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
    width: "100%",
  },
  file: {
    height: Dimensions.margin * 2,
    width: Dimensions.margin * 2,
  },
  fileContent: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
  heading: {
    color: palette.grey900,
  },
  newNotification: {
    backgroundColor: palette.primaryStudent400,
    position: "absolute",
    right: Dimensions.margin / 8,
  },
  notificationImage: {
    borderRadius: Dimensions.padding * 4,
    height: Dimensions.margin * 2.75,
    width: Dimensions.margin * 2.75,
  },
  progress: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 1.6,
    justifyContent: "space-between",
    // width: "100%",
  },
  progressBar: {
    borderRadius: 16,
    height: 6,
    width: 173,
  },
  progressText: {
    color: palette.grey600,
  },
  titleAndDuration: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
