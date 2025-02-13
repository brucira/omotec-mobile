import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-big-calendar";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, monthly_events } from "../../utils/constant";

const Monthly = ({ selectedDate, setSelectedDate }) => {
  const renderMontlyEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        key={event.start.toISOString()}
      >
        <Text
          numberOfLines={1}
          style={{ color: CombinedDefaultTheme.colors.background }}
        >
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.contentContainer}>
      <Calendar
        calendarCellStyle={{
          backgroundColor: CombinedDefaultTheme.colors.background,
          gap: Dimensions.margin / 4,
        }}
        eventCellStyle={(event) => ({
          backgroundColor: event.specialDay
            ? palette.success700
            : event.background,
          borderRadius: Dimensions.margin / 2.66,
        })}
        headerContainerStyle={{
          backgroundColor: CombinedDefaultTheme.colors.background,
        }}
        date={selectedDate}
        events={monthly_events}
        height={600}
        hideNowIndicator={false}
        maxVisibleEventCount={2}
        // renderCustomDateForMonth={(date) => <Text>{date.getDate()}</Text>}
        mode="month"
        renderEvent={renderMontlyEvent}
        // showAllDayEventCell={true}
        // eventsAreSorted={true}
        sortedMonthView={true}
        weekStartsOn={0}
        // weekDayHeaderHighlightColor={"red"}
        onSwipeEnd={(date) => {
          setSelectedDate(date);
        }}
      />
    </View>
  );
};

export default Monthly;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
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
