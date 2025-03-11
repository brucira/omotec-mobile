import React, { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Badge, Chip, Text } from "react-native-paper";

import CourseCard from "../../components/CourseCard";
import TopTab from "../../components/TopTab";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  barGraphAttendanceData,
  barGraphPerformanceData,
  cardData,
  Dimensions,
  RouteNames,
  tabData,
  todoCardData,
} from "../../utils/constant";
import CalendarCard from "./CalendarCard";
import ChartCard from "./ChartCard";
import TodoCard from "./TodoCard";

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Mumbai");
  const [checkedItems, setCheckedItems] = useState({});
  const [isSale, setIsSale] = useState(true);

  const [progressSubject, setProgressSubject] = useState(null);
  const [isProgressSubjectFocus, setIsProgressSubjectFocus] = useState(false);
  const [locationOfProgress, setLocationOfProgress] = useState(null);
  const [isProgressLocationFocus, setIsProgressLocationFocus] = useState(false);

  const [performanceSubject, setPerformanceSubject] = useState(null);
  const [performanceSubjectFocus, setPerformanceSubjectFocus] = useState(false);

  const [attendanceSubject, setAttendanceSubject] = useState(null);
  const [attendanceSubjectFocus, setattendanceSubjectFocus] = useState(false);

  const keyExtractor = (item) => item.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItem = ({ index, item }) => (
    <CourseCard
      key={index}
      index={index}
      isLast={index === [1, 2, 3, 4].length - 1}
      {...item}
    />
  );

  const handleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the state for the specific item
    }));
  };

  const renderTodoItem = (item, index) => {
    return (
      <View key={item.id}>
        <TodoCard
          date={item.date}
          imageSource={item.imageSource}
          isChecked={checkedItems[item.id] || false}
          label={item.label}
          subject={item.subject}
          todoTitle={item.todoTitle}
          onCheck={() => handleCheck(item.id)}
        />
      </View>
    );
  };

  const renderCalendarCard = (item, index) => {
    return <CalendarCard key={item.id.toString()} item={item} />;
  };
  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content
          title={
            <View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text
                  numberOfLines={1}
                  style={{ color: palette.grey900, maxWidth: "70%" }}
                  variant="custom600_24"
                >
                  <Text variant="headlineSmall">Hi,</Text> Julian 👋
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{ color: palette.grey600, letterSpacing: 0 }}
                variant="bodySmall"
              >
                Keep up the good work!
              </Text>
            </View>
          }
        />
        <View>
          <Appbar.Action
            icon={require("../../assets/icons/notification.png")}
            onPress={() => navigation.navigate(RouteNames.Notifications)}
          />
          <Badge size={8} style={styles.dot}></Badge>
        </View>
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
            <Text style={{ color: palette.grey900 }} variant="custom700_18">
              Ongoing courses
            </Text>
            <Text style={styles.viewAll} variant="labelLarge">
              View all
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.arrowIndicator}
            data={[1, 2, 3, 4]}
            horizontal={true}
            ItemSeparatorComponent={itemSeperator}
            keyExtractor={keyExtractor}
            renderItem={(props) => renderItem({ ...props, data: [1, 2, 3] })}
            showsHorizontalScrollIndicator={false}
            style={styles.ongoingCardList}
          />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.calendarHeadingContainer}>
            <Text style={{ color: palette.grey900 }} variant="custom700_18">
              Daily Calendar
            </Text>
            <Text style={styles.viewAll} variant="labelLarge">
              View all
            </Text>
          </View>
          <TopTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabData={tabData}
          />
          {/* <RenderTabItem activeTab={activeTab} /> */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dailyCalendarCardContainer}
          >
            {cardData.map((item, index) => {
              return renderCalendarCard(item, index);
            })}
          </ScrollView>
        </View>
        <View style={styles.containerBox}>
          <View style={styles.contentHeadingContainer}>
            <Text style={{ color: palette.grey900 }} variant="custom700_18">
              To-do List
            </Text>
            <Text style={styles.viewAll} variant="labelLarge">
              View all
            </Text>
          </View>
          <View style={styles.todoContainer}>
            {todoCardData.map((item, index) => renderTodoItem(item, index))}
          </View>
        </View>
        <View style={styles.containerBox}>
          <View style={styles.calendarHeadingContainer}>
            <Text style={{ color: palette.grey900 }} variant="custom700_18">
              Analytics
            </Text>
            <Text style={styles.viewAll} variant="labelLarge">
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
              barData={barGraphPerformanceData}
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
              barData={barGraphAttendanceData}
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
          closeIcon={() => (
            <Image
              style={{
                height: 20,
                marginRight: 10,
                width: 20,
              }}
              source={require("../../assets/icons/close.png")}
              tintColor={CombinedDefaultTheme.colors.background}
            />
          )}
          icon={() => (
            <Image
              source={require("../../assets/icons/price_tag.png")}
              style={{ height: 20, width: 20 }}
            />
          )}
          background={palette.transparent}
          style={styles.saleChip}
          onClose={() => setIsSale(false)}
        >
          <View style={{}}>
            <View style={{}}>
              <Text
                style={{
                  color: CombinedDefaultTheme.colors.background,
                  lineHeight: Dimensions.margin,
                }}
                variant="custom600_12"
              >
                Offer Alert!
              </Text>
              <Text
                style={{
                  color: CombinedDefaultTheme.colors.background,
                  opacity: 0.8,
                }}
                numberOfLines={1}
                variant="bodySmall"
              >
                50% off on every course
              </Text>
            </View>
          </View>
        </Chip>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    // paddingBottom: Dimensions.padding,
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
    marginTop: Dimensions.margin * 1.75,
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
  dot: {
    backgroundColor: palette.error500,
    position: "absolute",
    right: "32%",
    top: "24%",
  },
  itemSeparator: {
    width: 12,
  },
  ongoingCardList: {
    // gap: Dimensions.padding / 1.33,
    // marginRight: 16,
  },
  saleChip: {
    // alignItems: "center",
    backgroundColor: palette.purple700,
    borderRadius: Dimensions.margin / 1.33,
    bottom: Dimensions.margin / 2,
    justifyContent: "center",
    marginHorizontal: Dimensions.margin,
    paddingHorizontal: Dimensions.padding / 2,
    paddingVertical: Dimensions.margin / 4,
    // paddingVertical: Dimensions.padding / 2,
    position: "absolute",
    width: Dimensions.screenWidth - Dimensions.margin * 2,
  },
  saleIcon: {
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // width: "100%",
  },
  todoContainer: {
    gap: Dimensions.padding / 1.3,
    paddingRight: Dimensions.padding,
  },
  viewAll: {
    color: CombinedDefaultTheme.colors.primary,
    letterSpacing: 0,
  },
});

export default Home;
