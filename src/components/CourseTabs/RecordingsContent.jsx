import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import useModal from "../../hooks/useModal";
import BottomDrawer from "../BottomDrawer";
import FeedbackForm from "../FeedbackForm";

export const RecordingsContent = () => {
  const { modalRef, openModal, closeModal } = useModal();
  const imageurl = require("../../assets/icons/download.png");
  const downloadURL =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

  const arrayList = [
    { name: "Session1", url: downloadURL },
    { name: "Session II video (mp4)", url: downloadURL },
    { name: "Session III video (mp4)", url: downloadURL },
    { name: "Session IV video (mp4)", url: downloadURL },
  ];

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
      {arrayList.map((video, index) => (
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
    padding: 16,
    rowGap: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  videoItem: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
  },
  videoText: {
    color: "#852DCD",
  },
});
