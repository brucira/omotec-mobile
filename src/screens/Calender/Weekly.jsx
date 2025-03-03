import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const WEEK_DAY_WIDTH = 49.5;
const session_line_width = Dimensions.screenWidth / 24;
const session_duration = (Dimensions.screenWidth / 8) * 4;
const Weekly = ({ isToday, selectedDate, setSelectedDate }) => {
  const selected = selectedDate.toISOString().split("T")[0];
  const [selectedEvent, setSelectedEvent] = useState(today);
  const [visible, setVisible] = useState(false);

  const handleDateRange = (date, hasSpecialDay) => {
    const formattedDate = date.format("DD-MM");
    const specialDay = specialDays[formattedDate];
    const shouldHighlight = selected
      ? date.isSame(selected, "date")
      : isToday(date);
    return (
      <TouchableOpacity
        key={date.toString()}
        style={{
          // backgroundColor: "red",
          borderColor: palette.grey200,
          flex: 1,
          gap: 12,
          paddingTop: 2,
        }}
      >
        <View
          style={[
            styles.weekDay,
            {
              backgroundColor: !shouldHighlight
                ? CombinedDefaultTheme.colors.background
                : CombinedDefaultTheme.colors.primary,
            },
          ]}
        >
          <Text
            style={{
              color: !shouldHighlight
                ? palette.grey500
                : CombinedDefaultTheme.colors.background,
              textAlign: "center",
            }}
          >
            {date.format("dd")}
          </Text>
          <View style={styles.weekDates}>
            <Text
              style={[
                {
                  color: !shouldHighlight
                    ? palette.grey700
                    : CombinedDefaultTheme.colors.background,
                  textAlign: "center",
                },
              ]}
            >
              {date.format("D")}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.videoContainer,
            {
              // backgroundColor: "red",
              marginTop: hasSpecialDay ? Dimensions.margin : 0,
            },
          ]}
        >
          {specialDay && (
            <TouchableOpacity
              style={[styles.eventCellCss, "red", { bottom: 4 }]}
            >
              <Text
                numberOfLines={1}
                style={styles.specialDay}
                variant="labelSmall"
              >
                {specialDay}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const onPressEvent = (event) => {
    console.log("in event");

    setSelectedEvent(event);
    setVisible(true);
  };
  const renderWeekEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity {...touchableOpacityProps} key={event}>
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderWeekHeader = (prop) => {
    if (!prop.dateRange || prop.dateRange.length === 0) return null;
    const hasSpecialDay = prop.dateRange.some((date) => {
      const formattedDate = date.format("DD-MM");
      return specialDays[formattedDate];
    });
    return (
      <View style={{ position: "relative" }}>
        <View style={styles.weekHeaderContainer}>
          <View style={styles.weekNumberContainer}>
            <View></View>
          </View>
          {prop.dateRange.map((date) => handleDateRange(date, hasSpecialDay))}
          {/* </View> */}
        </View>
        <View
          style={[
            styles.sessionWeekIndicatorContainer,
            {
              bottom: hasSpecialDay
                ? Dimensions.margin * 2
                : Dimensions.margin / 4,
            },
          ]}
        >
          <View style={styles.weekVideoIconContainer}>
            <Image
              source={require("../../assets/icons/video.png")}
              style={styles.weekVideoIcon}
            />
            <Image
              source={require("../../assets/icons/session_line.png")}
              style={styles.sessionLine}
            />
          </View>
        </View>
      </View>
    );
  };
  const onSwipeEnd = (date) => {
    setSelectedDate(date);
  };
  return (
    <View style={styles.contentContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Calendar
          ampm={true}
          bodyContainerStyle={styles.bodyContainerStyle}
          calendarCellStyle={styles.calendarCellStyle}
          date={selectedDate}
          eventCellStyle={eventCellStyle}
          events={events}
          headerContentStyle={{}}
          height={Dimensions.screenHeight}
          hourRowHeight={52}
          mode="week"
          overlapOffset={0}
          renderEvent={renderWeekEvent}
          renderHeader={renderWeekHeader}
          showAllDayEventCell={true}
          swipeEnabled={true}
          theme={calendarTheme}
          onPressEvent={onPressEvent}
          onSwipeEnd={onSwipeEnd}
        />
      </GestureHandlerRootView>
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
  gap: Dimensions.margin / 2,
  marginLeft: 1,
  marginRight: 0,
  marginTop: 0,
  paddingVertical: Dimensions.padding / 2.66,
});

const styles = StyleSheet.create({
  bodyContainerStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
  },
  calendarCellStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    // left: 17,
    position: "relative",
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
  },
  eventCellCss: {
    borderRadius: Dimensions.margin / 2,
    elevation: 2,
    // padding: 4,
    minWidth: "33%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    zIndex: 100,
  },
  sessionLine: {
    height: Dimensions.margin / 8,
    left: 28,
    position: "absolute",
    top: 9,
    width: session_line_width + session_duration,
  },
  sessionWeekIndicatorContainer: {
    // bottom: Dimensions.margin / 4,
    left: Dimensions.screenWidth / 3.9,
    position: "absolute",
    zIndex: 7,
  },
  specialDay: {
    backgroundColor: palette.success700,
    color: CombinedDefaultTheme.colors.background,
    height: Dimensions.margin * 1.5,
    paddingLeft: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 4,
  },
  videoContainer: {
    borderColor: palette.grey200,
    borderLeftWidth: 1,
    height: Dimensions.margin * 1.5,
    position: "relative",
  },
  weekDates: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.margin * 2.5,
    height: Dimensions.margin * 2.25,
    justifyContent: "center",
    width: Dimensions.margin * 2.25,
    zIndex: 10,
  },
  weekDay: {
    borderRadius: Dimensions.margin / 2,
    fontSize: 10,
    justifyContent: "space-between",
    marginHorizontal: Dimensions.margin / 3,
    paddingTop: Dimensions.padding / 2.66,
  },
  weekEventContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 2,
  },
  weekHeaderContainer: {
    alignItems: "baseline",
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 0,
    borderColor: palette.grey200,
    // borderRightWidth: 1,
    elevation: Dimensions.margin / 4,
    flexDirection: "row",
    // height: 56,
    paddingLeft: 0.5,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    width: Dimensions.screenWidth,
    zIndex: 3,
  },
  weekNumberContainer: {
    borderColor: palette.grey200,
    // borderRightWidth: 1,
    maxWidth: WEEK_DAY_WIDTH,
    minWidth: WEEK_DAY_WIDTH,
    zIndex: 10,
  },
  weekVideoIcon: {
    height: Dimensions.margin / 1.33,
    resizeMode: "contain",
    width: Dimensions.margin / 1.33,
    zIndex: 5,
  },
  weekVideoIconContainer: {
    backgroundColor: palette.primaryStudent50,
    borderRadius: Dimensions.margin * 4,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 4,
    position: "relative",
  },
});

export default Weekly;
