import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Card, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, dropdownData } from "../../utils/constant";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";

const ChartCard = ({
  chartType,
  barChartBackground,
  barData,
  cardTitle,
  cardSubTitle,
  chipTitle,
  chipData,
  dropdownNumber,
  valueOfFirstDropdown,
  setValueofFirstDropdown,
  focusOfFirstDropdown,
  setFocusOfFirstDropdown,
  valueofSecondDropdown,
  setValueofSecondDropdown,
  focusOfSecondDropdown,
  setFocusOfSecondDropdown,
}) => {
  return (
    <Card
      contentStyle={styles.contentStyleContainer}
      mode="outlined"
      style={styles.graphContainer}
    >
      <View style={styles.graphTitleContainer}>
        <Text variant="custom600_16">{cardTitle}</Text>
        <Text
          style={{ color: CombinedDefaultTheme.colors.primary }}
          variant="labelLarge"
        >
          View
        </Text>
      </View>
      <View style={styles.contentDetailContainer}>
        <View style={{ gap: Dimensions.margin / 4 }}>
          <Text style={styles.averageTitle} variant="bodySmall">
            {cardSubTitle}
          </Text>
          <Text style={{ color: palette.grey900 }} variant="custom600_16">
            85%
          </Text>
        </View>
        <View style={{ gap: Dimensions.margin / 4 }}>
          <Text style={styles.fromDuration} variant="bodySmall">
            From {chipTitle}
          </Text>
          <View style={styles.tag}>
            <Image
              source={require("../../assets/icons/trend_up.png")}
              style={styles.trendIcon}
            />
            <Text>{chipData}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dropDownContainer}>
        {/* {renderLabel()} */}
        <View style={styles.listContainer}>
          <Dropdown
            search
            placeholder={
              !focusOfFirstDropdown ? (
                <Text variant="labelMedium">Select item</Text>
              ) : (
                <Text variant="labelMedium">...</Text>
              )
            }
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
              { minWidth: dropdownNumber > 1 ? "49%" : "100%" },
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
              setValueofFirstDropdown(item.value);
              setFocusOfFirstDropdown(false);
            }}
            onBlur={() => setFocusOfFirstDropdown(false)}
            onFocus={() => setFocusOfFirstDropdown(true)}
          />
          {dropdownNumber > 1 && (
            <Dropdown
              search
              placeholder={
                !focusOfFirstDropdown ? (
                  <Text variant="labelMedium">Select item</Text>
                ) : (
                  <Text variant="labelMedium">...</Text>
                )
              }
              renderRightIcon={() => (
                <Image
                  color={focusOfSecondDropdown ? "blue" : "black"}
                  // name="Safety"
                  source={require("../../assets/icons/chevron_down.png")}
                  // size={20}
                  style={styles.dropDownIcon}
                />
              )}
              style={[
                styles.singleList,
                focusOfSecondDropdown && { borderColor: "blue" },
                { minWidth: "49%" },
              ]}
              data={dropdownData}
              iconStyle={styles.iconStyle}
              inputSearchStyle={styles.inputSearchStyle}
              labelField="label"
              maxHeight={300}
              placeholderStyle={styles.placeholderStyle}
              searchPlaceholder="Search..."
              selectedTextStyle={styles.selectedTextStyle}
              value={valueofSecondDropdown}
              valueField="value"
              onChange={(item) => {
                setValueofSecondDropdown(item.value);
                setFocusOfSecondDropdown(false);
              }}
              onBlur={() => setFocusOfSecondDropdown(false)}
              onFocus={() => setFocusOfSecondDropdown(true)}
            />
          )}
        </View>
      </View>
      {chartType === "line" ? (
        <LineGraph />
      ) : (
        <BarGraph barChartBackground={barChartBackground} data={barData} />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  averageTitle: {
    color: palette.grey600,
  },
  contentDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 2,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding,
  },
  contentStyleContainer: {
    paddingBottom: Dimensions.padding * 1.25,
    paddingTop: Dimensions.padding,
  },
  descriptionStyle: {
    backgroundColor: "yellow",
  },
  dropDownContainer: {
    backgroundColor: palette.grey25,
    borderBottomWidth: 1,
    borderColor: palette.grey100,
    borderTopWidth: 1,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding / 1.6,
  },
  dropDownIcon: {
    height: Dimensions.margin,
    resizeMode: "cover",
    width: Dimensions.margin,
  },
  fromDuration: {
    color: palette.grey550,
  },
  graphContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderTopLeftRadius: Dimensions.padding / 2,
    borderTopRightRadius: Dimensions.padding / 2,
    flex: 1,
    marginRight: Dimensions.margin,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  graphTitleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.padding,
  },
  listContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2,
    paddingBottom: 0,
    paddingTop: 0,
  },
  singleList: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    flex: 0.5,
    // minWidth: "49%",
    // paddingBottom: 0,
    // paddingTop: 0,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding / 1.6,
  },
  tag: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: palette.green100,
    borderColor: "#07966833",
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    color: palette.stopColor,
    flexDirection: "row",
    gap: Dimensions.margin / 4,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.padding / 5.33,
  },
  titleStyle: {
    padding: 0,
  },
  trendIcon: {
    height: 14,
    resizeMode: "contain",
    width: 14,
  },
});

export default ChartCard;
