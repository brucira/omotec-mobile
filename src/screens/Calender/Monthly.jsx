import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FullEventDetails from "../../components/FullEventDetails";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, events, today } from "../../utils/constant";

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
        >
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.contentContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Calendar
          calendarCellStyle={styles.calendarCellStyle}
          date={selectedDate}
          eventCellStyle={eventCellStyle}
          events={events}
          headerContainerStyle={styles.headerContainerStyle}
          height={Dimensions.screenHeight}
          hideNowIndicator={false}
          maxVisibleEventCount={3}
          mode="month"
          overlapOffset={0}
          renderEvent={renderMontlyEvent}
          sortedMonthView={true}
          // bodyContainerStyle={{
          //   flex: 1,
          //   height: "100%",
          // }}
          // showAllDayEventCell={true}
          // eventsAreSorted={true}
          // renderCustomDateForMonth={(date) => <Text>{date.getDate()}</Text>}
          weekStartsOn={0}
          onPressEvent={onPressEvent}
          // weekDayHeaderHighlightColor={"red"}
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
    gap: Dimensions.margin / 4,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  headerContainerStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
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
