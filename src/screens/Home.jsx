import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions, RouteNames } from "../utils/constant";

const Home = ({ navigation }) => {
  const keyExtractor = (item) => item.toString();
  const renderItem = ({ index }) => <CourseCard index={index} />;

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
      <ScrollView style={styles.contentContainer}>
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/banner.png")}
            style={styles.banner}
          />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.conterHeadingContainer}>
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
            data={[1, 2]}
            horizontal={true}
            ItemSeparatorComponent={itemSeperator}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.ongoingCardList}
          />
        </View>
        <View style={styles.containerBox}>
          <View style={styles.conterHeadingContainer}>
            <Text variant="titleLarge">Daily Calendar</Text>
            <Text
              style={{ color: CombinedDefaultTheme.colors.primary }}
              variant="titleSmall"
            >
              View all
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.arrowIndicator}
            data={[1, 2]}
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
  banner: {
    alignSelf: "center",
    backgroundColor: palette.transparent,
    borderRadius: Dimensions.padding / 1.33,
    height: 123,
    resizeMode: "cover",
    width: "100%",
  },
  bannerContainer: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: Dimensions.margin / 2,
    marginTop: Dimensions.margin,
    paddingHorizontal: Dimensions.padding,
    width: Dimensions.screenWidth,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  containerBox: {
    paddingBottom: Dimensions.padding * 1.25,
    paddingHorizontal: Dimensions.padding,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  conterHeadingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: Dimensions.padding / 1.14,
  },
  itemSeparator: {
    width: 12,
  },
  ongoingCardList: {
    gap: Dimensions.padding / 1.33,
  },
});

export default Home;
