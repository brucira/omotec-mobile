import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import React, { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Button, Searchbar, Surface, Text } from "react-native-paper";

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
import { taskFilterSchema } from "../../utils/schema";
import IssueDetails from "./IssueDetails";
import TaskCard from "./TaskCard";

const VIEW = "view";
const DUPLICATE = "duplicate";
const DELETE = "delete";
const ISSUE = "issue";
const TaskTab = ({ activeTab }) => {
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState(false);
  const [focusOfStatusDropdown, setFocusOfStatusDropdown] = useState(false);
  const [showCalendarLayout, setShowCalendarLayout] = useState(false);
  const [activeBottomItem, setActiveBottomItem] = useState(null);
  const [, setSelectedDate] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerType, setPickerType] = useState(null);
  const [tempDate, setTempDate] = useState(new Date());
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

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      endDate: null,
      modified: false,
      // onGoing: false,
      startDate: null,
      status: false,
      statusState: "",
      taskName: "",
    },
    resolver: zodResolver(taskFilterSchema),
  });

  const onSubmit = (data) => console.log(data);
  const watchFields = watch([
    "endDate",
    "modified",
    "startDate",
    "status",
    "statusState",
    "taskName",
  ]);

  const isFormChanged =
    JSON.stringify(watchFields) !==
    JSON.stringify([null, false, null, false, "", ""]);
  const handleClear = () => {
    reset();
  };

  const onPressEvent = (event) => {
    setSelectedEvent(event);
    handleEventPress();
  };

  const renderEvent = (event, touchableOpacityProps) => {
    return (
      <TouchableOpacity {...touchableOpacityProps} key={event}>
        <Text
          style={{
            color: CombinedDefaultTheme.colors.background,
            lineHeight: Dimensions.margin,
          }}
          variant="custom600_12"
        >
          {event.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleLayoutChange = () => {
    setShowCalendarLayout((prev) => !prev);
  };

  const showPicker = (type) => {
    setPickerType(type);
    setTempDate(watch(type) || new Date());
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    if (Platform.OS === "android") {
      setIsPickerShow(false);
      if (value) {
        setValue(pickerType, value);
      }
    } else {
      if (value) {
        setTempDate(value);
      }
    }
  };

  const confirmDate = () => {
    setValue(pickerType, tempDate);
    setIsPickerShow(false);
  };

  const dayMap = {
    0: "S", // Sunday
    1: "M", // Monday
    2: "T", // Tuesday
    3: "W", // Wednesday
    4: "T", // Thursday (same as Tuesday)
    5: "F", // Friday
    6: "S", // Saturday
  };
  const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderHeader = (prop) => {
    const firstDateObj = new Date(prop.dateRange[0]);
    const monthName = monthMap[firstDateObj.getUTCMonth()];
    const year = firstDateObj.getUTCFullYear();
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text
            style={{ color: palette.grey900 }}
            variant="labelMedium"
          >{`${monthName} ${year}`}</Text>
        </View>
        <View style={styles.individualDateHeaderContainer}>
          {prop.dateRange.map((item, index) => {
            const dateObj = new Date(item);
            const dayLetter = dayMap[dateObj.getUTCDay()];
            const dayNumber = dateObj.getUTCDate();

            const activeDate =
              prop.activeDate.toISOString().split("T")[0] ===
              item.toISOString().split("T")[0];
            return (
              <View key={index} style={styles.individualDateHeader}>
                <Text
                  style={[
                    {
                      color: activeDate
                        ? CombinedDefaultTheme.colors.primary
                        : palette.grey500,
                    },
                    styles.headerCalendarHeader,
                  ]}
                  variant="bodySmall"
                >
                  {`${dayLetter}`}{" "}
                  <Text
                    style={[
                      {
                        color: activeDate
                          ? CombinedDefaultTheme.colors.primary
                          : palette.grey800,
                      },
                      styles.headerCalendarHeader,
                    ]}
                    variant="bodySmall"
                  >{`${dayNumber}`}</Text>{" "}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const bottomSheetModalRef = useRef(null);
  const eventBottomSheetModalRef = useRef(null);
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const handleFilterModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleEventPress = useCallback(() => {
    eventBottomSheetModalRef.current?.present();
  }, []);
  const renderTaskItem = useCallback(
    ({ item }) => (
      <View
        style={{
          paddingHorizontal: Dimensions.padding,
        }}
      >
        <TaskCard {...item} />
      </View>
    ),
    // eslint-disable-next-line prettier/prettier
    []
  );
  const renderRightIcon = () => (
    <Image
      source={require("../../assets/icons/mic.png")}
      style={styles.lens}
      tintColor={palette.grey500}
    />
  );
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.searchLens}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Searchbar
          icon={renderSearchIcon}
          inputStyle={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={palette.grey400}
          right={showCalendarLayout ? renderRightIcon : null}
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
              <Text style={styles.dateInCalendar} variant="custom600_8">
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
          // ItemSeparatorComponent={itemSeperator}
          keyExtractor={keyExtractor}
          renderItem={renderTaskItem}
          showsVerticalScrollIndicator={false}
          style={styles.ongoingCardList}
        />
      ) : (
        <View style={styles.contentContainer}>
          <Calendar
            activeDate={today}
            ampm={true}
            bodyContainerStyle={styles.calendarBodyContainerStyle}
            calendarCellStyle={{ borderBottomWidth: 0 }}
            date={today}
            eventCellStyle={eventCellStyle}
            events={events}
            height={Dimensions.screenHeight}
            hideHours={true}
            mode="custom"
            overlapOffset={0}
            renderEvent={renderEvent}
            renderHeader={renderHeader}
            showAllDayEventCell={false}
            swipeEnabled={true}
            theme={calendarTheme}
            weekEndsOn={5}
            weekStartsOn={1}
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
                          : palette.grey900,
                    },
                  ]}
                  variant="labelLarge"
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
                          : palette.grey900,
                    },
                  ]}
                  variant="labelLarge"
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
                          : palette.grey900,
                    },
                  ]}
                  variant="labelLarge"
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
                          : palette.grey900,
                    },
                  ]}
                  variant="labelLarge"
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
          <Text style={{ color: palette.grey900 }} variant="custom600_18">
            Sort & Filters
          </Text>
          <View style={styles.sortAndFilterContainer}>
            <View>
              <Text style={styles.subHeading} variant="labelSmall">
                SORT BY
              </Text>
              <View
                style={{
                  marginTop: Dimensions.margin / 2.66,
                }}
              >
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.individualViewContainer}
                      onPress={() => onChange(!value)}
                    >
                      <Checkbox
                        color={
                          value
                            ? CombinedDefaultTheme.colors.primary
                            : undefined
                        }
                        style={styles.checkbox}
                        value={value}
                        onValueChange={onChange}
                      />
                      <Text
                        style={{
                          color: value
                            ? CombinedDefaultTheme.colors.primary
                            : palette.grey900,
                        }}
                        variant="labelLarge"
                      >
                        Status
                      </Text>
                    </TouchableOpacity>
                  )}
                  control={control}
                  name="status"
                />
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.individualViewContainer}
                      onPress={() => onChange(!value)}
                    >
                      <Checkbox
                        color={
                          value
                            ? CombinedDefaultTheme.colors.primary
                            : undefined
                        }
                        style={styles.checkbox}
                        value={value}
                        onValueChange={onChange}
                      />
                      <Text
                        style={{
                          color: value
                            ? CombinedDefaultTheme.colors.primary
                            : palette.grey900,
                        }}
                        variant="labelLarge"
                      >
                        Modified on
                      </Text>
                    </TouchableOpacity>
                  )}
                  control={control}
                  name="modified"
                />
              </View>
            </View>
            <View
              style={{
                gap: Dimensions.margin * 1.25,
                paddingTop: Dimensions.margin * 1.25,
              }}
            >
              <Text style={styles.subHeading} variant="labelSmall">
                FILTERS
              </Text>

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
              <Controller
                render={({ field: { value } }) => (
                  <Pressable onPress={() => showPicker("startDate")}>
                    <Text variant="labelLarge">Start Date</Text>
                    <Surface
                      elevation={Platform.OS === "ios" ? 6 : null}
                      mode="flat"
                      style={styles.surface}
                    >
                      <View style={styles.calendarContainer}>
                        <Image
                          source={require("../../assets/icons/calender.png")}
                          style={styles.calendarIcon}
                          tintColor={palette.grey700}
                        />
                        <Text
                          style={{ color: palette.grey400 }}
                          variant="bodyMedium"
                        >
                          {value
                            ? value.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Start Date"}
                        </Text>
                      </View>
                    </Surface>
                  </Pressable>
                )}
                control={control}
                name="startDate"
              />
              <Controller
                render={({ field: { value } }) => (
                  <Pressable onPress={() => showPicker("endDate")}>
                    <Text variant="labelLarge">Due Date</Text>
                    <Surface
                      elevation={Platform.OS === "ios" ? 6 : null}
                      mode="flat"
                      style={styles.surface}
                    >
                      <View style={styles.calendarContainer}>
                        <Image
                          source={require("../../assets/icons/calender.png")}
                          style={styles.calendarIcon}
                          tintColor={palette.grey700}
                        />
                        <Text
                          style={{ color: palette.grey400 }}
                          variant="bodyMedium"
                        >
                          {value
                            ? value.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "Due Date"}
                        </Text>
                      </View>
                    </Surface>
                  </Pressable>
                )}
                control={control}
                name="endDate"
              />
              <View>
                <Text variant="titleSmall">Task Name</Text>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Surface
                      elevation={Platform.OS === "ios" ? 6 : null}
                      mode="flat"
                      style={styles.surface}
                    >
                      <Dropdown
                        search
                        placeholder={
                          !focusOfFirstDropdown ? "Select item" : "..."
                        }
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
                        placeholderStyle={styles.placeholderStyle}
                        searchPlaceholder="Search..."
                        selectedTextStyle={styles.selectedTextStyle}
                        value={value}
                        valueField="value"
                        onBlur={() => setFocusOfFirstDropdown(false)}
                        onChange={(item) => onChange(item.value)}
                        onFocus={() => setFocusOfFirstDropdown(true)}
                      />
                    </Surface>
                  )}
                  control={control}
                  name="taskName"
                />
              </View>
              <View>
                <Text variant="labelLarge">Status</Text>
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Surface
                      elevation={Platform.OS === "ios" ? 6 : null}
                      mode="flat"
                      style={styles.surface}
                    >
                      <Dropdown
                        search
                        placeholder={
                          !focusOfFirstDropdown ? "Select item" : "..."
                        }
                        renderRightIcon={() => (
                          <Image
                            color={focusOfStatusDropdown ? "blue" : "black"}
                            // name="Safety"
                            source={require("../../assets/icons/chevron_down.png")}
                            // size={20}
                            style={styles.iconStyle}
                          />
                        )}
                        style={[
                          styles.singleList,
                          focusOfStatusDropdown && { borderColor: "blue" },
                          // { minWidth: dropdownNumber > 1 ? "49%" : "100%" },
                        ]}
                        data={dropdownData}
                        iconStyle={styles.iconStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        labelField="label"
                        maxHeight={300}
                        placeholderStyle={styles.placeholderStyle}
                        searchPlaceholder="Search..."
                        selectedTextStyle={styles.selectedTextStyle}
                        value={value}
                        valueField="value"
                        onBlur={() => setFocusOfStatusDropdown(false)}
                        onChange={(item) => onChange(item.value)}
                        onFocus={() => setFocusOfStatusDropdown(true)}
                      />
                    </Surface>
                  )}
                  control={control}
                  name="statusState"
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
            onPress={handleClear}
          />

          <PrimaryButton
            backgroundColor={
              isFormChanged
                ? CombinedDefaultTheme.colors.primary
                : palette.primaryStudent200
            }
            borderColor={
              isFormChanged ? palette.purple600 : palette.primaryStudent300
            }
            content={"Apply"}
            textColor={CombinedDefaultTheme.colors.background}
            onPress={handleSubmit(onSubmit)}
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
  calendarBodyContainerStyle: {
    paddingHorizontal: Dimensions.padding,
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
    // paddingHorizontal: Dimensions.padding / 1.33,
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
    top: "52%",
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
  headerCalendarHeader: {
    lineHeight: Dimensions.margin / 1.33,
    paddingTop: Dimensions.padding / 4,
  },
  headerContainer: {
    // backgroundColor: "red",
    borderBottomWidth: 1,
    borderColor: palette.grey200,
    gap: Dimensions.margin / 2,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding,
  },
  iconStyle: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  individualDateHeader: {
    flex: 1,
  },
  individualDateHeaderContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    // minWidth: 50,
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
    height: Dimensions.margin,
    marginLeft: Dimensions.padding / 4,
    paddingLeft: 0,
    // position: "absolute",
    resizeMode: "contain",
    right: Dimensions.margin,
    width: Dimensions.margin,
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
  placeholderStyle: {
    fontSize: 14,
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
    paddingHorizontal: Dimensions.padding,
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
  searchLens: {
    height: Dimensions.margin * 1.25,
    left: Dimensions.margin / 4,
    marginLeft: 0,
    paddingLeft: 0,
    position: "absolute",
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  singleList: {
    marginTop: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding / 2,
  },
  sortAndFilterContainer: {
    marginTop: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding,
  },
  subHeading: {
    color: palette.grey500,
    lineHeight: Dimensions.margin / 1.33,
  },
  surface: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin / 2,
    elevation: 3,
    marginTop: Dimensions.margin / 2.66,
    paddingHorizontal: Dimensions.padding / 1.33,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default TaskTab;
