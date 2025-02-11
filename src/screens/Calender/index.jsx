import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Calendar as Calendars } from "react-native-calendars";
import { Appbar, Avatar, Portal, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  Dimensions,
  events,
  RouteNames,
  specialDays,
  today,
} from "../../utils/constant";

const theme = {
  palette: {
    gray: {
      grey200: palette.grey200,
    },
    nowIndicator: palette.primaryStudent400,
  },
};
// function extractDateInfo(dateRange) {
//   const date = new Date(dateRange[0]); // Convert string to Date object

//   const day = date.getDate(); // Get the day of the month
//   const month = date.getMonth() + 1; // Months are zero-based, so add 1
//   const dayName = date.toLocaleString("en-US", { weekday: "short" }); // Get short day name (Tue)

//   return { day, dayName, month };
// }

const Calender = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    const d2 = new Date(date2).toISOString().split("T")[0];

    return setIsToday(d1 === d2);
  };
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };
  const extractDateInfo = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayName = date.toLocaleString("en-US", { weekday: "short" });

    return { day, dayName, month };
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
          <View
            style={{
              alignItems: "center",
              gap: Dimensions.margin / 4,
              width: 36,
            }}
          >
            <Text
              style={{
                color: isToday
                  ? CombinedDefaultTheme.colors.primary
                  : palette.grey900,
                maxWidth: 36,
              }}
              variant="bodySmall"
            >
              {dayName}
            </Text>
            <View
              style={{
                alignItems: "center",
                backgroundColor: isToday
                  ? CombinedDefaultTheme.colors.primary
                  : palette.transparent,
                borderRadius: Dimensions.margin * 4,
                paddingVertical: Dimensions.margin / 4,
                width: 32,
              }}
            >
              <Text
                style={{
                  color: isToday
                    ? CombinedDefaultTheme.colors.background
                    : palette.grey900,
                  fontSize: 18,
                }}
              >
                {day}
              </Text>
            </View>
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
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.title}
        </Text>
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (selectedDate) {
      isSameDate(selectedDate, today);
    }
  }, [selectedDate]); // Runs when selectedDate changes

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content
          title={
            <View style={{}}>
              <TouchableOpacity
                style={styles.monthContainer}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text variant="titleMedium">{getMonthName(selectedDate)}</Text>
                <Image
                  source={require("../../assets/icons/chevron_down.png")}
                  style={styles.downIcon}
                />
              </TouchableOpacity>

              {showDropdown && (
                <Portal>
                  <View
                    style={{
                      // position: "absolute",
                      left: 0,
                      right: 0,
                      top: Dimensions.padding * 6.5,
                    }}
                  >
                    <Calendars
                      hideArrows
                      current={selectedDate.toISOString().split("T")[0]} // Format to YYYY-MM-DD
                      enableSwipeMonths={true}
                      firstDay={1}
                      renderHeader={() => null}
                      onDayPress={(date) => {
                        setSelectedDate(new Date(date.dateString));
                        setShowDropdown(false);
                      }}
                      onMonthChange={(month) => {
                        setSelectedDate(
                          // eslint-disable-next-line prettier/prettier
                          new Date(month.year, month.month - 1, 1)
                        );
                      }}
                    />
                  </View>
                </Portal>
              )}
            </View>
          }
        />
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
            marginTop: Dimensions.margin * 4.375,
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
          ampm={true}
          date={selectedDate}
          events={events}
          headerContentStyle={{}}
          height={Dimensions.screenHeight}
          hourRowHeight={52}
          hourStyle={styles.hourStyle}
          mode="day"
          renderEvent={renderEvent}
          renderHeader={renderHeader}
          swipeEnabled={true}
          theme={theme}
          // minHour={7}
          onSwipeEnd={(date) => {
            setSelectedDate(date);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    position: "relative",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  currentDateText: {
    fontSize: 18,
    lineHeight: 28,
  },
  currentDayContainer: {
    borderRightWidth: 1,
    maxWidth: 36,
    minWidth: 36,
  },
  dayAndTaskContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flexDirection: "row",
    minHeight: 54,
    paddingHorizontal: Dimensions.padding,
  },
  dayEventContainer: {
    flex: 1,
    flexDirection: "column",
    gap: Dimensions.margin / 4,
  },
  downIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRightWidth: 1,
    flex: 1,
    flexDirection: "row",
    maxHeight: 70,
    position: "absolute",
    width: Dimensions.screenWidth,
    zIndex: 3,
  },
  headerDateContainer: {
    // alignSelf: "baseline",
    alignItems: "center",
    borderColor: palette.grey200,
    borderRightWidth: 1,
    // justifyContent: "center",
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
    zIndex: 10,
  },
  monthContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    position: "relative",
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
