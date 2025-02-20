import React, { useCallback } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

import palette from "../../styles/palette";
import { courseCardData, Dimensions } from "../../utils/constant";
import CourseTabCard from "./CourseTabCard";

const UserTab = ({ activeTab }) => {
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItem = useCallback(
    ({ item }) => <CourseTabCard activeTab={"Users"} {...item} />,
    // eslint-disable-next-line prettier/prettier
    [activeTab]
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
    <ScrollView style={{}}>
      <Searchbar
        icon={renderSearchIcon}
        inputStyle={styles.searchInput}
        placeholder="Search"
        placeholderTextColor={palette.grey400}
        right={renderRightIcon}
        style={styles.searchBar}
      />
      <FlatList
        contentContainerStyle={styles.arrowIndicator}
        data={courseCardData}
        ItemSeparatorComponent={itemSeperator}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEnabled={false}
        style={styles.ongoingCardList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default UserTab;
