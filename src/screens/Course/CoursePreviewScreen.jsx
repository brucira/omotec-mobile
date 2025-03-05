import { Image } from "expo-image";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import CourseHeaderContent from "../../components/CourseHeaderContent";
import { DiscussionsContent } from "../../components/CourseTabs/DiscussionsContent";
import { KitContent } from "../../components/CourseTabs/KitContent";
import NoteContent from "../../components/CourseTabs/NoteContent";
import { OverviewContent } from "../../components/CourseTabs/OverviewContent";
import RecordingsContent from "../../components/CourseTabs/RecordingsContent";
import ReviewsContent from "../../components/CourseTabs/ReviewsContent";
import { SessionsContent } from "../../components/CourseTabs/SessionsContent";
import CustomMenu from "../../components/CustomMenu";
import CustomTabs from "../../components/CustomTabs";

export const CoursePreviewScreen = (props) => {
  const { type } = props?.route?.params;

  const tabs = [
    {
      content: <SessionsContent />,
      key: "sessions",
      title: "Sessions",
    },
    {
      content: <OverviewContent />,
      key: "overview",
      title: "Overview",
    },
    {
      content: <KitContent />,
      key: "kits",
      title: "Kits",
    },
    {
      content: <DiscussionsContent />,
      key: "discussions",
      title: "Discussions",
    },
    {
      content: <NoteContent />,
      key: "notes",
      title: "Notes",
    },
    {
      content: <ReviewsContent />,
      key: "reviews",
      title: "Reviews",
    },
    {
      content: <RecordingsContent />,
      key: "recordings",
      title: "Recordings",
    },
  ];

  const menuItem = [
    {
      imageurl: require("../../assets/icons/star_1.png"),
      onItemPress: () => console.log("Leave a rating"),
      title: "Leave a rating",
    },
    {
      imageurl: require("../../assets/icons/share.png"),
      onItemPress: () => console.log("Share"),
      title: "Share",
    },
  ];

  const menuItemHanler = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={item?.onItemPress}
      >
        <Image source={item.imageurl} style={styles.menuImage} />
        <Text style={{ flex: 1 }} variant="titleSmall">
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 0 : 100}
      style={{ backgroundColor: "white", flex: 1 }}
    >
      <CourseHeaderContent type={type} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title} variant="titleMedium">
              What is Employee Training ?
            </Text>
            <CustomMenu
              anchor={
                <Image
                  source={require("../../assets/icons/more_vertical.png")}
                  style={styles.moreVerticalIcon}
                />
              }
            >
              {menuItem?.map(menuItemHanler)}
            </CustomMenu>
          </View>
          <Text
            numberOfLines={2}
            style={styles.description}
            variant={"bodySmall"}
          >
            John Doe
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <CustomTabs tabs={tabs} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  description: {
    color: "#475467",
  },
  detailsContainer: {
    flex: 1,
    rowGap: 8,
  },
  menuImage: {
    height: 20,
    width: 20,
  },
  menuItem: {
    columnGap: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  moreVerticalIcon: {
    height: 24,
    width: 24,
  },
  tabContainer: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 16,
    rowGap: 2,
  },
  title: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 24,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CoursePreviewScreen;
