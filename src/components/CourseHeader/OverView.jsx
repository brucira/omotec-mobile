import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RESIZE_MODE, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const SIZE_8 = Dimensions.margin * 0.5;
const SIZE_16 = Dimensions.margin;
const SIZE_20 = Dimensions.margin * 1.25;
const SIZE_24 = Dimensions.margin * 1.5;

const OverView = ({ customBackNavigate }) => {
  const navigation = useNavigation();
  const [viewAllText, setViewAllText] = React.useState(7);
  const thumbnailImage = require("../../assets/thumbnail.png");
  const backIcon = require("../../assets/icons/chevron_left.png");
  const content =
    "No matter what technical level your employees are at, there's always some room for improvement. Technical skills (or hard skills as some people like to call them) mainly include on-the-job tasks like data analysis, coding, writing, account management, programming, etc. Technical skills training is an essential process every business needs to put their employees through, simply, because employees will know how to do their job right. And as for those who are already good at what they're doing, trust us, they'll become the stars of your organization by learning more than they already know. Technical skills training can either be included in employees' onboarding training or anytime an existing employee would like to expand their skillset. Never forget there's always something new to learn.";

  const viewMoreHandler = () => {
    setViewAllText(null);
  };

  const gobackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      customBackNavigate && customBackNavigate();
    }
  };

  return (
    <View style={styles.overviewContainer}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={gobackHandler}
      >
        <Image
          contentFit={RESIZE_MODE.COVER}
          source={backIcon}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Image
        contentFit={RESIZE_MODE.COVER}
        source={thumbnailImage}
        style={styles.thumbnail}
      />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={viewAllText}
          style={styles.bodyText}
          variant="bodyMedium"
        >
          {content}
        </Text>
        {viewAllText && (
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={viewMoreHandler}
          >
            <Text style={styles.viewMoreText} variant="labelMedium">
              View More
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    height: SIZE_24,
    width: SIZE_24,
  },
  backIconContainer: {
    left: SIZE_16 / 2,
    position: "absolute",
    top: SIZE_16 * 0.75,
    zIndex: 1,
  },
  bodyText: {
    color: palette.grey900,
  },
  overviewContainer: {
    marginBottom: SIZE_20,
    marginTop: SIZE_16,
    rowGap: SIZE_16,
  },
  textContainer: {
    paddingHorizontal: SIZE_16,
  },
  thumbnail: {
    height: SIZE_24 * 10,
    width: SIZE.FULL,
  },
  viewMoreButton: {
    paddingVertical: SIZE_8,
  },
  viewMoreText: {
    color: CombinedDefaultTheme?.colors?.primary,
  },
});

export default OverView;
