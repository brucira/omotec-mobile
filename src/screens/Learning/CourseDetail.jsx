import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Appbar, Avatar, Button, Searchbar, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import PrimaryButton from "../../components/PrimaryButton";
import TopTab from "../../components/TopTab";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { courseCardData, Dimensions, today } from "../../utils/constant";
import CourseTabCard from "./CourseTabCard";
import TaskTab from "./TaskTab";
import UserTab from "./UserTab";

const TABS = ["Users", "Task", "Document", "Details"];
const CourseDetails = ({ navigation }) => {
  const { title } = useRoute().params;
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;

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
  const renderTab = (item, index) => (
    <View key={index}>
      <Button
        labelStyle={{
          marginHorizontal: Dimensions.margin / 1.33,
          marginVertical: Dimensions.padding / 4,
        }}
        style={[
          styles.tabButton,
          {
            backgroundColor:
              activeTab === item
                ? CombinedDefaultTheme.colors.primary
                : palette.grey100,
          },
        ]}
        compact={true}
        contentStyle={styles.tabButtonContent}
        mode="contained"
        onPress={() => setActiveTab(item)}
      >
        <View style={styles.buttonContent}>
          <Image
            tintColor={
              activeTab === item
                ? CombinedDefaultTheme.colors.background
                : palette.grey600
            }
            source={require("../../assets/icons/user.png")}
            style={styles.tabIconImage}
          />
          <Text
            style={{
              color:
                activeTab === item
                  ? CombinedDefaultTheme.colors.background
                  : palette.grey600,
            }}
            variant="labelLarge"
          >
            {item}
          </Text>
        </View>
      </Button>
    </View>
  );
  const renderItem = useCallback(
    ({ item }) => <CourseTabCard activeTab={"Users"} {...item} />,
    // eslint-disable-next-line prettier/prettier
    [activeTab]
  );

  const renderTaskItem = useCallback(
    ({ item }) => <CourseTabCard activeTab={"Task"} {...item} />,
    // eslint-disable-next-line prettier/prettier
    [activeTab]
  );

  const tabContent = useMemo(() => {
    return activeTab === "Users" ? (
      <UserTab activeTab={activeTab} />
    ) : activeTab === "Task" ? (
      <TaskTab activeTab={activeTab} />
    ) : activeTab === "Document" ? (
      <ScrollView style={{}}>
        <View>
          <Searchbar
            icon={renderSearchIcon}
            inputStyle={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={palette.grey400}
            //   right={renderRightIcon}
            style={styles.searchBar}
          />
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
      </ScrollView>
    ) : activeTab === "Details" ? (
      <View style={styles.tabContentContainer}>
        <Text style={styles.tabContentText}>{activeTab}</Text>
      </View>
    ) : null;
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Action
          icon={require("../../assets/icons/chevron_left.png")}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Appbar.Content
          title={
            <Text numberOfLines={1} variant="titleMedium">
              {title}
            </Text>
          }
        />
      </Appbar>
      <View>
        <ScrollView
          contentContainerStyle={{
            columnGap: 12,
            flex: 1,
            flexDirection: "row",
            flexGrow: 1,
            minWidth: "100%",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
        >
          {TABS.map((item, index) => renderTab(item, index))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>{tabContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    // paddingVertical: Dimensions.padding / 10,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    // paddingBottom: Dimensions.padding * 1.5,
    marginBottom: Dimensions.margin * 4.375,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding / 1.33,
  },

  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2.66,
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
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    paddingHorizontal: Dimensions.padding,
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

  headingContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 2,
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
  tabButton: {
    padding: 0,
  },
  tabButtonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 2.66,
  },
  tabContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    // row: Dimensions.margin / 1.33,
    // flex: 1,
    // flexDirection: "column",
    paddingLeft: Dimensions.margin,
    paddingTop: Dimensions.padding * 1.25,
    // maxHeight: 28,
  },
  tabIconImage: {
    color: palette.grey400,
    height: Dimensions.margin / 1.14,
    width: Dimensions.margin / 1.14,
  },
  title: {},
});

export default CourseDetails;
