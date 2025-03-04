import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Searchbar, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import FullEventDetails from "../../components/FullEventDetails";
import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  calendarTheme,
  Dimensions,
  dropdownData,
  events,
  projectDetailTaskTabData,
  today,
} from "../../utils/constant";
import IssueDetails from "./IssueDetails";
import TaskCard from "./TaskCard";

const VIEW = "view";
const DUPLICATE = "duplicate";
const DELETE = "delete";
const ISSUE = "issue";
const TaskTab = ({ activeTab }) => {
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState(false);
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState(false);
  const [showCalendarLayout, setShowCalendarLayout] = useState(false);
  const [activeBottomItem, setActiveBottomItem] = useState(null);
  const [, setSelectedDate] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerType, setPickerType] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tempDate, setTempDate] = useState(new Date());
  const [, setSelectedStartDate] = useState(false);
  const [, setSelectedEndDate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [issueVisible, setIssueVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(today);

  const onSwipeEnd = (date) => {
    setSelectedDate(date);
  };
  const handleBottomIconPress = (display) => {
    setActiveBottomItem(display);
    if (display === VIEW) {
      setVisible(true);
      eventBottomSheetModalRef.current?.close();
    }
    if (display === ISSUE) {
      setIssueVisible(true);
      eventBottomSheetModalRef.current?.close();
    }
  };
  // const onPressEvent = (event) => {
  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);

  //   return (
  //     <Pressable onPress={showModal}>
  //       <FullEventDetails hideModal={hideModal} visible={visible} />
  //     </Pressable>
  //   );
  // };

  const onPressEvent = (event) => {
    setSelectedEvent(event);
    handleEventPress();
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
  const handleLayoutChange = () => {
    setShowCalendarLayout((prev) => !prev);
  };

  const showPicker = (type) => {
    setPickerType(type);
    setTempDate(
      // eslint-disable-next-line prettier/prettier
      type === "start" ? startDate || new Date() : endDate || new Date()
    );
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    if (Platform.OS === "android") {
      setIsPickerShow(false);
      if (value) {
        if (pickerType === "start") {
          setStartDate(value);
          setSelectedStartDate(true);
        } else {
          setEndDate(value);
          setSelectedEndDate(true);
        }
      }
    } else {
      if (value) {
        setTempDate(value);
      }
    }
  };

  const confirmDate = () => {
    if (pickerType === "start") {
      setStartDate(tempDate);
      setSelectedStartDate(true);
    } else {
      setEndDate(tempDate);
      setSelectedEndDate(true);
    }
    setIsPickerShow(false);
  };

  const bottomSheetModalRef = useRef(null);
  const eventBottomSheetModalRef = useRef(null);
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const toggleStatusCheckbox = () => setIsStatusChecked((prev) => !prev);
  const handleFilterModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleEventPress = useCallback(() => {
    eventBottomSheetModalRef.current?.present();
  }, []);
  const renderTaskItem = useCallback(
    ({ item }) => <TaskCard {...item} />,
    // eslint-disable-next-line prettier/prettier
    []
  );
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );
  return (
    <View style={{ flex: 1, marginBottom: Dimensions.margin * 1.5 }}>
      <View style={styles.searchContainer}>
        <Searchbar
          icon={renderSearchIcon}
          inputStyle={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={palette.grey400}
          //   right={renderRightIcon}
          style={styles.searchBar}
        />
        <View style={{ flexDirection: "row", gap: Dimensions.margin * 1.25 }}>
          {showCalendarLayout ? (
            <TouchableOpacity onPress={handleLayoutChange}>
              <Image
                source={require("../../assets/icons/table_grid.png")}
                style={styles.customizeIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLayoutChange}>
              <Text style={styles.dateInCalendar}>
                {new Date(today).getUTCDate()}
              </Text>
              <Image
                source={require("../../assets/icons/calender.png")}
                style={styles.customizeIcon}
              />
            </TouchableOpacity>
          )}

          <Pressable onPress={handleFilterModalPress}>
            <Image
              source={require("../../assets/icons/filter_two.png")}
              style={styles.customizeIcon}
            />
          </Pressable>
        </View>
      </View>

      {!showCalendarLayout ? (
        <FlatList
          contentContainerStyle={styles.arrowIndicator}
          data={projectDetailTaskTabData}
          ItemSeparatorComponent={itemSeperator}
          keyExtractor={keyExtractor}
          renderItem={renderTaskItem}
          showsVerticalScrollIndicator={false}
          style={styles.ongoingCardList}
        />
      ) : (
        <View style={styles.contentContainer}>
          <Calendar
            ampm={true}
            calendarCellStyle={{ borderBottomWidth: 0 }}
            date={today}
            eventCellStyle={eventCellStyle}
            events={events}
            height={Dimensions.screenHeight}
            hideHours={true}
            mode="custom"
            overlapOffset={0}
            renderEvent={renderEvent}
            showAllDayEventCell={false}
            swipeEnabled={true}
            theme={calendarTheme}
            weekEndsOn={5}
            weekStartsOn={1}
            // renderHeader={renderHeader}
            onPressEvent={onPressEvent}
            onSwipeEnd={onSwipeEnd}
          />
          <BottomDrawer ref={eventBottomSheetModalRef}>
            <View style={styles.bottomSheetContainer}>
              <TouchableOpacity
                style={[
                  styles.buttomIndividualContent,
                  {
                    backgroundColor:
                      activeBottomItem === VIEW
                        ? palette.primaryStudent50
                        : "transparent",
                  },
                ]}
                onPress={() => handleBottomIconPress("view")}
              >
                <Image
                  tintColor={
                    activeBottomItem === VIEW
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey700
                  }
                  source={require("../../assets/icons/eye.png")}
                  style={styles.calendarIcon}
                />
                <Text
                  style={[
                    {
                      color:
                        activeBottomItem === VIEW
                          ? CombinedDefaultTheme.colors.primary
                          : palette.grey700,
                    },
                  ]}
                >
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttomIndividualContent,
                  {
                    backgroundColor:
                      activeBottomItem === DELETE
                        ? palette.primaryStudent50
                        : "transparent",
                  },
                ]}
                onPress={() => handleBottomIconPress("delete")}
              >
                <Image
                  tintColor={
                    activeBottomItem === DELETE
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey700
                  }
                  source={require("../../assets/icons/trash.png")}
                  style={styles.calendarIcon}
                />
                <Text
                  style={[
                    {
                      color:
                        activeBottomItem === DELETE
                          ? CombinedDefaultTheme.colors.primary
                          : palette.grey700,
                    },
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttomIndividualContent,
                  {
                    backgroundColor:
                      activeBottomItem === DUPLICATE
                        ? palette.primaryStudent50
                        : "transparent",
                  },
                ]}
                onPress={() => handleBottomIconPress("duplicate")}
              >
                <Image
                  tintColor={
                    activeBottomItem === DUPLICATE
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey700
                  }
                  source={require("../../assets/icons/copy.png")}
                  style={styles.calendarIcon}
                />
                <Text
                  style={[
                    {
                      color:
                        activeBottomItem === DUPLICATE
                          ? CombinedDefaultTheme.colors.primary
                          : palette.grey700,
                    },
                  ]}
                >
                  Duplicate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttomIndividualContent,
                  {
                    backgroundColor:
                      activeBottomItem === ISSUE
                        ? palette.primaryStudent50
                        : "transparent",
                  },
                ]}
                onPress={() => handleBottomIconPress(ISSUE)}
              >
                <Image
                  tintColor={
                    activeBottomItem === ISSUE
                      ? CombinedDefaultTheme.colors.primary
                      : palette.grey700
                  }
                  source={require("../../assets/icons/alert_circle.png")}
                  style={styles.calendarIcon}
                />
                <Text
                  style={[
                    {
                      color:
                        activeBottomItem === ISSUE
                          ? CombinedDefaultTheme.colors.primary
                          : palette.grey700,
                    },
                  ]}
                >
                  Issue
                </Text>
              </TouchableOpacity>
            </View>
          </BottomDrawer>
          <FullEventDetails
            event={selectedEvent}
            hideModal={() => setVisible(false)}
            showAttendance={false}
            visible={visible}
          />
          <IssueDetails
            event={selectedEvent}
            hideModal={() => setIssueVisible(false)}
            visible={issueVisible}
          />
        </View>
      )}

      <BottomDrawer ref={bottomSheetModalRef}>
        <View style={styles.bottomSheetContainer}>
          <Text variant="titleMedium">Sort & Filters</Text>
          <View style={styles.sortAndFilterContainer}>
            <View>
              <Text variant="labelSmall">SORT BY</Text>
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.individualViewContainer}
                  onPress={toggleStatusCheckbox}
                >
                  <Checkbox
                    color={
                      isStatusChecked
                        ? CombinedDefaultTheme.colors.primary
                        : undefined
                    }
                    style={styles.checkbox}
                    value={isStatusChecked}
                    onValueChange={toggleStatusCheckbox}
                  />
                  <Text
                    style={{
                      color: isStatusChecked
                        ? CombinedDefaultTheme.colors.primary
                        : palette.grey900,
                    }}
                    variant="titleSmall"
                  >
                    Ongoing
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.individualViewContainer}
                  onPress={toggleStatusCheckbox}
                >
                  <Checkbox
                    color={
                      isStatusChecked
                        ? CombinedDefaultTheme.colors.primary
                        : undefined
                    }
                    style={styles.checkbox}
                    value={isStatusChecked}
                    onValueChange={toggleStatusCheckbox}
                  />
                  <Text
                    style={{
                      color: isStatusChecked
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
            <View
              style={{
                gap: Dimensions.margin * 1.25,
                paddingTop: Dimensions.margin * 1.25,
              }}
            >
              <Text variant="labelSmall">FILTERS</Text>

              {Platform.OS === "ios" && isPickerShow && (
                <Modal transparent animationType="fade" visible={isPickerShow}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <DateTimePicker
                        display="inline"
                        mode="date"
                        themeVariant="light"
                        value={tempDate}
                        onChange={onChange}
                      />
                      <Button mode="text" onPress={confirmDate}>
                        Done
                      </Button>
                    </View>
                  </View>
                </Modal>
              )}

              {isPickerShow && Platform.OS === "android" && (
                <DateTimePicker
                  display="default"
                  mode="date"
                  value={tempDate}
                  onChange={onChange}
                />
              )}

              <Pressable onPress={() => showPicker("start")}>
                <Text variant="titleSmall">Start Date</Text>
                <View style={styles.calendarContainer}>
                  <Image
                    source={require("../../assets/icons/calender.png")}
                    style={styles.calendarIcon}
                    tintColor={palette.grey700}
                  />
                  <Text style={{ color: palette.grey400 }} variant="bodyMedium">
                    {startDate
                      ? startDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Start Date"}
                  </Text>
                </View>
              </Pressable>

              <Pressable onPress={() => showPicker("end")}>
                <Text variant="titleSmall">Due Date</Text>
                <View style={styles.calendarContainer}>
                  <Image
                    source={require("../../assets/icons/calender.png")}
                    style={styles.calendarIcon}
                    tintColor={palette.grey700}
                  />
                  <Text style={{ color: palette.grey400 }} variant="bodyMedium">
                    {endDate
                      ? endDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Due Date"}
                  </Text>
                </View>
              </Pressable>

              <View>
                <Text variant="titleSmall">Task Name</Text>
                <Dropdown
                  search
                  renderRightIcon={() => (
                    <Image
                      color={focusOfFirstDropdown ? "blue" : "black"}
                      // name="Safety"
                      source={require("../../assets/icons/chevron_down.png")}
                      // size={20}
                      style={styles.iconStyle}
                    />
                  )}
                  style={[
                    styles.singleList,
                    focusOfFirstDropdown && { borderColor: "blue" },
                    // { minWidth: dropdownNumber > 1 ? "49%" : "100%" },
                  ]}
                  data={dropdownData}
                  iconStyle={styles.iconStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  labelField="label"
                  maxHeight={300}
                  placeholder={!focusOfFirstDropdown ? "Select item" : "..."}
                  placeholderStyle={styles.placeholderStyle}
                  searchPlaceholder="Search..."
                  selectedTextStyle={styles.selectedTextStyle}
                  value={valueOfFirstDropdown}
                  valueField="value"
                  onChange={(item) => {
                    setValueOfFirstDropdown(item.value);
                    setFocusOfFirstDropdown(false);
                  }}
                  onBlur={() => setFocusOfFirstDropdown(false)}
                  onFocus={() => setFocusOfFirstDropdown(true)}
                />
              </View>
              <View>
                <Text variant="titleSmall">Status</Text>
                <Dropdown
                  search
                  renderRightIcon={() => (
                    <Image
                      color={focusOfFirstDropdown ? "blue" : "black"}
                      source={require("../../assets/icons/chevron_down.png")}
                      style={styles.iconStyle}
                    />
                  )}
                  style={[
                    styles.singleList,
                    focusOfFirstDropdown && { borderColor: "blue" },
                    // { minWidth: dropdownNumber > 1 ? "49%" : "100%" },
                  ]}
                  data={dropdownData}
                  iconStyle={styles.iconStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  labelField="label"
                  maxHeight={300}
                  placeholder={!focusOfFirstDropdown ? "Select item" : "..."}
                  placeholderStyle={styles.placeholderStyle}
                  searchPlaceholder="Search..."
                  selectedTextStyle={styles.selectedTextStyle}
                  value={valueOfFirstDropdown}
                  valueField="value"
                  onChange={(item) => {
                    setValueOfFirstDropdown(item.value);
                    setFocusOfFirstDropdown(false);
                  }}
                  onBlur={() => setFocusOfFirstDropdown(false)}
                  onFocus={() => setFocusOfFirstDropdown(true)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.filterBottomContainer}>
          <PrimaryButton
            backgroundColor={palette.grey100}
            borderColor={palette.grey200}
            content={"Clear"}
            textColor={palette.grey900}
          />

          <PrimaryButton
            backgroundColor={palette.primaryStudent200}
            borderColor={palette.primaryStudent300}
            content={"Apply"}
            textColor={CombinedDefaultTheme.colors.background}
          />
        </View>
      </BottomDrawer>
    </View>
  );
};

const eventCellStyle = (event) => ({
  backgroundColor: event.background,
  borderRadius: Dimensions.margin / 2,
  // marginBottom: 4,
  marginLeft: 0,
  marginRight: 1,
  marginTop: 0,
  // maxWidth: "96%",
  paddingHorizontal: Dimensions.padding / 1.33,
  paddingVertical: Dimensions.padding / 2.66,
});
const styles = StyleSheet.create({
  bodyContainerStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    marginTop: Dimensions.margin * 4.375,
  },
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    // paddingBottom: Dimensions.padding * 1.5,
    marginBottom: Dimensions.margin * 4.375,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding / 1.33,
  },
  buttomIndividualContent: {
    borderRadius: Dimensions.margin / 2,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 2,
  },
  calendarCellStyle: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    left: 17,
    position: "relative",
    zIndex: -1,
  },
  calendarContainer: {
    alignItems: "center",
    elevation: 4,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    marginTop: Dimensions.padding / 2.66,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  calendarIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  checkbox: {
    borderColor: palette.grey300,
    borderRadius: Dimensions.margin / 4,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    zIndex: 0,
  },
  customizeIcon: {
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
  },
  dateInCalendar: {
    alignSelf: "center",
    fontSize: 8,
    // left: "38%",
    position: "absolute",
    top: "45%",
  },
  datePicker: {
    // backgroundColor: "red",
    // color: "#000",
    // width: 320,
    // height: 260,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "flex-start",
    // position: "absolute",
  },
  filterBottomContainer: {
    borderColor: palette.grey200,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  iconStyle: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  individualViewContainer: {
    borderRadius: Dimensions.margin / 2,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding / 2,
  },
  itemSeparator: {
    height: Dimensions.margin / 1.33,
  },

  leftIcon: {
    height: Dimensions.margin / 1.5,
    resizeMode: "contain",
    width: Dimensions.margin / 1.5,
  },
  lens: {
    height: Dimensions.margin * 1.25,
    left: Dimensions.margin / 4,
    marginLeft: 0,
    paddingLeft: 0,
    position: "absolute",
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: Dimensions.margin / 1.6,
    padding: Dimensions.padding * 1.25,
  },
  rightIcon: {
    height: Dimensions.margin,
    marginLeft: 0,
    paddingLeft: 0,
    position: "absolute",
    resizeMode: "contain",
    right: Dimensions.margin,
    width: Dimensions.margin,
  },
  searchBar: {
    backgroundColor: palette.grey25,
    borderColor: palette.grey200,
    borderWidth: 1,
    flex: 1,
    marginLeft: 0,
    marginVertical: Dimensions.margin * 1.25,
    maxHeight: 40,
    minHeight: 40,
    paddingLeft: 0,
    width: "auto",
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin * 1.25,
    justifyContent: "space-between",
  },
  searchInput: {
    color: palette.grey900,
    fontSize: 14,
    left: -(Dimensions.margin / 1.33),
    marginLeft: 0,
    marginRight: 0,
    minHeight: 0,
    paddingVertical: 0,
    position: "relative",
  },
  singleList: {
    marginTop: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding / 2,
  },
  sortAndFilterContainer: {
    marginTop: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding,
  },
});

export default TaskTab;
