import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Appbar, Searchbar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";

const StudentList = ({
  formattedDateTime,
  studentList,
  visible,
  hideModal,
  onToggleSwitch,
  event,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {};
  const handleSearchSubmit = () => {};
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const keyExtractor = (item, index) => index.toString();
  const renderSearchIcon = () => (
    <Image source={require("../assets/icons/search.png")} style={styles.lens} />
  );
  const renderItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Image source={item.avatar} style={styles.studentAvatar} />
      <Text variant="titleSmall">{item.name}</Text>
    </View>
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
                <Text variant="titleLarge">Student List</Text>
              </View>
            }
          />
          <Appbar.Action
            icon={require("../assets/icons/close.png")}
            style={styles.backIcon}
            onPress={hideModal}
          />
        </Appbar>
        <View style={styles.contentContainer}>
          <View style={styles.searchSection}>
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
              {/* <Dropdown
              search
              renderRightIcon={() => (
                <Image
                  color={focusOfFirstDropdown ? "blue" : "black"}
                  // name="Safety"
                  source={require("../assets/icons/chevron_down.png")}
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
            /> */}
            </View>
            <FlatList
              contentContainerStyle={styles.arrowIndicator}
              data={studentList}
              ItemSeparatorComponent={itemSeperator}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              // scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              style={styles.ongoingCardList}
            />
          </View>
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
    backgroundColor: CombinedDefaultTheme.colors.background,
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
    flex: 1,
    marginLeft: 0,
    maxHeight: 40,
    minHeight: 40,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingLeft: 0,
    // width: 195,
  },
  searchContainer: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 2,
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
  searchSection: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 1.33,
    borderWidth: 1,
    flex: 1,
    padding: Dimensions.padding / 1.33,
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
  studentAvatar: {
    borderRadius: Dimensions.margin * 3,
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
  },
  studentCard: {
    flexDirection: "row",
    gap: Dimensions.padding / 2,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
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

export default StudentList;
