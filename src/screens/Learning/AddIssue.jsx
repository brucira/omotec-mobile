import * as DocumentPicker from "expo-document-picker";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  Appbar,
  ProgressBar,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, dropdownData } from "../../utils/constant";
import { issueSchema } from "../../utils/schema";

const MODERATE = "moderate";
const AddIssue = ({ visible, hideModal }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState();
  const [issueName, setIssueName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [, setSeverityType] = useState(MODERATE);
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState();
  const bottomDrawerRef = useRef(null);
  const formatFileSize = useCallback((bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }, []);
  const itemSeperator = () => <View style={styles.itemSeparator} />;
  const keyExtractor = (item) => item.toString();
  const handleDelete = (fileId) => {
    setAllFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };
  const handleSeverity = useCallback(() => {
    bottomDrawerRef.current?.present();
  }, []);

  const onAddIssuePress = () => {
    if (isValid) {
      hideModal(true);
    }
  };
  const onChangeIssueName = (text) => {
    setIssueName(text);
    validateInputs();
  };
  const onChangeIssueDescription = (text) => {
    setDescription(text);
    validateInputs();
  };
  const onClearPress = () => {
    setAllFiles([]);
    setDescription("");
    setValueOfFirstDropdown();
    setIssueName("");
    setResetKey((prevKey) => prevKey + 1); // Changing key forces re-render
  };
  const onDropdownChange = (item) => {
    setValueOfFirstDropdown(item.value);
    setFocusOfFirstDropdown(false);
    setSeverityType(valueOfFirstDropdown);
  };
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
      setAllFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (error) {
      console.log("error detail: ", error);
    }
  };
  const renderItem = ({ file }) => (
    <View style={styles.contentContainer}>
      <View>
        <Text style={{ color: palette.grey900 }} variant="labelLarge">
          Issue ID
        </Text>
        <Surface
          elevation={Platform.OS === "ios" ? 6 : null}
          mode="flat"
          style={styles.surface}
        >
          <TextInput
            contentStyle={styles.issueContentStyle}
            cursorColor={palette.grey900}
            dense={true}
            editable={false}
            // disabled={true}
            style={styles.issueInput}
            underlineColor={CombinedDefaultTheme.colors.background}
            value="IS-001"
          />
        </Surface>
      </View>
      <View>
        <Text style={{ color: palette.grey900 }} variant="labelLarge">
          Issue Name
        </Text>
        <Surface
          elevation={Platform.OS === "ios" ? 6 : null}
          mode="flat"
          style={styles.surface}
        >
          <TextInput
            activeUnderlineColor={palette.grey200}
            contentStyle={styles.issueContentStyle}
            cursorColor={palette.grey900}
            dense={true}
            placeholder="Video Playback Error"
            selectionColor={palette.grey900}
            style={styles.issueInput}
            underlineColor={CombinedDefaultTheme.colors.background}
            onChangeText={onChangeIssueName}
          />
        </Surface>
      </View>
      <View>
        <Text style={{ color: palette.grey900 }} variant="labelLarge">
          Severity
        </Text>
        <Surface
          elevation={Platform.OS === "ios" ? 6 : null}
          mode="flat"
          style={styles.surface}
        >
          <TouchableOpacity style={styles.severity} onPress={handleSeverity}>
            <Dropdown
              search
              placeholder={
                !focusOfFirstDropdown ? (
                  <Text variant="labelLarge">Status</Text>
                ) : (
                  <Text variant="labelLarge">...</Text>
                )
              }
              data={dropdownData}
              iconStyle={styles.iconStyle}
              inputSearchStyle={styles.inputSearchStyle}
              labelField="label"
              maxHeight={300}
              placeholderStyle={styles.placeholderStyle}
              renderRightIcon={renderDropdownRightIcon}
              searchPlaceholder="Search..."
              selectedTextStyle={styles.selectedTextStyle}
              style={[styles.singleList, { borderColor: palette.transparent }]}
              value={valueOfFirstDropdown}
              valueField="value"
              onBlur={() => setFocusOfFirstDropdown(false)}
              onChange={onDropdownChange}
              onFocus={() => setFocusOfFirstDropdown(true)}
            />
          </TouchableOpacity>
        </Surface>
      </View>
      <View>
        <Text style={{ color: palette.grey900 }} variant="labelLarge">
          Description
        </Text>
        <Surface
          elevation={Platform.OS === "ios" ? 6 : null}
          mode="flat"
          style={styles.surface}
        >
          <TextInput
            activeUnderlineColor={palette.transparent}
            blurOnSubmit={true}
            contentStyle={styles.issueDescriptionContentStyle}
            cursorColor={palette.grey900}
            dense={true}
            multiline={true}
            numberOfLines={10}
            placeholder="Video Playback Error"
            selectionColor={palette.grey900}
            style={styles.issueDescription}
            underlineColor={CombinedDefaultTheme.colors.background}
            onChangeText={onChangeIssueDescription}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </Surface>
      </View>
      <View>
        <Text style={{ color: palette.grey600 }} variant="labelLarge">
          Upload additional file
        </Text>
        {allFiles.map((file, index) => (
          <TouchableOpacity
            key={file.id}
            style={styles.assignmentContainer}
            onPress={() => {}}
          >
            <View style={styles.fileContent}>
              <Image
                source={require("../../assets/icons/file.png")}
                style={styles.file}
              />
              <View style={styles.content}>
                <View>
                  <View style={styles.checkIconContainer}>
                    <Text
                      numberOfLines={1}
                      style={{ color: palette.grey800, maxWidth: "80%" }}
                      variant="labelMedium"
                    >
                      {file.fileName}
                      {/* kit_cover.jpg */}
                    </Text>
                    <TouchableOpacity onPress={() => handleDelete(file.id)}>
                      <Image
                        source={require("../../assets/icons/trash_bin.png")}
                        style={styles.backIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ color: palette.grey600 }}
                    variant="bodySmall"
                  >
                    {file.fileSize}
                    {/* 200KB */}
                  </Text>
                  <View style={styles.progress}>
                    <ProgressBar
                      color={palette.success600}
                      progress={100 / 100}
                      style={styles.progressBar}
                    />
                    <Text style={styles.progressText} variant="labelMedium">
                      {100} %
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addFileContainer}
          onPress={pickDocument}
        >
          <Image
            source={require("../../assets/icons/plus.png")}
            style={styles.backIcon}
            tintColor={CombinedDefaultTheme.colors.primary}
          />
          <Text
            style={{ color: CombinedDefaultTheme.colors.primary }}
            variant="labelMedium"
          >
            Add additional files
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDropdownRightIcon = () => (
    <Image
      color={focusOfFirstDropdown ? "blue" : "black"}
      source={require("../../assets/icons/chevron_down.png")}
      style={styles.dropDownIcon}
    />
  );

  const validateInputs = () => {
    const result = issueSchema.safeParse({
      description,
      issueName,
      // severityType,
    });
    setIsValid(result.success);
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
          <Appbar.Action
            icon={require("../../assets/icons/chevron_left.png")}
            style={styles.backIcon}
            onPress={hideModal}
          />
          <Appbar.Content
            title={<Text variant="custom600_14">Add issue</Text>}
          />
        </Appbar>

        <FlatList
          key={resetKey}
          contentContainerStyle={styles.arrowIndicator}
          data={[1]}
          extraData={{ description, issueName, valueOfFirstDropdown }}
          ItemSeparatorComponent={itemSeperator}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.ongoingCardList}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.attendanceContainer}>
            <PrimaryButton
              backgroundColor={palette.grey100}
              borderColor={palette.grey200}
              content={"Clear"}
              textColor={palette.grey900}
              onPress={onClearPress}
            />
          </View>
          <View style={styles.attendanceContainer}>
            <PrimaryButton
              backgroundColor={
                !isValid
                  ? palette.primaryStudent200
                  : CombinedDefaultTheme.colors.primary
              }
              borderColor={
                !isValid ? palette.primaryStudent300 : palette.purple600
              }
              content={"Add issue"}
              disabled={isValid ? true : false}
              textColor={CombinedDefaultTheme.colors.background}
              // onPress={() => hideModal(true)}
              onPress={onAddIssuePress}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addFileContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 4,
    paddingVertical: Dimensions.padding / 1.6,
  },
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
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
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  bottomContainer: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
    zIndex: 4,
  },
  bottomSheetContainer: {
    gap: Dimensions.margin / 2,
    height: "auto",
    // paddingBottom: Dimensions.padding * 1.5,
    marginBottom: Dimensions.margin * 4.375,
    paddingHorizontal: Dimensions.padding,
    paddingTop: Dimensions.padding / 1.33,
  },
  checkIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderTopColor: palette.neutral100,
    // borderTopWidth: 1,
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    gap: Dimensions.margin * 1.25,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  dropDownIcon: {
    height: Dimensions.margin,
    width: Dimensions.margin,
  },
  file: {
    height: Dimensions.margin * 2,
    width: Dimensions.margin * 2,
  },
  fileContent: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
  issueContentStyle: {
    backgroundColor: palette.transparent,
    fontSize: Dimensions.margin / 1.14,
    lineHeight: Dimensions.margin * 1.25,
    paddingHorizontal: Dimensions.padding / 1.33,
  },
  issueDescription: {
    backgroundColor: palette.transparent,
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    // justifyContent: "flex-start",
    // height: 200,

    // borderBottomWidth: 1,
  },
  issueDescriptionContentStyle: {
    color: palette.grey900,
    fontSize: Dimensions.margin / 1.14,
    height: 100,
    lineHeight: Dimensions.margin * 1.25,
    textAlignVertical: "top",
  },
  issueInput: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin / 2,
    elevation: Platform.OS === "android" ? 0.4 : null,
    marginTop: Dimensions.margin / 2.66,
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
  progressText: {
    color: palette.grey600,
  },
  selectedTextStyle: {
    color: palette.grey900,
    fontSize: Dimensions.margin / 1.14,
    lineHeight: Dimensions.margin * 1.25,
  },
  severity: {
    elevation: 1,
    paddingHorizontal: Dimensions.padding / 1.33,
    paddingVertical: Dimensions.padding / 2,
  },
  singleList: {
    alignItems: "baseline",

    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    height: 30,
  },
  surface: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderRadius: Dimensions.margin / 2,
    elevation: 3,
    marginTop: Dimensions.margin / 2.66,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
export default AddIssue;
