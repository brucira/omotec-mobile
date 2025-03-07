import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import useModal from "../../hooks/useModal";
import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, DOWNLOAD_LIST } from "../../utils/constant";
import BottomDrawer from "../BottomDrawer";
import FeedbackForm from "../FeedbackForm";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;

export const RecordingsContent = () => {
  const { modalRef, openModal, closeModal } = useModal();
  const imageurl = require("../../assets/icons/download.png");

  const downloadFile = async (url, fileName) => {
    try {
      if (Platform.OS === "ios" && !MediaLibrary.requestPermissionsAsync) {
        Alert.alert("Error", "Media Library not available on this platform.");
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "You need to allow media access.");
        return;
      }

      const fileUri = FileSystem.documentDirectory + fileName + ".mp4";
      const downloadObject = FileSystem.createDownloadResumable(url, fileUri);
      const { uri } = await downloadObject.downloadAsync();
      console.log("download File", uri);

      if (uri) {
        console.log(uri);
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Download Complete", "The file has been saved.");
        openModal();
      }
    } catch (error) {
      Alert.alert(
        "Download Failed",
        "There was an error downloading the file.",
      );
      console.error(error);
    }
  };

  const onSubmitRatingHandler = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      {DOWNLOAD_LIST.map((video, index) => (
        <TouchableOpacity
          key={index}
          style={styles.videoItem}
          onPress={() => downloadFile(video.url, video.name)}
        >
          <Image source={imageurl} style={styles.icon} />
          <Text style={styles.videoText} variant="titleSmall">
            {video.name}
          </Text>
        </TouchableOpacity>
      ))}
      <BottomDrawer ref={modalRef} showIndicator={false}>
        <FeedbackForm onSubmit={onSubmitRatingHandler}></FeedbackForm>
      </BottomDrawer>
    </View>
  );
};

export default RecordingsContent;

const styles = StyleSheet.create({
  container: {
    padding: SIZE_16,
    rowGap: SIZE_20,
  },
  icon: {
    height: SIZE_20,
    width: SIZE_20,
  },
  videoItem: {
    alignItems: JUSTIFY.CENTER,
    columnGap: 8,
    flexDirection: DIRECTION.ROW,
  },
  videoText: {
    color: CombinedDefaultTheme.colors.primary,
  },
});
