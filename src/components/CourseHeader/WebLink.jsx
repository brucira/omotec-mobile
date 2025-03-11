/*global setTimeout, clearTimeout*/
import Clipboard from "@react-native-clipboard/clipboard";
import { Image } from "expo-image";
import React from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";
import CourseTabBack from "../CourseTabBack";

const SIZE_16 = Dimensions.margin;
const SIZE_8 = SIZE_16 * 0.5;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;

const WebLink = () => {
  const [urlCopy, setUrlCopy] = React.useState(false);
  const copyIcon = require("../../assets/icons/copy_1.png");
  const copiedIcon = require("../../assets/icons/copy.png");
  const externalIcon = require("../../assets/icons/external_link.png");
  const workingCopyLink = urlCopy ? copyIcon : copiedIcon;
  const link = "https://onmyowntechnology.com/";

  const copyHandler = async () => {
    Clipboard.setString(link);
    setUrlCopy(true);
    const timeout = setTimeout(() => {
      setUrlCopy(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const externalLinkHandler = async () => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert("Error", "Can't open this link.");
    }
  };

  return (
    <View style={styles.webLinkContainer}>
      <CourseTabBack />
      <View style={styles.webLinkContent}>
        <View style={styles.webLinkTextContainer}>
          <Text style={styles.copyHeadingText} variant="custom600_14">
            URL of webpage
          </Text>
          <View style={styles.copyLinkContainer}>
            <Text style={styles.copyLinkText} variant="bodyMedium">
              {link}
            </Text>
            <TouchableOpacity onPress={copyHandler}>
              <Image source={workingCopyLink} style={styles.menuImage} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewLinkContainer}
          onPress={externalLinkHandler}
        >
          <Image source={externalIcon} style={styles.menuImage} />
          <Text style={styles.viewLinkText} variant="custom500_12">
            View Link
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WebLink;

const styles = StyleSheet.create({
  copyHeadingText: {
    color: palette.grey900,
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
  menuImage: {
    height: SIZE_20,
    width: SIZE_20,
  },
  viewLinkContainer: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_8,
    flexDirection: DIRECTION.ROW,
  },
  viewLinkText: {
    color: palette.purple600,
  },
  webLinkContainer: {
    marginBottom: SIZE_20,
    paddingHorizontal: SIZE_16,
    paddingTop: SIZE_12,
    rowGap: SIZE_20,
  },
  webLinkContent: {
    rowGap: SIZE_12,
  },
  webLinkTextContainer: { rowGap: SIZE_12 / 2 },
});
