import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  calendarTheme,
  Dimensions,
  events,
  specialDays,
} from "../../utils/constant";

const session_line_width = Dimensions.screenWidth / 24;
const session_duration = (Dimensions.screenWidth / 8) * 4;
const Weekly = ({ isToday, selectedDate, setSelectedDate }) => {
  const selected = selectedDate.toISOString().split("T")[0];

  const extractDateInfo = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayName = date.toLocaleString("en-US", { weekday: "short" });

    return { day, dayName, month };
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
  return (
    <View style={styles.contentContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
          overlapOffset={0}
          renderEvent={renderWeekEvent}
          renderHeader={renderWeekHeader}
          showAllDayEventCell={true}
          swipeEnabled={true}
          theme={calendarTheme}
          onSwipeEnd={(date) => {
            setSelectedDate(date);
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // borderRightWidth: 1,
    maxWidth: 49.5,
    minWidth: 49.5,
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
