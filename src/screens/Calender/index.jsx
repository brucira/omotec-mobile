import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Calendar as Calendars } from "react-native-calendars";
import { Appbar, Avatar, Portal, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames, today } from "../../utils/constant";
import Daily from "./Daily";
import Monthly from "./Monthly";
import Weekly from "./Weekly";

// const dayMap = ["S", "M", "T", "W", "T", "F", "S"];
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
      <Daily
        isToday={isToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* <Weekly
        isToday={isToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /> */}

      {/* <Monthly selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
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
