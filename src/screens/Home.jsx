import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import TopTab from "../components/TopTab";
import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions, RouteNames } from "../utils/constant";

const cardData = [
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
];

const RenderTabItem = ({ activeTab }) => {
  return (
    <ScrollView horizontal style={styles.dailyCalendarCardContainer}>
      {cardData.map((item, index) => (
        <View
          key={index}
          style={[styles.dailyCourseCard, { backgroundColor: item.background }]}
        >
          <Image source={item.gradient} style={styles.gradient} />
          <View style={styles.dailyCourseCardContent}>
            <View>
              <Text variant="titleMedium">UI/UX Design Course</Text>
              <View style={styles.subHeading}>
                <Text variant="bodySmall">2:00 - 4:00 PM</Text>
                <Text
                  style={{
                    alignSelf: "center",
                    paddingHorizontal: Dimensions.padding / 6,
                  }}
                >
                  &bull;
                </Text>
                <Text variant="bodySmall">Mumbai</Text>
              </View>
            </View>
            <View style={styles.calendarContentFooter}>
              <View style={styles.avatarGroup}>
                <Image
                  source={require("../assets/avatar.png")}
                  style={styles.avatar}
                />
                {[...Array(3)].map((_, index) => (
                  <Image
                    key={index}
                    source={require("../assets/avatar.png")}
                    style={styles.avatarOverlap}
                  />
                ))}
              </View>
              <Text variant="bodySmall"> + 57 Others</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const tabData = ["Mumbai", "Pune", "Goa", "Delhi", "Kolkata", "Bengaluru"];

const Home = ({ navigation }) => {
  const keyExtractor = (item) => item.toString();
  const renderItem = ({ index }) => <CourseCard index={index} />;
  const [activeTab, setActiveTab] = useState("Mumbai");
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content
          title={
            <View>
              <Text variant="headlineSmall">Hi Julian, 👋</Text>
              <Text variant="labelMedium">Keep up the good work!</Text>
            </View>
          }
        />
        <Appbar.Action
          icon={require("../assets/icons/notification.png")}
          onPress={() => navigation.navigate(RouteNames.Notifications)}
        />
        <Appbar.Action
          icon={(props) => (
            <Avatar.Image {...props} source={require("../assets/avatar.png")} />
          )}
          onPress={() => navigation.navigate(RouteNames.Profile)}
        />
      </Appbar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}
      >
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/banner.png")}
            style={styles.banner}
          />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.contentHeadingContainer}>
            <Text variant="titleLarge">Ongoing courses</Text>
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="titleSmall"
            >
              View all
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.arrowIndicator}
            data={[1, 2, 3]}
            horizontal={true}
            ItemSeparatorComponent={itemSeperator}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.ongoingCardList}
          />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.calendarHeadingContainer}>
            <Text variant="titleLarge">Daily Calendar</Text>
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="titleSmall"
            >
              View all
            </Text>
          </View>
          <TopTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabData={tabData}
          />
          <RenderTabItem activeTab={activeTab} />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.contentHeadingContainer}>
            <Text variant="titleLarge">To-do List</Text>
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="titleSmall"
            >
              View all
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.arrowIndicator}
            data={[1, 2, 3]}
            horizontal={true}
            ItemSeparatorComponent={itemSeperator}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.ongoingCardList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
  },
  avatar: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: Dimensions.margin / 16,
    height: Dimensions.margin * 1.5,
    width: Dimensions.margin * 1.5,
  },
  avatarGroup: {
    flexDirection: "row",
    height: Dimensions.margin * 1.5,
  },
  avatarOverlap: {
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 1.25,
    borderWidth: 1,
    height: Dimensions.margin * 1.5,
    marginLeft: -Dimensions.margin / 2,
    width: Dimensions.margin * 1.5,
  },
  banner: {
    alignSelf: "center",
    backgroundColor: palette.transparent,
    borderRadius: Dimensions.padding / 2,
    height: 123,
    resizeMode: "cover",
    width: "100%",
  },
  bannerContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: Dimensions.margin / 1.33,
    marginTop: Dimensions.margin,
    paddingHorizontal: Dimensions.padding,
    width: Dimensions.screenWidth,
  },
  calendarContentFooter: {
    alignItems: "center",
    flexDirection: "row",
  },
  calendarHeadingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 2,
    paddingRight: Dimensions.padding,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  containerBox: {
    paddingLeft: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  contentHeadingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.14,
    paddingRight: Dimensions.padding,
  },
  dailyCalendarCardContainer: {},
  dailyCourseCard: {
    borderRadius: Dimensions.margin / 2,
    height: 122,
    marginRight: Dimensions.margin / 1.33,
    marginTop: Dimensions.padding,
    position: "relative",
    width: 204,
  },
  dailyCourseCardContent: {
    gap: Dimensions.margin * 1.5,
    padding: Dimensions.padding,
  },
  gradient: {
    height: 90,
    left: -8,
    position: "absolute",
    resizeMode: "contain",
    top: 16,
  },
  itemSeparator: {
    width: 12,
  },
  ongoingCardList: {
    gap: Dimensions.padding / 1.33,
  },
  subHeading: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Home;
