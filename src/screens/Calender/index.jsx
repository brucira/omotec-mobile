import filter from "lodash/filter";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Appbar, Avatar, Surface, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, events, RouteNames } from "../../utils/constant";
import { getDate, timelineEvents } from "./mock";

const specialDays = {
  "02-10": "Gandhi Jayanti",
  "10-02": "Special Holiday",
  "15-08": "Independence Day",
  "25-12": "Christmas",
  "26-01": "Republic Day",
};

const theme = {
  palette: {
    gray: {
      grey200: palette.grey200,
    },
    nowIndicator: palette.primaryStudent400,
  },
};
function extractDateInfo(dateRange) {
  const date = new Date(dateRange[0]); // Convert string to Date object

  const day = date.getDate(); // Get the day of the month
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const dayName = date.toLocaleString("en-US", { weekday: "short" }); // Get short day name (Tue)

  return { day, dayName, month };
}

const Calender = ({ navigation }) => {
  // const renderHeader = (prop) => {
  //   console.log(prop);

  //   return (
  //     <View style={styles.headerContainer}>
  //       <View style={styles.headerDateContainer}>
  //         <Text variant="labelMedium">Tue</Text>
  //         {/* <Text style={{ fontSize: 18 }}>30</Text> */}
  //         <Text variant="labelMedium">{prop.dateRange[0]}</Text>
  //       </View>
  //       <Text variant="labelMedium">{prop.dateRange[0]}</Text>
  //     </View>
  //   );
  // };

  const extractDateInfo = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate(); // Extract the day (10)
    const month = date.getMonth() + 1; // Extract the month (2)
    const dayName = date.toLocaleString("en-US", { weekday: "short" }); // Extract the weekday (Tue)

    return { day, dayName, month };
  };

  const renderHeader = (prop) => {
    console.log(prop);
    if (!prop.dateRange || prop.dateRange.length === 0) return null;

    const { day, month, dayName } = extractDateInfo(prop.dateRange[0]);
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}`;
    const specialDay = specialDays[formattedDate];

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerDateContainer}>
          <Text style={{ width: 36 }} variant="bodySmall">
            {dayName}
          </Text>
          <Text style={{ fontSize: 18 }}>{day}</Text>
        </View>
        <View style={styles.dayEventContainer}>
          <View style={styles.onlineContainer}>
            <Image
              source={require("../../assets/icons/video.png")}
              style={styles.videoIcon}
            />
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="bodyMedium"
            >
              Online
            </Text>
          </View>
          {specialDay && (
            <View style={styles.specialDay}>
              <Text
                style={{ color: CombinedDefaultTheme.colors.background }}
                variant="labelMedium"
              >
                {specialDay}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity {...touchableOpacityProps} key={event}>
        {/* {dayjs(event.end).diff(event.start, "minute") < 32 && showTime ? (
          <Text style={eventTitleStyle}>
            {event.title},
            <Text style={eventTimeStyle}>
              {dayjs(event.start).format(ampm ? "hh:mm a" : "HH:mm")}
            </Text>
          </Text>
        ) : (
          <>
            <Text style={eventTitleStyle}>{event.title}</Text>
            {showTime && (
              <Text style={eventTimeStyle}>
                {formatStartEnd(
                  event.start,
                  event.end,
                  ampm ? "h:mm a" : "HH:mm"
                )}
              </Text>
            )}
            {event.children && event.children}
          </>
        )} */}
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.title}
        </Text>
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

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
        <Calendar
          bodyContainerStyle={{
            backgroundColor: CombinedDefaultTheme.colors.background,
          }}
          calendarCellStyle={{
            backgroundColor: CombinedDefaultTheme.colors.background,
            left: 17,
            position: "relative",
            zIndex: -1,
          }}
          eventCellStyle={(event) => ({
            backgroundColor: event.background, // Set the color dynamically
            borderRadius: Dimensions.margin / 2,
            // marginBottom: 4,
            marginLeft: 18,
            marginTop: 0,
            maxWidth: "96%",
            paddingHorizontal: Dimensions.padding / 1.33,
            paddingVertical: Dimensions.padding / 2.66,
          })}
          headerContentStyle={
            {
              // backgroundColor: "red",
              // alignSelf: "baseline",
              // position: "absolute",
              // left: 0,
            }
          }
          ampm={true}
          events={events}
          height={Dimensions.screenHeight}
          hourRowHeight={52}
          hourStyle={styles.hourStyle}
          mode="day"
          renderEvent={renderEvent}
          renderHeader={renderHeader}
          swipeEnabled={true}
          theme={theme}
          // theme={{ nowIndicator: "yellow" }}
        />
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
  dayEventContainer: {
    flex: 1,
    flexDirection: "column",
    gap: Dimensions.margin / 4,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.background,
    // backgroundColor: "red",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    width: Dimensions.screenWidth,
    zIndex: 3,
  },
  headerDateContainer: {
    alignSelf: "baseline",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    maxWidth: 68,
    minWidth: 68,
    paddingHorizontal: Dimensions.padding * 1.375,
    paddingVertical: Dimensions.padding,
  },
  hourStyle: {
    backgroundColor: "#FFF",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    bottom: 6,
    fontSize: 11,
    height: "100%",
    left: 0,
    maxWidth: 68,
    minWidth: 68,
    // position: "absolute",
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
  specialDay: {
    backgroundColor: palette.success700,
    borderRadius: Dimensions.margin / 2,
    // flex: 1,
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

export default Calender;
