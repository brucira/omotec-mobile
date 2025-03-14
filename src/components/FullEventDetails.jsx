import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Switch, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import AttendanceDetails from "./AttendanceDetails";
import PrimaryButton from "./PrimaryButton";
import StudentList from "./StudentList";

const formatDateTimeRange = (startISO, endISO) => {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);
  const dayName = startDate.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = startDate.getDate();
  const monthName = startDate.toLocaleDateString("en-US", { month: "long" });
  const year = startDate.getFullYear();
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
  };

  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  return {
    dayName: dayName,
    dayNumber: dayNumber,
    endTime: endTime,
    monthName: monthName,
    startTime: startTime,
    year: year,
  };
};

const FullEventDetails = ({ visible, hideModal, event, showAttendance }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [attendanceVisible, setAttendanceVisible] = useState(false);
  const [studentListVisible, setStudentListVisible] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const studentCount = Array.isArray(event.batchStudents)
    ? event.batchStudents.length
    : 0;

  const formattedDateTime = formatDateTimeRange(event.start, event.end);
  const onViewAttendancePress = (event) => {
    setAttendanceVisible(true);
  };
  const onShowStudentPress = (event) => {
    setStudentListVisible(true);
  };

  const externalLinkHandler = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Can't open this link.");
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
      >
        <SafeAreaView style={styles.container}>
          <Appbar style={styles.appBarContainer}>
            <Appbar.Action
              icon={require("../assets/icons/close.png")}
              style={styles.backIcon}
              onPress={hideModal}
            />
          </Appbar>
          <View style={styles.contentContainer}>
            <View style={styles.contentSeperatorMultiple}>
              <View
                style={[styles.badge, { backgroundColor: event.background }]}
              />
              <View>
                <Text variant="custom600_20">{event.title}</Text>
                <Text style={styles.subDescription} variant="bodySmall">
                  {`${formattedDateTime.dayName}, ${formattedDateTime.dayNumber} ${formattedDateTime.monthName} - ${formattedDateTime.startTime} - ${formattedDateTime.endTime}`}
                </Text>
              </View>
            </View>
            <View style={styles.contentSeperator}>
              <Image
                source={require("../assets/icons/user.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View style={{ flexDirection: "row" }}>
                <Text variant="labelLarge">Trainer: </Text>
                <Text variant="bodyMedium">{event.trainer}</Text>
              </View>
            </View>
            <View style={styles.contentSeperator}>
              <Image
                source={require("../assets/icons/courses.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View style={{ flexDirection: "row" }}>
                <Text variant="labelLarge">Course: </Text>
                <Text variant="bodyMedium">{event.course}</Text>
              </View>
            </View>
            <View style={styles.contentSeperatorMultiple}>
              <Image
                source={require("../assets/icons/users.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Text variant="labelLarge">Batch: </Text>
                  <Text variant="bodyMedium">{event.batchName} -</Text>
                  {studentCount > 0 && (
                    <TouchableOpacity
                      onPress={(event) => onShowStudentPress(event)}
                    >
                      <Text style={styles.studentCount} variant="bodyMedium">
                        {" "}
                        {studentCount > 1
                          ? studentCount + " students"
                          : studentCount + "student"}{" "}
                      </Text>
                      {/* <Modal
                      transparent={true}
                      visible={studentVisible}
                      onRequestClose={hideStudentHandler}
                      style={{ backgroundColor: "green" }}
                    >
                      <View
                        style={{
                          backgroundColor: "red",
                          // position: "absolute",
                          // top: "50%",
                        }}
                      >
                        <Text>Hii</Text>
                      </View>
                    </Modal> */}
                    </TouchableOpacity>
                  )}
                </View>
                {event.link && (
                  <View>
                    <Text
                      style={{ color: palette.grey600 }}
                      variant="bodySmall"
                    >{`${event.rsvp} yes (${event.virtually} virtually)`}</Text>
                    <Text
                      style={{ color: palette.grey600 }}
                      variant="bodySmall"
                    >{`${event.awaiting} awaiting`}</Text>
                  </View>
                )}
              </View>
            </View>
            {event.link ? (
              <View style={styles.contentSeperator}>
                <Image
                  source={require("../assets/icons/video.png")}
                  style={[styles.badge]}
                  tintColor={palette.grey700}
                />
                <View style={{ flex: 1 }}>
                  <PrimaryButton
                    backgroundColor={CombinedDefaultTheme.colors.primary}
                    borderColor={palette.purple600}
                    content={"Start the session"}
                    textColor={CombinedDefaultTheme.colors.background}
                    onPress={() => externalLinkHandler("https://google.com")}
                  />
                  <View style={styles.link}>
                    <Text style={styles.subDescription} variant="bodySmall">
                      {event.link}
                    </Text>
                    <Image
                      source={require("../assets/icons/copy.png")}
                      style={styles.badge}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.contentSeperator}>
                <Image
                  source={require("../assets/icons/map.png")}
                  style={[styles.badge]}
                  tintColor={palette.grey700}
                />
                <View>
                  <Text variant="labelLarge">{event.location}</Text>
                  <Text style={styles.subDescription} variant="bodySmall">
                    {event.address}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.contentSeperatorMultiple}>
              <Image
                source={require("../assets/icons/menu.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View style={{ flexDirection: "row", maxWidth: "90%" }}>
                <Text
                  style={{
                    color: palette.grey900,
                    lineHeight: Dimensions.margin * 1.25,
                  }}
                  variant="bodySmall"
                >
                  {event.description}
                </Text>
              </View>
            </View>
            <View style={styles.contentSeperatorMultiple}>
              <Image
                source={require("../assets/icons/attachment.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View style={styles.fileContainer}>
                <Image
                  source={require("../assets/icons/file_text.png")}
                  style={[styles.badge]}
                  tintColor={palette.grey700}
                />
                <Text style={{ color: palette.slate900 }} variant="labelLarge">
                  {event.attachment}
                </Text>
              </View>
            </View>
            <View style={styles.contentSeperator}>
              <Image
                source={require("../assets/icons/notification.png")}
                style={[styles.badge]}
                tintColor={palette.grey700}
              />
              <View style={{ flexDirection: "row" }}>
                <Text variant="bodyMedium">{event.notify}</Text>
              </View>
            </View>
          </View>
          {showAttendance && (
            <View style={styles.bottomContainer}>
              <View style={styles.attendanceContainer}>
                <Text style={{ color: palette.grey500 }} variant="labelLarge">
                  Attendance?
                </Text>
                <Text
                  style={{ color: CombinedDefaultTheme.colors.primary }}
                  variant="labelLarge"
                  onPress={(event) => onViewAttendancePress(event)}
                >
                  View
                </Text>
              </View>
              <View style={styles.presentMarkingContainer}>
                <Switch
                  style={styles.switch}
                  thumbColor={CombinedDefaultTheme.colors.background}
                  trackColor={{ true: palette.success600 }}
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
                <Text variant="labelLarge">Present</Text>
              </View>
            </View>
          )}

          <AttendanceDetails
            attendanceList={event.attendance}
            attendanceStatus={isSwitchOn}
            event={event}
            formattedDateTime={formattedDateTime}
            hideModal={() => setAttendanceVisible(false)}
            visible={attendanceVisible}
            onToggleSwitch={onToggleSwitch}
          />
          <StudentList
            event={event}
            formattedDateTime={formattedDateTime}
            hideModal={() => setStudentListVisible(false)}
            studentList={event.batchStudents}
            visible={studentListVisible}
            // onToggleSwitch={onToggleSwitch}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  attendanceContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  badge: {
    borderRadius: Dimensions.margin / 4,
    height: Dimensions.margin,
    width: Dimensions.margin,
  },
  bottomContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 4,
    paddingHorizontal: Dimensions.padding,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderTopColor: palette.neutral100,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    gap: Dimensions.padding,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  contentSeperator: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin * 1.25,
  },
  contentSeperatorMultiple: {
    alignItems: "baseline",
    flexDirection: "row",
    gap: Dimensions.margin * 1.25,
  },
  fileContainer: {
    alignItems: "center",
    backgroundColor: palette.primaryStudent50,
    borderRadius: Dimensions.margin / 2,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  link: {
    flexDirection: "row",
    gap: Dimensions.margin / 1.6,
    paddingTop: Dimensions.padding / 4,
  },
  presentMarkingContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  studentCount: {
    alignSelf: "baseline",
    color: CombinedDefaultTheme.colors.primary,
    textDecorationLine: "underline",
  },
  subDescription: {
    color: palette.grey500,
  },
  switch: {
    transform: [{ scale: 0.6 }],
  },
});

export default FullEventDetails;
