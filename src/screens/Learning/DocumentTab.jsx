import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import React, { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  Dimensions,
  dropdownData,
  projectDetailDocumentTabData,
} from "../../utils/constant";
import { documentFilterSchema } from "../../utils/schema";
import DocumentCard from "./DocumentCard";

const DocumentTab = ({ activeTab }) => {
  const [focusOfTypeDropdown, setFocusOfTypeDropdown] = useState();
  const [focusOfUploadedDropdown, setFocusOfUploadedDropdown] = useState();
  const keyExtractor = (item) => item.id.toString();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      modifiedBy: false,
      status: false,
      type: "",
      uploadedBy: "",
    },
    resolver: zodResolver(documentFilterSchema),
  });

  const onSubmit = (data) => console.log(data);
  const watchFields = watch(["modifiedBy", "status", "type", "uploadedBy"]);

  const isFormChanged =
    JSON.stringify(watchFields) !== JSON.stringify([false, false, "", ""]);
  const handleClear = () => {
    reset();
  };
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

  const renderDropdownRightIcon = () => (
    <Image
      color={focusOfTypeDropdown ? "blue" : "black"}
      // name="Safety"
      source={require("../../assets/icons/chevron_down.png")}
      // size={20}
      style={styles.iconStyle}
    />
  );
  const renderSearchIcon = () => (
    <Image
      source={require("../../assets/icons/search.png")}
      style={styles.lens}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        marginBottom: Dimensions.margin * 1.5,

        paddingHorizontal: Dimensions.padding,
      }}
    >
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
          <Text style={{ color: palette.grey900 }} variant="custom600_18">
            Sort & Filters
          </Text>
          <View style={styles.sortAndFilterContainer}>
            <View style={{ gap: Dimensions.margin / 2 }}>
              <Text style={styles.subHeading} variant="labelSmall">
                SORT BY
              </Text>
              <View>
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
                  name="modifiedBy"
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
              <View>
                <Text style={{ color: palette.grey900 }} variant="labelLarge">
                  Type
                </Text>

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
                          !focusOfTypeDropdown ? (
                            <Text
                              style={{ color: palette.grey900 }}
                              variant="bodyMedium"
                            >
                              Select type
                            </Text>
                          ) : (
                            <Text
                              style={{ color: palette.grey900 }}
                              variant="bodyMedium"
                            >
                              ...
                            </Text>
                          )
                        }
                        style={[
                          styles.singleList,
                          focusOfTypeDropdown && { borderColor: "blue" },
                        ]}
                        data={dropdownData}
                        iconStyle={styles.iconStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        labelField="label"
                        maxHeight={300}
                        placeholderStyle={styles.placeholderStyle}
                        renderRightIcon={renderDropdownRightIcon}
                        searchPlaceholder="Search..."
                        selectedTextStyle={styles.selectedTextStyle}
                        value={value}
                        valueField="value"
                        onBlur={() => setFocusOfTypeDropdown(false)}
                        onChange={(item) => onChange(item.value)}
                        onFocus={() => setFocusOfTypeDropdown(true)}
                      />
                    </Surface>
                  )}
                  control={control}
                  name="type"
                />
              </View>
              <View>
                <Text style={{ color: palette.grey900 }} variant="labelLarge">
                  Uploaded by
                </Text>

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
                          !focusOfTypeDropdown ? (
                            <Text
                              style={{ color: palette.grey900 }}
                              variant="bodyMedium"
                            >
                              Select type
                            </Text>
                          ) : (
                            <Text
                              style={{ color: palette.grey900 }}
                              variant="bodyMedium"
                            >
                              ...
                            </Text>
                          )
                        }
                        style={[
                          styles.singleList,
                          focusOfUploadedDropdown && { borderColor: "blue" },
                        ]}
                        data={dropdownData}
                        iconStyle={styles.iconStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        labelField="label"
                        maxHeight={300}
                        placeholderStyle={styles.placeholderStyle}
                        renderRightIcon={renderDropdownRightIcon}
                        searchPlaceholder="Search..."
                        selectedTextStyle={styles.selectedTextStyle}
                        value={value}
                        valueField="value"
                        onBlur={() => setFocusOfUploadedDropdown(false)}
                        onChange={(item) => onChange(item.value)}
                        onFocus={() => setFocusOfUploadedDropdown(true)}
                      />
                    </Surface>
                  )}
                  control={control}
                  name="uploadedBy"
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
  selectedTextStyle: {
    fontSize: Dimensions.margin / 1.14,
    lineHeight: Dimensions.margin * 1.25,
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
  subHeading: {
    color: palette.grey500,
    lineHeight: Dimensions.margin / 1.33,
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
