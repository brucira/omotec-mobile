import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Calendar as Calendars } from "react-native-calendars";
import { Appbar, Avatar, Portal, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  allDayEvents,
  Dimensions,
  events,
  RouteNames,
  specialDays,
  today,
  week_events,
  weekEvents,
} from "../../utils/constant";

const theme = {
  palette: {
    gray: {
      grey200: palette.grey200,
    },
    nowIndicator: palette.primaryStudent400,
  },
};
const dayMap = ["S", "M", "T", "W", "T", "F", "S"];
const session_line_width = Dimensions.screenWidth / 24;
const session_duration = (Dimensions.screenWidth / 8) * 4;
// const session_duration = 48 * 2;
const Calender = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1).toISOString().split("T")[0];
    const d2 = new Date(date2).toISOString().split("T")[0];

    return setIsToday(d1 === d2);
  };
  const selected = selectedDate.toISOString().split("T")[0];

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
                paddingVertical: Dimensions.margin / 3.5,
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
              variant="labelMedium"
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
  const renderWeekHeader = (prop) => {
    if (!prop.dateRange || prop.dateRange.length === 0) return null;
    const { day, month, dayName } = extractDateInfo(prop.dateRange[0]);
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}`;
    const specialDay = specialDays[formattedDate];
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
          {prop.dateRange.map((date) => {
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
                    {
                      // backgroundColor: CombinedDefaultTheme.colors.primary,
                      backgroundColor: !shouldHighlight
                        ? CombinedDefaultTheme.colors.background
                        : CombinedDefaultTheme.colors.primary,
                      borderRadius: Dimensions.margin / 2,
                      fontSize: 10,
                      justifyContent: "space-between",
                      marginHorizontal: Dimensions.margin / 3,
                      paddingTop: Dimensions.padding / 2.66,
                    },
                  ]}
                >
                  <Text
                    style={[
                      { textAlign: "center" },
                      {
                        color: !shouldHighlight
                          ? palette.grey500
                          : CombinedDefaultTheme.colors.background,
                      },
                    ]}
                  >
                    {date.format("dd")}
                  </Text>
                  <View
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      borderRadius: 40,
                      height: 36,
                      justifyContent: "center",
                      width: 36,
                      zIndex: 10,
                    }}
                  >
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
                  style={{
                    // backgroundColor: "red",
                    borderColor: palette.grey200,
                    borderLeftWidth: 1,
                    height: 24,
                    marginTop: hasSpecialDay ? Dimensions.margin : 0,
                    position: "relative",
                  }}
                >
                  {specialDay && (
                    <TouchableOpacity
                      style={[styles.eventCellCss, "red", { bottom: 4 }]}
                    >
                      <Text
                        style={{
                          backgroundColor: palette.success700,
                          color: CombinedDefaultTheme.colors.background,
                          height: 24,
                          paddingLeft: Dimensions.padding / 2,
                          paddingVertical: Dimensions.padding / 4,
                        }}
                        numberOfLines={1}
                        variant="labelSmall"
                      >
                        {specialDay}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
  const renderWeekEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity {...touchableOpacityProps} key={event}>
        <Text style={{ color: CombinedDefaultTheme.colors.background }}>
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (selectedDate) {
      isSameDate(selectedDate, today);
    }
  }, [selectedDate]);

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
                      markedDates={{
                        [selected]: {
                          selected: true,
                          selectedColor: CombinedDefaultTheme.colors.primary,
                        },
                        [today.toISOString().split("T")[0]]:
                          selected === today.toISOString().split("T")[0]
                            ? {
                                dotColor: palette.grey25,
                                marked: true,
                                selected: true,
                                selectedColor:
                                  CombinedDefaultTheme.colors.primary,
                              }
                            : { dotColor: palette.grey900, marked: true },
                      }}
                      theme={{
                        todayTextColor: palette.grey900,
                      }}
                      current={selected}
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

      {/* <View style={styles.contentContainer}>
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
      </View> */}

      <View style={styles.contentContainer}>
        <Calendar
          bodyContainerStyle={{
            backgroundColor: CombinedDefaultTheme.colors.background,
            // marginTop: Dimensions.margin * 1.375,
          }}
          calendarCellStyle={{
            backgroundColor: CombinedDefaultTheme.colors.background,
            // left: 17,
            position: "relative",
            zIndex: -1,
          }}
          eventCellStyle={(event) => ({
            backgroundColor: event.background,
            borderRadius: Dimensions.margin / 2,
            gap: Dimensions.margin / 2,
            marginTop: 0,
            // paddingHorizontal: Dimensions.padding / 1.33,
            paddingVertical: Dimensions.padding / 2.66,
          })}
          ampm={true}
          date={selectedDate}
          events={events}
          headerContentStyle={{}}
          height={Dimensions.screenHeight}
          hourRowHeight={52}
          mode="week"
          renderEvent={renderWeekEvent}
          renderHeader={renderWeekHeader}
          showAllDayEventCell={true}
          swipeEnabled={true}
          theme={theme}
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
    flexDirection: "row",
    gap: Dimensions.margin / 4,
  },
  downIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
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
  shadowAndroid: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    bottom: -25,
    height: 10,
    position: "absolute",
    width: Dimensions.screenWidth,
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
    borderRightWidth: 1,
    elevation: 4,
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
    borderRightWidth: 1,
    maxWidth: 50,
    minWidth: 50,
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

export default Calender;
