/*global setTimeout, clearTimeout*/
import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import Pdf from "react-native-pdf";

import AssignmentScreen from "../screens/Course/AssignmentScreen";
import TestScreen from "../screens/Course/TestScreen";
import { DIRECTION, JUSTIFY, RESIZE_MODE, SIZE } from "../styles/constStyle";
import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { ACCORDIOM_ITEM_TYPE, Dimensions } from "../utils/constant";
import VideoPlayer from "./VideoPlayer";

const SIZE_8 = Dimensions.margin * 0.5;
const SIZE_12 = Dimensions.margin * 0.75;
const SIZE_16 = Dimensions.margin;
const SIZE_20 = Dimensions.margin * 1.25;
const SIZE_24 = Dimensions.margin * 1.5;

const CourseHeaderContent = ({ type }) => {
  const [viewAllText, setViewAllText] = React.useState(7);
  const [urlCopy, setUrlCopy] = React.useState(false);
  const copyIcon = require("../assets/icons/copy_1.png");
  const copiedIcon = require("../assets/icons/copy.png");
  const externalIcon = require("../assets/icons/external_link.png");
  const thumbnailImage = require("../assets/thumbnail.png");
  const workingCopyLink = urlCopy ? copyIcon : copiedIcon;

  const url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const source = {
    cache: true,
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  };

  const viewMoreHandler = () => {
    setViewAllText(null);
  };

  const copyHandler = async (url) => {
    Clipboard.setString(url);
    setUrlCopy(true);
    const timeout = setTimeout(() => {
      setUrlCopy(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const externalLinkHandler = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Can't open this link.");
    }
  };

  if (type === ACCORDIOM_ITEM_TYPE.OVERVIEW) {
    return (
      <View style={styles.readingContainer}>
        <Image
          resizeMode={RESIZE_MODE.COVER}
          source={thumbnailImage}
          style={styles.thumbnail}
        />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={viewAllText}
            style={styles.bodyText}
            variant="bodyMedium"
          >
            No matter what technical level your employees are at, there's always
            some room for improvement...
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
  } else if (type === ACCORDIOM_ITEM_TYPE.VIDEO) {
    return (
      <VideoPlayer
        containerStyle={styles.playerContainerStyle}
        playerStyle={styles.playerStyle}
        url={url}
      />
    );
  } else if (type === ACCORDIOM_ITEM_TYPE.READING) {
    return (
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
          style={styles.pdf}
          onError={(error) => console.log(error)}
        />
      </View>
    );
  } else if (type === ACCORDIOM_ITEM_TYPE.WEBLINK) {
    return (
      <View style={styles.webLinkContainer}>
        <View style={styles.emptySpace} />
        <View style={styles.webLinkContent}>
          <View style={styles.webLinkTextContainer}>
            <Text style={styles.copyHeadingText} variant="labelLarge">
              URL of webpage
            </Text>
            <View style={styles.copyLinkContainer}>
              <Text style={styles.copyLinkText} variant="bodyMedium">
                https://onmyowntechnology.com/
              </Text>
              <TouchableOpacity
                onPress={() => copyHandler("https://onmyowntechnology.com")}
              >
                <Image source={workingCopyLink} style={styles.menuImage} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewLinkContainer}
            onPress={() => externalLinkHandler("https://onmyowntechnology.com")}
          >
            <Image source={externalIcon} style={styles.menuImage} />
            <Text style={styles.viewLinkText} variant="labelMedium">
              View Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (type === ACCORDIOM_ITEM_TYPE.TEST) {
    return <TestScreen />;
  } else if (type === ACCORDIOM_ITEM_TYPE.ASSIGNMENT) {
    return <AssignmentScreen />;
  }
};

export default CourseHeaderContent;

const styles = StyleSheet.create({
  assignmentContainer: {
    marginBottom: SIZE_20,
    paddingHorizontal: SIZE_12,
    paddingTop: SIZE_12,
  },
  bodyText: {
    color: palette.grey900,
  },
  copyHeadingText: {
    color: palette.grey900,
    fontWeight: "600",
  },
  copyLinkContainer: {
    alignItems: JUSTIFY.CENTER,
    backgroundColor: palette.neutral50,
    borderColor: palette.grey200,
    borderRadius: SIZE_12,
    borderWidth: 1,
    columnGap: SIZE_8,
    elevation: 1,
    flexDirection: DIRECTION.ROW,
    paddingHorizontal: SIZE_12,
    paddingVertical: SIZE_8,
    shadowColor: palette.grey900,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  copyLinkText: {
    color: palette.grey900,
    flex: 1,
  },
  emptySpace: {
    height: SIZE_24,
  },
  menuImage: {
    height: SIZE_20,
    width: SIZE_20,
  },
  pdf: {
    height: SIZE_16 * 12.5,
    width: SIZE.FULL,
  },
  pdfContainer: {
    alignItems: JUSTIFY.CENTER,
    justifyContent: JUSTIFY.FLEX_START,
    marginBottom: SIZE_20,
    marginTop: SIZE_24,
  },
  playerContainerStyle: {
    marginBottom: SIZE_20,
  },
  playerStyle: {
    height: SIZE_16 * 13.875,
  },
  readingContainer: {
    marginBottom: SIZE_20,
    rowGap: SIZE_16,
  },
  textContainer: {
    paddingHorizontal: SIZE_16,
  },
  thumbnail: {
    height: SIZE_16 * 13.75,
    width: SIZE.FULL,
  },
  viewLinkContainer: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_8,
    flexDirection: DIRECTION.ROW,
  },
  viewMoreButton: {
    paddingVertical: SIZE_8,
  },
  viewMoreText: {
    color: CombinedDefaultTheme?.colors?.primary,
  },
  webLinkContainer: {
    marginBottom: SIZE_20,
    paddingHorizontal: SIZE_16,
    paddingTop: SIZE_12,
  },
});
