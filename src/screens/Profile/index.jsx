import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Badge, Button, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, RouteNames } from "../../utils/constant";
import ProfileRing from "./ProfileRing";
import SettingOption from "./SettingOption";

const Profile = ({ navigation }) => {
  const generalSettingsData = [
    {
      icon: require("../../assets/icons/wallet.png"),
      id: 111,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "My Wallet",
    },
    {
      icon: require("../../assets/icons/shopping_bag.png"),
      id: 112,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "My purchases",
    },
    {
      icon: require("../../assets/icons/users_plus.png"),
      id: 113,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "Refer a friend",
    },
  ];

  const contactSettingsData = [
    {
      icon: require("../../assets/icons/phone.png"),
      id: 114,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "Contact us",
    },
    {
      icon: require("../../assets/icons/message_square.png"),
      id: 115,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "Send feedback",
    },
    {
      icon: require("../../assets/icons/users.png"),
      id: 116,
      onPress: () => {
        navigation.navigate(RouteNames.Notifications);
      },
      title: "Discussion",
    },
  ];

  function renderGeneralData({ item, index }) {
    return (
      <SettingOption
        key={item.id}
        icon={item.icon}
        title={item.title}
        onPress={item.onPress}
      />
    );
  }
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
            <Text style={{ color: palette.grey900 }} variant="custom600_16">
              Profile
            </Text>
          }
        />
        <View>
          <Appbar.Action
            icon={require("../../assets/icons/notification.png")}
            onPress={() => navigation.navigate(RouteNames.Notifications)}
          />
          <Badge size={8} style={styles.dot}></Badge>
        </View>
      </Appbar>
      <View style={styles.contentContainer}>
        <View style={styles.profilePictureContainer}>
          <ProfileRing />
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.profilePicture}
          />
          <View style={styles.completeContainer}>
            <Text style={styles.completeText} variant="custom700">
              20% COMPLETE
            </Text>
          </View>
        </View>
        <View style={styles.userContent}>
          <Text style={{ color: palette.grey900 }} variant="custom500_18">
            Juilan, 12
          </Text>
          <Button
            icon={() => (
              <Image
                source={require("../../assets/icons/pencil.png")}
                style={styles.pencil}
                tintColor={palette.grey800}
              />
            )}
            contentStyle={styles.completeButtonContent}
            mode="outlined"
            style={styles.completeButton}
            textColor={palette.grey900}
          >
            Complete your profile
          </Button>
        </View>
        <ScrollView style={styles.profileSettingsContainer}>
          <View>
            <Text style={styles.sectionContainer} variant="labelSmall">
              GENERAL
            </Text>
            {generalSettingsData.map((item, index) => {
              return renderGeneralData({ index, item });
            })}
          </View>
          <View style={{ paddingTop: Dimensions.padding * 1.25 }}>
            <Text style={styles.sectionContainer} variant="labelSmall">
              CONTACT US
            </Text>
            {contactSettingsData.map((item, index) => {
              return renderGeneralData({ index, item });
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
  },
  backIcon: {
    alignSelf: "center",
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "cover",
    width: Dimensions.margin * 1.25,
  },
  completeButton: {
    borderColor: palette.grey200,
  },
  completeButtonContent: {
    fontSize: Dimensions.margin / 1.33,
    fontWeight: "500",
    gap: 0,
    letterSpacing: 0,
    lineHeight: Dimensions.margin,
    paddingHorizontal: Dimensions.padding / 4,
  },
  completeContainer: {
    alignSelf: "center",
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin * 2.5,
    borderWidth: 2,
    // height: 24,
    bottom: 0,
    // right: "50%",
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding / 2,
    position: "absolute",
  },
  completeText: {
    color: CombinedDefaultTheme.colors.background,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    paddingVertical: Dimensions.padding,
  },
  dot: {
    backgroundColor: palette.error500,
    position: "absolute",
    right: "32%",
    top: "24%",
  },
  pencil: {
    height: 16,
    width: 16,
  },
  profilePicture: {
    alignSelf: "center",
    borderRadius: 100,
    height: 152,
    position: "absolute",
    top: 14,
    width: 152,
  },
  profilePictureContainer: {
    marginTop: Dimensions.padding / 2,
  },
  profileSettingsContainer: {
    backgroundColor: palette.grey50,
    borderTopLeftRadius: Dimensions.margin * 1.5,
    borderTopRightRadius: Dimensions.margin * 1.5,
    flex: 1,
    gap: Dimensions.margin * 1.25,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding * 1.5,
  },
  sectionContainer: {
    color: palette.grey500,
    letterSpacing: 0.5,
    lineHeight: Dimensions.margin / 1.33,
    paddingBottom: Dimensions.padding / 2,
  },
  userContent: {
    alignItems: "center",
    gap: Dimensions.margin / 1.33,
    justifyContent: "center",
    marginBottom: Dimensions.margin * 1.5,
    marginTop: Dimensions.margin / 2,
  },
});

export default Profile;
