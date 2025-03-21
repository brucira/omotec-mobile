import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Avatar, Text } from "react-native-paper";

import FullEventDetails from "../../components/FullEventDetails";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  calendarTheme,
  Dimensions,
  events,
  specialDays,
  today,
} from "../../utils/constant";

const MAX_WIDTH = 68;
const Daily = ({ isToday, selectedDate, setSelectedDate }) => {
  const [selectedEvent, setSelectedEvent] = useState(today);
  const [visible, setVisible] = useState(false);
  const extractDateInfo = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayName = date.toLocaleString("en-US", { weekday: "short" });

    return { day, dayName, month };
  };
  const onSwipeEnd = (date) => {
    setSelectedDate(date);
  };

  const onPressEvent = (event) => {
    setSelectedEvent(event);
    setVisible(true);
  };

  const renderEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity {...touchableOpacityProps} key={event}>
        <Text style={styles.eventTitle} variant="custom600_12">
          {event.title}
        </Text>
        <Text
          numberOfLines={2}
          style={{ color: CombinedDefaultTheme.colors.background }}
          variant="labelMedium"
        >
          {event.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderHeader = (prop) => {
    if (!prop.dateRange || prop.dateRange.length === 0) return null;
    const { day, month, dayName } = extractDateInfo(prop.dateRange[0]);

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}`;
    const specialDay = specialDays[formattedDate];
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerDateContainer}>
          <View style={styles.headerContent}>
            <Text
              style={{
                color: isToday
                  ? CombinedDefaultTheme.colors.primary
                  : palette.grey900,
                maxWidth: 36,
              }}
              variant="labelMedium"
            >
              {dayName}
            </Text>
            <Avatar.Text
              labelStyle={{
                color: isToday
                  ? CombinedDefaultTheme.colors.background
                  : palette.grey900,
                fontSize: 18,
              }}
              style={[
                styles.dayContainer,
                {
                  backgroundColor: isToday
                    ? CombinedDefaultTheme.colors.primary
                    : palette.transparent,
                },
              ]}
              label={day}
              size={36}
            />
          </View>
        </View>
        <View style={styles.dayEventContainer}>
          <View style={styles.onlineContainer}>
            <Image
              source={require("../../assets/icons/video.png")}
              style={styles.videoIcon}
            />
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="custom500_12"
            >
              Online
            </Text>
          </View>
          {specialDay && (
            <View style={styles.specialDay}>
              <Text style={styles.special} variant="custom600_12">
                {specialDay}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.contentContainer}>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <Calendar
        ampm={true}
        bodyContainerStyle={styles.bodyContainerStyle}
        calendarCellStyle={styles.calendarCellStyle}
        date={selectedDate}
        eventCellStyle={eventCellStyle}
        events={events}
        // headerContentStyle={{}}
        height={Dimensions.screenHeight}
        hourRowHeight={52}
        hourStyle={styles.hourStyle}
        mode="day"
        overlapOffset={0}
        renderEvent={renderEvent}
        renderHeader={renderHeader}
        swipeEnabled={true}
        theme={calendarTheme}
        // minHour={7}
        onPressEvent={onPressEvent}
        onSwipeEnd={onSwipeEnd}
      />
      {/* </GestureHandlerRootView> */}
      <FullEventDetails
        event={selectedEvent}
        hideModal={() => setVisible(false)}
        showAttendance={true}
        visible={visible}
      />
    </View>
  );
};
const eventCellStyle = (event) => ({
  backgroundColor: event.background,
  borderRadius: Dimensions.margin / 2,
  // marginBottom: 4,
  marginLeft: Dimensions.margin * 1.125,
  marginTop: 0,
  maxWidth: "96%",
  paddingHorizontal: Dimensions.padding / 1.33,
  paddingVertical: Dimensions.padding / 2.66,
});

const styles = StyleSheet.create({
  bodyContainerStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    marginTop: Dimensions.margin * 4.375,
  },
  calendarCellStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    left: 17,
    position: "relative",
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  dayContainer: {
    alignItems: "center",
    borderRadius: Dimensions.margin * 4,
    // maxWidth: 32,
    // minWidth: 32,
    // padding: Dimensions.margin / 3.5,
  },
  dayEventContainer: {
    flex: 1,
    gap: Dimensions.margin / 4,
  },
  eventTitle: {
    color: CombinedDefaultTheme.colors.background,
    lineHeight: Dimensions.margin,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    // borderRightWidth: 1,
    elevation: 3,
    flex: 1,
    flexDirection: "row",
    maxHeight: 70,
    position: "absolute",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: Dimensions.screenWidth,
    zIndex: 3,
  },
  headerContent: {
    alignItems: "center",
    gap: Dimensions.margin / 4,
    maxWidth: Dimensions.margin * 2.25,
    minWidth: Dimensions.margin * 2.25,
  },
  headerDateContainer: {
    // alignSelf: "baseline",
    alignItems: "center",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    // justifyContent: "center",
    maxWidth: MAX_WIDTH,
    minWidth: MAX_WIDTH,
    paddingHorizontal: Dimensions.padding * 1.375,
    paddingVertical: Dimensions.padding,
  },
  hourStyle: {
    backgroundColor: "#FFF",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    bottom: 6,
    color: palette.grey500,
    fontSize: 11,
    height: "100%",
    left: 0,
    maxWidth: MAX_WIDTH,
    minWidth: MAX_WIDTH,
    zIndex: 10,
  },
  onlineContainer: {
    alignItems: "center",
    alignSelf: "baseline",
    backgroundColor: palette.primaryStudent50,
    borderRadius: Dimensions.padding * 4,
    flexDirection: "row",
    gap: Dimensions.margin / 2.66,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 8,
  },
  special: {
    color: CombinedDefaultTheme.colors.background,
    lineHeight: Dimensions.margin,
  },
  specialDay: {
    backgroundColor: palette.success700,
    borderRadius: Dimensions.margin / 2,
    marginRight: Dimensions.margin,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 4,
    width: "auto",
  },
  videoIcon: {
    height: Dimensions.margin / 1.33,
    width: Dimensions.margin / 1.33,
  },
});

export default Daily;
