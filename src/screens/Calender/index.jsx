import filter from "lodash/filter";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import React, { useCallback, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  TimelineList,
} from "react-native-calendars";
import { Appbar, Avatar, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames } from "../../utils/constant";
import { getDate, timelineEvents } from "./mock";

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS = timelineEvents;

const Calender = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState(() => {
    return groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start));
  });

  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  const onDateChanged = useCallback((date, source) => {
    console.log("TimelineCalendarScreen onDateChanged: ", date, source);
    setCurrentDate(date);
  }, []);

  const onMonthChange = useCallback((month, updateSource) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  }, []);

  const createNewEvent = useCallback((timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    const newEvent = {
      color: "white",
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      id: "draft",
      start: timeString,
      title: "New Event",
    };

    if (timeObject.date) {
      setEventsByDate((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        updatedEvents[timeObject.date] = updatedEvents[timeObject.date]
          ? [...updatedEvents[timeObject.date], newEvent]
          : [newEvent];
        return updatedEvents;
      });
    }
  }, []);

  const approveNewEvent = useCallback((_timeString, timeObject) => {
    if (!timeObject.date) return;

    Alert.prompt("New Event", "Enter event title", [
      {
        onPress: () => {
          setEventsByDate((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[timeObject.date] = filter(
              updatedEvents[timeObject.date],
              // eslint-disable-next-line prettier/prettier
              (e) => e.id !== "draft"
            );
            return updatedEvents;
          });
        },
        text: "Cancel",
      },
      {
        onPress: (eventTitle) => {
          setEventsByDate((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            const draftEvent = find(updatedEvents[timeObject.date], {
              id: "draft",
            });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? "New Event";
              draftEvent.color = "lightgreen";
              updatedEvents[timeObject.date] = [
                ...updatedEvents[timeObject.date],
              ];
            }
            return updatedEvents;
          });
        },
        text: "Create",
      },
    ]);
  }, []);
  function getDayOfWeek(dateString) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(dateString); // Convert the string to a Date object
    return days[date.getDay()]; // Get the day of the week
  }

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content title={<Text variant="titleLarge">Feb</Text>} />
        <Appbar.Action
          icon={require("../../assets/icons/notification.png")}
          onPress={() => navigation.navigate(RouteNames.Notifications)}
        />
        <Appbar.Action
          icon={(props) => (
            <Avatar.Image
              {...props}
              source={require("../../assets/avatar.png")}
            />
          )}
          onPress={() => navigation.navigate(RouteNames.Profile)}
        />
      </Appbar>
      <View style={styles.contentContainer}>
        <CalendarProvider
          showTodayButton
          date={currentDate}
          disabledOpacity={0.6}
          style={{ borderWidth: 0 }}
          onDateChanged={onDateChanged}
          onMonthChange={onMonthChange}
        >
          {/* <ExpandableCalendar
            firstDay={1}
            markedDates={marked}
            openThreshold={true}
          /> */}
          <View style={styles.dayAndTaskContainer}>
            <View style={styles.currentDayContainer}>
              <Text>{getDayOfWeek(currentDate)}</Text>
              <Text style={styles.currentDateText}>
                {currentDate.split("-")[2]}
              </Text>
            </View>
          </View>
          {/* <TimelineList
            key={12}
            scrollToFirst
            showNowIndicator
            timelineProps={{
              format24h: false,
              onBackgroundLongPress: createNewEvent,
              onBackgroundLongPressOut: approveNewEvent,
              renderEvent: (event) => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        event.color || CombinedDefaultTheme.colors.primary,
                      borderColor: "transparent",
                      borderRadius: 12,
                      borderWidth: 0,
                      flex: 1,
                      height: "100%",
                      left: 0,
                      margin: 0,
                      overflow: "hidden",
                      paddingHorizontal: 12,
                      paddingVertical: 12,
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      numberOfLines={1}
                    >
                      {event.title}
                    </Text>
                    <Text
                      style={{
                        color: CombinedDefaultTheme.colors.background,
                        fontSize: 12,
                      }}
                      numberOfLines={1}
                    >
                      {event.start} - {event.end}
                    </Text>
                  </View>
                );
              },
              theme: {
                contentStyle: {
                  borderRadius: 8,
                  height: Dimensions.screenHeight,
                  right: 4,
                },
                timelineContainer: {},
                timeLabel: {
                  left: 0,
                  position: "absolute",
                },
                event: {
                  borderRadius: 8,
                  borderWidth: 0,
                },
                nowIndicatorKnob: {
                  backgroundColor: CombinedDefaultTheme.colors.primary,
                  height: 12,
                  width: 3.9,
                },
                nowIndicatorLine: {
                  backgroundColor: CombinedDefaultTheme.colors.primary,
                  position: "absolute",
                  top: 2,
                },
              },
            }}
            events={eventsByDate}
            initialTime={INITIAL_TIME}
            style={{ backgroundColor: "yellow" }}
          /> */}
        </CalendarProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // padding: Dimensions.padding,
    position: "relative",
  },
  currentDateText: {
    fontSize: 18,
    lineHeight: 28,
  },
  currentDayContainer: {
    // width: 12,
    // backgroundColor: "green",
    borderRightWidth: 1,
    maxWidth: 36,
    minWidth: 36,
    // paddingRight: Dimensions.padding,
  },
  dayAndTaskContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flexDirection: "row",
    minHeight: 54,
    paddingHorizontal: Dimensions.padding,
    // paddingVertical: Dimensions.padding / 2,
  },
});

export default Calender;
