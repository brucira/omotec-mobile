import Checkbox from "expo-checkbox";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar, Surface, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  courseCardData,
  Dimensions,
  dropdownData,
  projectDetailDocumentTabData,
} from "../../utils/constant";
import DocumentCard from "./DocumentCard";

const DocumentTab = ({ activeTab }) => {
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState();
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState();
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const keyExtractor = (item) => item.id.toString();
  const toggleStatusCheckbox = () => setIsStatusChecked((prev) => !prev);
  const bottomSheetModalRef = useRef(null);
  const handleFilterPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    // eslint-disable-next-line prettier/prettier
    []
  );
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItem = useCallback(
    ({ item }) => <DocumentCard {...item} />,
    // eslint-disable-next-line prettier/prettier
    []
  );

  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );
  const renderRightIcon = () => (
    <Image
      source={require("../../assets/icons/mic.png")}
      style={styles.rightIcon}
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
          style={styles.searchBar}
        />
        <View style={{ flexDirection: "row", gap: Dimensions.margin * 1.25 }}>
          <TouchableOpacity onPress={handleFilterPress}>
            <Image
              source={require("../../assets/icons/filter_two.png")}
              style={styles.customizeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.arrowIndicator}
        data={projectDetailDocumentTabData}
        ItemSeparatorComponent={itemSeperator}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.ongoingCardList}
      />
      <BottomDrawer ref={bottomSheetModalRef}>
        <View style={styles.bottomSheetContainer}>
          <Text variant="titleMedium">Sort & Filters</Text>
          <View style={styles.sortAndFilterContainer}>
            <View style={{ gap: Dimensions.margin / 2 }}>
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
                    Status
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
                    Modified on
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
              <View>
                <Text variant="titleSmall">Type</Text>
                <Surface
                  elevation={Platform.OS === "ios" ? 6 : null}
                  mode="flat"
                  style={styles.surface}
                >
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
                    placeholder={!focusOfFirstDropdown ? "Select type" : "..."}
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
                </Surface>
              </View>
              <View>
                <Text variant="titleSmall">Uploaded by</Text>
                <Surface
                  elevation={Platform.OS === "ios" ? 6 : null}
                  mode="flat"
                  style={styles.surface}
                >
                  <Dropdown
                    search
                    placeholder={
                      !focusOfFirstDropdown ? "Select uploaded by" : "..."
                    }
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
                </Surface>
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

const styles = StyleSheet.create({
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    // paddingBottom: Dimensions.padding * 1.5,
    marginBottom: Dimensions.margin * 2.75,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding / 1.33,
  },
  checkbox: {
    borderColor: palette.grey300,
    borderRadius: Dimensions.margin / 4,
    borderWidth: 1,
  },
  customizeIcon: {
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
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
  lens: {
    height: Dimensions.margin * 1.25,
    left: Dimensions.margin / 4,
    marginLeft: 0,
    paddingLeft: 0,
    position: "absolute",
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
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
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin / 2,
    elevation: Platform.OS === "android" ? 0.4 : null,
    marginTop: Dimensions.margin / 2.66,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  sortAndFilterContainer: {
    marginTop: Dimensions.margin / 2,
    paddingVertical: Dimensions.padding,
  },
  surface: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin / 2,
    elevation: 3,
    marginTop: Dimensions.margin / 2.66,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default DocumentTab;
