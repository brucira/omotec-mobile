import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Appbar, DataTable, Searchbar, Switch, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, dropdownData } from "../../utils/constant";

const PRESENT = "present";
const AttendanceDetails = ({
  attendanceStatus,
  formattedDateTime,
  attendanceList,
  visible,
  hideModal,
  onToggleSwitch,
  event,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState();
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState();
  const [isProgressSubjectFocus, setIsProgressSubjectFocus] = useState(false);
  const [items] = useState([
    {
      calories: 356,
      fat: 16,
      key: 1,
      name: "Cupcake",
    },
    {
      calories: 262,
      fat: 16,
      key: 2,
      name: "Eclair",
    },
    {
      calories: 159,
      fat: 6,
      key: 3,
      name: "Frozen yogurt",
    },
    {
      calories: 305,
      fat: 3.7,
      key: 4,
      name: "Gingerbread",
    },
  ]);
  const handleSearch = () => {};
  const handleSearchSubmit = () => {};
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );
  const renderTableData = (item, index) => (
    <DataTable.Row
      key={index}
      style={[
        styles.row,
        index === items.length + 1 ? { borderBottomWidth: 0 } : {},
      ]}
    >
      <DataTable.Cell style={styles.cell}>{item.name}</DataTable.Cell>
      <DataTable.Cell numeric style={styles.cell}>
        <Tag
          backgroundColor={
            item.status === PRESENT ? palette.success50 : palette.error50
          }
          textColor={
            item.status === PRESENT ? palette.success700 : palette.error600
          }
          label={item.status === PRESENT ? "Present" : "Absent"}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBarContainer}>
          <Appbar.Content
            title={
              <View>
                <Text variant="titleLarge">Attendance</Text>
              </View>
            }
          />
          <Appbar.Action
            icon={require("../../assets/icons/close.png")}
            style={styles.backIcon}
            onPress={hideModal}
          />
        </Appbar>
        <View style={styles.contentContainer}>
          <View>
            <Text variant="titleMedium">{event.title}</Text>
            <View>
              <Text
                style={{ color: palette.grey600 }}
                variant="bodyMedium"
              >{`${formattedDateTime.monthName}, ${formattedDateTime.year} | Batch: ${event.batchName}`}</Text>
            </View>
          </View>
          <View style={styles.presentMarkingContainer}>
            <Text style={{ color: palette.grey900 }} variant="labelLarge">
              Present
            </Text>
            <Switch
              style={styles.switch}
              thumbColor={CombinedDefaultTheme.colors.background}
              trackColor={{ true: palette.success600 }}
              value={attendanceStatus}
              onValueChange={onToggleSwitch}
            />
          </View>
          <View style={styles.searchContainer}>
            <Searchbar
              icon={renderSearchIcon}
              inputStyle={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={palette.grey400}
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={handleSearch}
              onSubmitEditing={handleSearchSubmit}
            />
            <Dropdown
              search
              renderRightIcon={() => (
                <Image
                  color={focusOfFirstDropdown ? "blue" : "black"}
                  // name="Safety"
                  source={require("../../assets/icons/chevron_down.png")}
                  // size={20}
                  style={styles.dropDownIcon}
                />
              )}
              style={[
                styles.singleList,
                focusOfFirstDropdown && { borderColor: "blue" },
              ]}
              data={dropdownData}
              iconStyle={styles.iconStyle}
              inputSearchStyle={styles.inputSearchStyle}
              labelField="label"
              maxHeight={300}
              placeholder={!focusOfFirstDropdown ? "Status" : "..."}
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
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.headerTitle}>
                <View style={styles.headingContainer}>
                  <Text>Student Name</Text>
                  <Image
                    source={require("../../assets/icons/sorting.png")}
                    style={styles.sort}
                  />
                </View>
              </DataTable.Title>
              <DataTable.Title numeric style={styles.headerTitle}>
                <View style={styles.headingContainer}>
                  <Text>Attendance</Text>
                  <Image
                    source={require("../../assets/icons/sorting.png")}
                    style={styles.sort}
                  />
                </View>
              </DataTable.Title>
            </DataTable.Header>

            {event.attendance.map((item, index) => {
              return renderTableData(item, index);
            })}
          </DataTable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 0,
  },
  attendanceContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  bottomContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: Dimensions.padding / 4,
    paddingHorizontal: Dimensions.padding,
  },
  cell: {
    // backgroundColor: "red",
    color: palette.grey900,
    fontSize: 14,
    fontWeight: "500",
    justifyContent: "flex-start",
    // flex: 0.5,
    maxWidth: 175,
    minWidth: 175,
  },
  column: {
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderTopColor: palette.neutral100,
    // borderTopWidth: 1,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: palette.grey25,
    flex: 1,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  dropDownIcon: {
    height: Dimensions.margin,
    resizeMode: "cover",
    width: Dimensions.margin,
  },

  headerTitle: {
    alignItems: "center",
    gap: Dimensions.margin / 2,
    justifyContent: "flex-start",
    maxWidth: 175,
    minWidth: 175,
    width: 175,
  },
  headingContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2,
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
  placeholderStyle: {
    fontSize: 14,
  },
  presentMarkingContainer: {
    alignItems: "center",
    alignSelf: "baseline",
    flexDirection: "row",
    paddingVertical: Dimensions.padding,
  },
  row: {
    maxHeight: "auto",
    minHeight: 56,
    padding: Dimensions.padding,
  },
  searchBar: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    flex: 0.7,
    marginLeft: 0,
    maxHeight: 40,
    minHeight: 40,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingLeft: 0,
    width: 195,
  },
  searchContainer: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    justifyContent: "space-between",
    paddingTop: Dimensions.padding / 4,
  },
  searchIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  searchInput: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    color: palette.grey900,
    flex: 1,
    fontSize: 14,
    left: -(Dimensions.margin / 1.33),
    marginLeft: 0,
    marginRight: 0,
    minHeight: 0,
    paddingVertical: 0,
    position: "relative",
  },
  singleList: {
    alignItems: "baseline",
    backgroundColor: palette.grey25,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    flex: 0.3,
    // height: 30,
    // maxHeight: 30,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding / 1.6,
    width: 72,
  },
  sort: {
    // alignItems: "center",
    alignSelf: "center",
    height: Dimensions.margin / 1.125,
    width: Dimensions.margin / 1.125,
  },
  switch: {
    transform: [{ scale: 0.6 }],
  },
  table: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    marginTop: Dimensions.margin * 1.25,
  },
  tableHeader: {
    alignItems: "center",
    backgroundColor: palette.grey100,
    borderTopLeftRadius: Dimensions.margin / 2,
    borderTopRightRadius: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding / 4,
    // textAlign: "left",
  },
});

export default AttendanceDetails;
