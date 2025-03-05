import * as DocumentPicker from "expo-document-picker";
import React, { useCallback, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, ProgressBar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import { fileSchema } from "../utils/schema";
import PrimaryButton from "./PrimaryButton";
import Tag from "./Tag";

const AssignmentModal = ({ visible, hideModal, onSavePress }) => {
  const [file, setFile] = useState(null);

  const formatFileSize = useCallback((bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      if (result.canceled) return;
      const selectedFile = result.assets[0];

      const newFile = {
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
        fileType: selectedFile.mimeType,
        id: Date.now(),
        progress: 0,
        uri: selectedFile.uri,
      };

      const validationResult = fileSchema.safeParse(newFile);
      if (validationResult.success) {
        setFile(newFile);
      } else {
        console.log("Validation failed:", validationResult.error);
      }
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  const handleDelete = () => {
    setFile(null);
  };
  const onSavePressHandler = () => {
    if (file) {
      onSavePress();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBarContainer}>
          <Appbar.Content
            title={
              <View>
                <Text variant="titleLarge">Assignment</Text>
              </View>
            }
          />
          <Appbar.Action
            icon={require("../assets/icons/close.png")}
            style={styles.backIcon}
            onPress={hideModal}
          />
        </Appbar>

        <View style={styles.contentContainer}>
          <View style={{ gap: Dimensions.padding }}>
            <View style={styles.content}>
              <Text style={styles.assignmentQuestion} variant="bodyMedium">
                How can I create and organize robotics course materials on an
                LMS?
              </Text>
              <Tag
                backgroundColor={palette.primaryStudent50}
                label={"10 Mark"}
                textColor={CombinedDefaultTheme.colors.primary}
              />
            </View>

            {!file && (
              <View>
                <Text style={styles.uploadContaier} variant="labelLarge">
                  Upload your answer key here.
                </Text>
                <TouchableOpacity style={styles.upload} onPress={pickDocument}>
                  <View>
                    <Image
                      source={require("../assets/icons/upload.png")}
                      style={styles.uploadIcon}
                    />
                    <View style={{ paddingTop: Dimensions.padding / 1.33 }}>
                      <Text style={styles.uploadTitle} variant="bodyMedium">
                        Click to upload{" "}
                        <Text style={{ color: palette.grey600 }}>
                          or drag and drop
                        </Text>
                      </Text>
                      <Text
                        style={styles.uploadDescription}
                        variant="bodySmall"
                      >
                        PNG, JPG, GIF up to 50MB
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {file && (
              <TouchableOpacity style={styles.assignmentContainer}>
                <View style={styles.fileContent}>
                  <Image
                    source={require("../assets/icons/file.png")}
                    style={styles.file}
                  />
                  <View style={styles.fileDescriptionContent}>
                    <View>
                      <View style={styles.checkIconContainer}>
                        <Text
                          numberOfLines={1}
                          style={{ maxWidth: "80%" }}
                          variant="labelSmall"
                        >
                          {file.fileName}
                        </Text>
                        <TouchableOpacity onPress={handleDelete}>
                          <Image
                            source={require("../assets/icons/trash_bin.png")}
                            style={styles.backIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text numberOfLines={1} variant="labelSmall">
                        {file.fileSize}
                      </Text>
                      <View style={styles.progress}>
                        <ProgressBar
                          color={CombinedDefaultTheme.colors.primary}
                          progress={100 / 100}
                          style={styles.progressBar}
                        />
                        <Text style={styles.progressText} variant="labelSmall">
                          {100}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Pressable onPress={onSavePressHandler}>
            <PrimaryButton
              backgroundColor={
                !file
                  ? palette.primaryStudent200
                  : CombinedDefaultTheme.colors.primary
              }
              borderColor={
                !file ? palette.primaryStudent300 : palette.purple600
              }
              content={"Save and Continue"}
              disabled={!file}
              textColor={CombinedDefaultTheme.colors.background}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  assignmentContainer: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    marginTop: Dimensions.margin / 1.33,
    paddingLeft: Dimensions.padding / 2.66,
    paddingRight: Dimensions.padding / 1.14,
    paddingVertical: Dimensions.padding / 2.66,
  },
  assignmentQuestion: {
    maxWidth: "80%",
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  checkIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  content: {
    flexDirection: "row",
    gap: Dimensions.padding / 1.33,
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  file: {
    height: Dimensions.margin * 2,
    width: Dimensions.margin * 2,
  },
  fileContent: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
  fileDescriptionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  progress: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 1.6,
    justifyContent: "space-between",
    width: "100%",
  },
  progressBar: {
    borderRadius: Dimensions.margin,
    height: 6,
    width: "236",
  },
  upload: {
    alignItems: "center",
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 1.33,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: Dimensions.padding / 2.66,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 2.0625,
  },
  uploadContaier: {},
  uploadDescription: {
    color: palette.grey600,
    paddingTop: Dimensions.padding / 4,
    textAlign: "center",
  },
  uploadIcon: {
    alignSelf: "center",
    height: Dimensions.margin * 2.5,
    resizeMode: "contain",
    width: Dimensions.margin * 2.5,
  },
  uploadTitle: {
    color: CombinedDefaultTheme.colors.primary,
  },
});

export default AssignmentModal;
