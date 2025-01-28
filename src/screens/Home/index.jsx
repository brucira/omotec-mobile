import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

import CourseCard from "../../components/CourseCard";
import TopTab from "../../components/TopTab";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames, tabData } from "../../utils/constant";
import CalendarCard from "./CalendarCard";
import TodoCard from "./TodoCard";

const RenderTabItem = ({ activeTab }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dailyCalendarCardContainer}
    >
      <CalendarCard />
    </ScrollView>
  );
};

const RenderTodoItem = ({ item, index }) => {
  return <TodoCard key={index} item={item} />;
};

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Mumbai");
  const keyExtractor = (item) => item.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItem = ({ index }) => <CourseCard index={index} />;
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
          icon={require("../../assets/icons/notification.png")}
          onPress={() => navigation.navigate(RouteNames.Notifications)}
        />
        <Appbar.Action
          icon={(props) => (
            <Avatar.Image
              {...props}
              source={require("../../assets/avatar.png")}
            />
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
            source={require("../../assets/banner.png")}
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
          <View
            style={{
              gap: Dimensions.padding / 1.3,
              paddingRight: Dimensions.padding,
            }}
          >
            {[...Array(3)].map((item, index) => (
              <RenderTodoItem key={index} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
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
  itemSeparator: {
    width: 12,
  },
  ongoingCardList: {
    gap: Dimensions.padding / 1.33,
  },
});

export default Home;
