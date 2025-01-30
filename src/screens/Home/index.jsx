import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, Chip, Text } from "react-native-paper";

import CourseCard from "../../components/CourseCard";
import TopTab from "../../components/TopTab";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  cardData,
  Dimensions,
  RouteNames,
  tabData,
  todoCardData,
} from "../../utils/constant";
import CalendarCard from "./CalendarCard";
import ChartCard from "./ChartCard";
import TodoCard from "./TodoCard";

const RenderTabItem = ({ activeTab }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dailyCalendarCardContainer}
    >
      {cardData.map((item, index) => {
        return <CalendarCard key={item.id.toString()} item={item} />;
      })}
    </ScrollView>
  );
};

const renderTodoItem = (item, index) => {
  return (
    <View key={item.id}>
      <TodoCard
        date={item.date}
        imageSource={item.imageSource}
        label={item.label}
        subject={item.subject}
        todoTitle={item.todoTitle}
      />
    </View>
  );
};

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Mumbai");
  const keyExtractor = (item) => item.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItem = ({ index }) => <CourseCard index={index} />;
  const [isSale, setIsSale] = useState(true);

  const [progressSubject, setProgressSubject] = useState(null);
  const [isProgressSubjectFocus, setIsProgressSubjectFocus] = useState(false);
  const [locationOfProgress, setLocationOfProgress] = useState(null);
  const [isProgressLocationFocus, setIsProgressLocationFocus] = useState(false);

  const [performanceSubject, setPerformanceSubject] = useState(null);
  const [performanceSubjectFocus, setPerformanceSubjectFocus] = useState(false);

  const [attendanceSubject, setAttendanceSubject] = useState(null);
  const [attendanceSubjectFocus, setattendanceSubjectFocus] = useState(false);
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
          <View style={styles.todoContainer}>
            {todoCardData.map((item, index) => renderTodoItem(item, index))}
          </View>
        </View>
        <View style={styles.containerBox}>
          <View style={styles.calendarHeadingContainer}>
            <Text variant="titleLarge">Analytics</Text>
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="titleSmall"
            >
              View all
            </Text>
          </View>
          <View style={{ gap: Dimensions.margin / 1.33 }}>
            <ChartCard
              cardSubTitle={"Average progress"}
              cardTitle={"Progress Overview"}
              chartType={"line"}
              chipData={"8.1%"}
              chipTitle={"last session"}
              dropdownNumber={2}
              focusOfFirstDropdown={isProgressSubjectFocus}
              focusOfSecondDropdown={isProgressLocationFocus}
              setFocusOfFirstDropdown={setIsProgressSubjectFocus}
              setFocusOfSecondDropdown={setIsProgressLocationFocus}
              setValueofFirstDropdown={setProgressSubject}
              setValueofSecondDropdown={setLocationOfProgress}
              valueOfFirstDropdown={progressSubject}
              valueofSecondDropdown={locationOfProgress}
            />
            <ChartCard
              barChartBackground={palette.orange600}
              cardSubTitle={"Average performance"}
              cardTitle={"Performance Overview"}
              chartType={"bar"}
              chipData={"8.1%"}
              chipTitle={"last year"}
              dropdownNumber={1}
              focusOfFirstDropdown={performanceSubjectFocus}
              setFocusOfFirstDropdown={setPerformanceSubjectFocus}
              setValueofFirstDropdown={setPerformanceSubject}
              valueOfFirstDropdown={performanceSubject}
            />
            <ChartCard
              barChartBackground={palette.blue600}
              cardSubTitle={"Average attendance"}
              cardTitle={"Attendance Overview"}
              chartType={"bar"}
              chipData={"8.1%"}
              chipTitle={"last month"}
              dropdownNumber={1}
              focusOfFirstDropdown={attendanceSubjectFocus}
              setFocusOfFirstDropdown={setattendanceSubjectFocus}
              setValueofFirstDropdown={setAttendanceSubject}
              valueOfFirstDropdown={attendanceSubject}
            />
          </View>
        </View>
      </ScrollView>
      {isSale && (
        <Chip
          icon={() => (
            <Image
              source={require("../../assets/icons/price_tag.png")}
              style={{ height: 20, width: 20 }}
            />
          )}
          background={palette.transparent}
          closeIcon={require("../../assets/icons/close.png")}
          style={styles.saleChip}
          onClose={() => setIsSale(false)}
        >
          <View style={styles.saleIcon}>
            <View>
              <Text
                style={{ color: CombinedDefaultTheme.colors.background }}
                variant="labelMedium"
              >
                Offer Alert!
              </Text>
              <Text
                style={{
                  color: CombinedDefaultTheme.colors.background,
                  opacity: 0.8,
                }}
                variant="bodySmall"
              >
                50% off on every course
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginLeft: 8 }}
              onPress={() => setIsSale(false)}
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/icons/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
        </Chip>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    paddingBottom: Dimensions.padding,
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
    // marginTop: Dimensions.margin,
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
  closeIcon: {
    height: 18,
    tintColor: CombinedDefaultTheme.colors.background,
    width: 18,
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
  saleChip: {
    backgroundColor: palette.purple700,
    borderRadius: Dimensions.margin / 1.33,
    bottom: Dimensions.margin / 2,
    justifyContent: "center",
    marginHorizontal: Dimensions.margin,
    paddingHorizontal: Dimensions.padding / 1.14,
    paddingVertical: Dimensions.padding / 2.133,
    position: "absolute",
    width: Dimensions.screenWidth - Dimensions.margin * 2,
  },
  saleIcon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  todoContainer: {
    gap: Dimensions.padding / 1.3,
    paddingRight: Dimensions.padding,
  },
});

export default Home;
