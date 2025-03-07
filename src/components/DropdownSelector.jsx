import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import palette from "../styles/palette";
import { Dimensions } from "../utils/constant";
import DropDownRightIcon from "./DropDownRightIcon";

const SIZE_16 = Dimensions.margin;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_14 = SIZE_16 * 0.875;
const SIZE_20 = SIZE_16 * 1.25;

const DropdownSelector = ({
  data,
  value,
  setValue,
  placeholder,
  search = true,
}) => {
  return (
    <Dropdown
      data={data}
      itemTextStyle={styles.itemText}
      labelField="label"
      maxHeight={300}
      renderRightIcon={DropDownRightIcon}
      search={search}
      searchPlaceholder={placeholder}
      selectedTextProps={{ ellipsizeMode: "tail", numberOfLines: 1 }}
      selectedTextStyle={styles.selectedTextStyle}
      style={styles.singleList}
      value={value}
      valueField="value"
      onChange={(item) => setValue(item.value)}
    />
  );
};

export default DropdownSelector;

const styles = StyleSheet.create({
  itemText: { color: "black" },
  selectedTextStyle: {
    color: palette.grey900,
    fontFamily: "Inter",
    fontSize: SIZE_14,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: SIZE_20,
  },
  singleList: {
    backgroundColor: "#FFFFFF",
    borderColor: palette.grey200,
    borderRadius: SIZE_12,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    height: SIZE_20 * 2,
    padding: SIZE_12,
    shadowColor: palette.grey900,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
