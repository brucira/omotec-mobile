import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, Badge, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  courseCardData,
  Dimensions,
  projectCardData,
  RouteNames,
} from "../../utils/constant";
import LargeCourseCard from "./LargeCourseCard";

const Learning = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Courses");
  const translateX = useSharedValue(0);
  const keyExtractor = (item) => item.id.toString();
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const renderItemForCourse = ({ index, item }) => (
    <LargeCourseCard key={item.id} {...item} />
  );

  const renderItemForProject = ({ index, item }) => (
    <LargeCourseCard key={item.id} {...item} />
  );

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    translateX.value = tab === "Courses" ? 0 : 112;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 300 }) },
    ],
  }));

  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Content
          title={<Text variant="titleMedium">My Learnings</Text>}
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
        <View style={styles.toggleContainer}>
          <Animated.View style={[styles.slider, animatedStyle]} />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("Courses")}
          >
            <Text
              style={[
                styles.text,
                activeTab === "Courses" && styles.activeText,
              ]}
              variant="labelLarge"
            >
              Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress("Projects")}
          >
            <Text
              style={[
                styles.text,
                activeTab === "Projects" && styles.activeText,
              ]}
              variant="labelLarge"
            >
              Projects
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Courses" ? (
          <View style={styles.courseContainer}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: Dimensions.margin / 1.142,
              }}
            >
              <Text variant="titleLarge">Ongoing courses</Text>
              <Text variant="titleLarge"> (2)</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.arrowIndicator}
              data={courseCardData}
              ItemSeparatorComponent={itemSeperator}
              keyExtractor={keyExtractor}
              renderItem={renderItemForCourse}
              scrollEnabled={false}
              style={styles.ongoingCardList}
            />
          </View>
        ) : (
          <View style={styles.courseContainer}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: Dimensions.margin / 1.142,
              }}
            >
              <Text variant="titleLarge">Ongoing projects</Text>
              <Text variant="titleLarge"> (2)</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.arrowIndicator}
              data={projectCardData}
              ItemSeparatorComponent={itemSeperator}
              keyExtractor={keyExtractor}
              renderItem={renderItemForProject}
              scrollEnabled={false}
              style={styles.ongoingCardList}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeText: {
    color: "white",
  },
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    // padding: Dimensions.padding,
  },
  courseContainer: {
    flex: 1,
    marginBottom: Dimensions.margin / 1.14,
    paddingHorizontal: Dimensions.padding,
  },
  dot: {
    backgroundColor: palette.error500,
    position: "absolute",
    right: "32%",
    top: "24%",
  },
  itemSeparator: {
    height: Dimensions.margin / 1.33,
  },
  slider: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderRadius: 50,
    height: 40,
    left: 4,
    position: "absolute",
    top: 4,
    width: 114,
  },
  tab: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    color: palette.grey600,
    fontSize: 16,
    fontWeight: "600",
  },
  toggleContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: palette.grey100,
    borderColor: palette.grey200,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: "row",
    height: 50,
    marginVertical: Dimensions.padding * 1.25,
    position: "relative",
    width: 236,
  },
});

export default Learning;
