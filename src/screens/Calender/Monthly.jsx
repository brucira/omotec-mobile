import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Avatar, Text } from "react-native-paper";

import FullEventDetails from "../../components/FullEventDetails";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, events, today } from "../../utils/constant";

const dayMap = [
  { day: "S" }, // Sunday
  { day: "M" }, // Monday
  { day: "T" }, // Tuesday
  { day: "W" }, // Wednesday
  { day: "T" }, // Thursday (same as Tuesday)
  { day: "F" }, // Friday
  { day: "S" }, // Saturday
];
const Monthly = ({ selectedDate, setSelectedDate }) => {
  const [selectedEvent, setSelectedEvent] = useState(today);
  const [visible, setVisible] = useState(false);
  const onPressEvent = (event) => {
    setSelectedEvent(event);
    setVisible(true);
  };
  const onSwipeEnd = (date) => {
    setSelectedDate(date);
  };
  const renderMontlyEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        key={event.start.toISOString()}
      >
        <Text
          numberOfLines={1}
          style={{ color: CombinedDefaultTheme.colors.background }}
          variant="custom600_10"
        >
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = (props) => {
    return (
      <View style={styles.headerContainer}>
        {dayMap.map((day, index) => (
          <View key={index} style={styles.headerDay}>
            <Text style={{ color: palette.grey500 }} variant="custom500_10">
              {day.day}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const renderCustomDateForMonth = (props) => {
    const activeDate =
      today.toISOString().split("T")[0] === props.toISOString().split("T")[0];
    const dateObj = new Date(props);
    const dayNumber = dateObj.getUTCDate();
    return (
      <View style={{ alignSelf: "center" }}>
        <Avatar.Text
          color={
            activeDate
              ? CombinedDefaultTheme.colors.background
              : palette.grey700
          }
          style={{
            backgroundColor: activeDate
              ? CombinedDefaultTheme.colors.primary
              : CombinedDefaultTheme.colors.background,
          }}
          label={dayNumber}
          size={24}
        />
      </View>
    );
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Calendar
          activeDate={today}
          calendarCellStyle={styles.calendarCellStyle}
          date={selectedDate}
          eventCellStyle={eventCellStyle}
          events={events}
          headerContainerStyle={styles.headerContainerStyle}
          height={Dimensions.screenHeight}
          maxVisibleEventCount={3}
          mode="month"
          overlapOffset={0}
          renderCustomDateForMonth={renderCustomDateForMonth}
          renderEvent={renderMontlyEvent}
          renderHeaderForMonthView={renderHeader}
          sortedMonthView={true}
          weekStartsOn={0}
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
    </ScrollView>
  );
};

const eventCellStyle = (event) => ({
  backgroundColor: event.specialDay ? palette.success700 : event.background,
  borderRadius: Dimensions.margin / 2.66,
});
const styles = StyleSheet.create({
  calendarCellStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  headerContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flexDirection: "row",
  },
  headerContainerStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
  },
  headerDay: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    maxWidth: Dimensions.screenWidth / 7,
    minWidth: Dimensions.screenWidth / 7,
  },
  monthVideoIcon: {
    height: Dimensions.margin / 1.33,
    resizeMode: "contain",
    width: Dimensions.margin / 1.33,
    zIndex: 5,
  },
  monthVideoIconContainer: {
    backgroundColor: palette.primaryStudent50,
    borderRadius: Dimensions.margin * 4,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 4,
    position: "relative",
  },
});

export default Monthly;
