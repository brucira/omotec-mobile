import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, notificationData, RouteNames } from "../../utils/constant";
import NotificationCard from "./NotificationCard";

const Notifications = ({ navigation }) => {
  const renderNotificationCard = (item, index) => (
    <NotificationCard key={item.id} {...item} />
  );
  return (
    <View style={styles.container}>
      <Appbar style={styles.appBarContainer}>
        <Appbar.Action
          icon={require("../../assets/icons/chevron_left.png")}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
        <Appbar.Content
          title={<Text variant="titleMedium">Notification</Text>}
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
      <View style={styles.contentContainer}>
        {notificationData.length !== 1 ? (
          <ScrollView style={{}}>
            {/* <View style={{ height: Dimensions.margin }} /> */}
            {notificationData.map((item, index) => {
              return renderNotificationCard(item, index);
            })}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require("../../assets/empty/empty_notification.png")}
              style={styles.emptyNotification}
            />
            <Text style={{ color: palette.grey500 }} variant="bodyMedium">
              No Notifications
            </Text>
          </View>
        )}
      </View>
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
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // paddingHorizontal: Dimensions.padding,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    gap: Dimensions.padding,
    justifyContent: "center",
  },
  emptyNotification: {
    height: 175,
    resizeMode: "contain",
    width: 162,
  },
});

export default Notifications;
