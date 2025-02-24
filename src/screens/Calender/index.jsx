import Checkbox from "expo-checkbox";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar as Calendars } from "react-native-calendars";
import { Appbar, Avatar, Divider, Portal, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames, today } from "../../utils/constant";
import Daily from "./Daily";
import Monthly from "./Monthly";
import Weekly from "./Weekly";

// const dayMap = ["S", "M", "T", "W", "T", "F", "S"];
// const session_duration = 48 * 2;
const MONTH_VIEW = "Month";
const WEEK_VIEW = "Week";
const DAILY_VIEW = "Day";
const Calender = ({ navigation }) => {
  const viewData = [
    {
      icon: require("../../assets/icons/day.png"),
      onPress: () => {
        setCalendarView(DAILY_VIEW);
        bottomSheetModalRef.current?.close();
      },
      title: "Day",
    },
    {
      icon: require("../../assets/icons/week.png"),
      onPress: () => {
        setCalendarView(WEEK_VIEW);
        bottomSheetModalRef.current?.close();
      },
      title: "Week",
    },
    {
      icon: require("../../assets/icons/table_grid.png"),
      onPress: () => {
        setCalendarView(MONTH_VIEW);
        bottomSheetModalRef.current?.close();
      },
      title: "Month",
    },
  ];

  const [isUpcomingChecked, setIsUpcomingChecked] = useState(false);
  const [isOngoingChecked, setIsOngoingChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [calendarView, setCalendarView] = useState(DAILY_VIEW);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const bottomSheetModalRef = useRef(null);
  const toggleOngoingCheckbox = () => setIsOngoingChecked((prev) => !prev);
  const toggleUpcomingCheckbox = () => setIsUpcomingChecked((prev) => !prev);

  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1).toISOString().split("T")[0];
    const d2 = new Date(date2).toISOString().split("T")[0];

    return setIsToday(d1 === d2);
  };
  const selected = selectedDate.toISOString().split("T")[0];

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const handleFilterModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleViewMap = (item, index) => {
    return (
      <TouchableOpacity
        key={item.title}
        style={[
          styles.individualViewContainer,
          {
            backgroundColor:
              calendarView === item.title ? palette.primaryStudent50 : null,
          },
        ]}
        onPress={item.onPress}
      >
        <Image
          tintColor={
            calendarView === item.title
              ? CombinedDefaultTheme.colors.primary
              : palette.grey700
          }
          source={item.icon}
          style={styles.bottomSheetIcon}
        />
        <Text
          style={{
            color:
              calendarView === item.title
                ? CombinedDefaultTheme.colors.primary
                : palette.grey900,
          }}
          variant="titleSmall"
        >
          {item.title}
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
                  style={[
                    styles.downIcon,
                    {
                      transform: [
                        { rotate: !showDropdown ? "0deg" : "180deg" },
                      ],
                    },
                  ]}
                  source={require("../../assets/icons/chevron_down.png")}
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
        <BottomDrawer ref={bottomSheetModalRef}>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.filterTitle} variant="titleMedium">
              Filters
            </Text>
            <View style={styles.viewContainer}>
              <Text style={styles.viewText} variant="labelSmall">
                VIEW
              </Text>
              {viewData.map((item, index) => handleViewMap(item, index))}
            </View>
            <Divider style={styles.divider} />
            <View style={{ paddingBottom: Dimensions.padding / 1.23 }}>
              <Text style={styles.viewText} variant="labelSmall">
                EVENT
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.individualViewContainer}
                onPress={toggleUpcomingCheckbox}
              >
                <Checkbox
                  color={
                    isUpcomingChecked
                      ? CombinedDefaultTheme.colors.primary
                      : undefined
                  }
                  style={styles.checkbox}
                  value={isUpcomingChecked}
                  onValueChange={toggleUpcomingCheckbox}
                />
                <Text
                  style={{
                    color: isUpcomingChecked
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey900,
                  }}
                  variant="titleSmall"
                >
                  Upcoming
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.individualViewContainer}
                onPress={toggleOngoingCheckbox}
              >
                <Checkbox
                  color={
                    isOngoingChecked
                      ? CombinedDefaultTheme.colors.primary
                      : undefined
                  }
                  style={styles.checkbox}
                  value={isOngoingChecked}
                  onValueChange={toggleOngoingCheckbox}
                />
                <Text
                  style={{
                    color: isOngoingChecked
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey900,
                  }}
                  variant="titleSmall"
                >
                  Ongoing
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomDrawer>
        <Appbar.Action
          icon={require("../../assets/icons/filter.png")}
          onPress={handleFilterModalPress}
        />
        <Appbar.Action
          icon={() => (
            <View style={styles.calendarIconContainer}>
              <Image
                source={require("../../assets/icons/calender.png")}
                style={styles.calendarIcon}
              />
              <Text style={styles.dateInCalendar}>
                {new Date(today).getUTCDate()}
              </Text>
            </View>
          )}
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

      {calendarView === DAILY_VIEW ? (
        <Daily
          isToday={isToday}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : calendarView === WEEK_VIEW ? (
        <Weekly
          isToday={isToday}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : (
        <Monthly
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    position: "relative",
  },
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    paddingBottom: Dimensions.padding * 1.5,
    paddingHorizontal: Dimensions.padding / 2,
  },
  bottomSheetIcon: {
    height: Dimensions.margin * 1.25,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  calendarIcon: {
    height: Dimensions.margin * 1.5,
    position: "relative",
    width: Dimensions.margin * 1.5,
  },
  calendarIconContainer: {
    position: "relative",
  },
  checkbox: {
    borderColor: palette.grey300,
    borderRadius: Dimensions.margin / 4,
  },
  container: {
    flex: 1,
  },

  dateInCalendar: {
    alignSelf: "center",
    fontSize: 8,
    // left: "38%",
    position: "absolute",
    top: "45%",
  },
  divider: {
    marginVertical: Dimensions.margin,
    paddingHorizontal: Dimensions.padding / 2,
  },
  downIcon: {
    alignItems: "center",
    height: Dimensions.margin * 1.25,
    justifyContent: "center",
    width: Dimensions.margin * 1.25,
  },
  filterTitle: {
    paddingHorizontal: Dimensions.padding / 1.33,
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
  individualViewContainer: {
    borderRadius: Dimensions.margin / 2,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  monthContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    position: "relative",
  },
  viewContainer: {
    paddingTop: Dimensions.padding / 1.23,
  },
  viewText: {
    color: palette.grey500,
    paddingBottom: Dimensions.padding / 2,
    paddingHorizontal: Dimensions.padding / 1.33,
  },
});

export default Calender;
