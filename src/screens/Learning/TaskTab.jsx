import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Searchbar, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  courseCardData,
  Dimensions,
  dropdownData,
  today,
} from "../../utils/constant";
import CourseTabCard from "./CourseTabCard";

const TaskTab = ({ activeTab }) => {
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState(false);
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState(false);
  const [showCalendarLayout, setShowCalendarLayout] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerType, setPickerType] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [tempDate, setTempDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(false);

  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Select Date";
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
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const toggleStatusCheckbox = () => setIsStatusChecked((prev) => !prev);
  const handleFilterModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderTaskItem = useCallback(
    ({ item }) => <CourseTabCard activeTab={"Task"} {...item} />,
    // eslint-disable-next-line prettier/prettier
    [activeTab]
  );
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );
  return (
    <ScrollView style={{}}>
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
            <Pressable>
              <Image
                source={require("../../assets/icons/table_grid.png")}
                style={styles.customizeIcon}
              />
            </Pressable>
          ) : (
            <Pressable>
              <Image
                source={require("../../assets/icons/calender.png")}
                style={styles.customizeIcon}
              />
            </Pressable>
          )}

          <Pressable onPress={handleFilterModalPress}>
            <Image
              source={require("../../assets/icons/filter_two.png")}
              style={styles.customizeIcon}
            />
          </Pressable>
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.arrowIndicator}
        data={courseCardData}
        ItemSeparatorComponent={itemSeperator}
        keyExtractor={keyExtractor}
        renderItem={renderTaskItem}
        scrollEnabled={false}
        style={styles.ongoingCardList}
      />
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

              {/* End Date Picker */}
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
    </ScrollView>
  );
};

export default TaskTab;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    // paddingBottom: Dimensions.padding * 1.5,
    marginBottom: Dimensions.margin * 4.375,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding / 1.33,
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
    borderRadius: Dimensions.margin / 2,
  },
  customizeIcon: {
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
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
    borderRadius: 10,
    padding: 20,
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
