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

import AssignmentScreen from "../screens/Course/AssignmentScreen";
import TestScreen from "../screens/Course/TestScreen";
import { DIRECTION, JUSTIFY } from "../styles/constStyle";
import palette from "../styles/palette";
import { ACCORDIOM_ITEM_TYPE, Dimensions } from "../utils/constant";
import OverView from "./CourseHeader/OverView";
import PDFViewer from "./CourseHeader/PDFViewer";
import VideoPlayer from "./CourseHeader/VideoPlayer";

const SIZE_16 = Dimensions.margin;
const SIZE_8 = SIZE_16 * 0.5;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const CourseHeaderContent = ({ type }) => {
  const [urlCopy, setUrlCopy] = React.useState(false);
  const copyIcon = require("../assets/icons/copy_1.png");
  const copiedIcon = require("../assets/icons/copy.png");
  const externalIcon = require("../assets/icons/external_link.png");
  const workingCopyLink = urlCopy ? copyIcon : copiedIcon;

  const url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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
    return <OverView />;
  } else if (type === ACCORDIOM_ITEM_TYPE.VIDEO) {
    return <VideoPlayer url={url} />;
  } else if (type === ACCORDIOM_ITEM_TYPE.READING) {
    return <PDFViewer />;
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
  viewLinkContainer: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_8,
    flexDirection: DIRECTION.ROW,
  },
  webLinkContainer: {
    marginBottom: SIZE_20,
    paddingHorizontal: SIZE_16,
    paddingTop: SIZE_12,
  },
});
