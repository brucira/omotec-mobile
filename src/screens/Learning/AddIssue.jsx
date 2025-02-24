import React, { useCallback, useRef, useState } from "react";
import {
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
  Card,
  ProgressBar,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, dropdownData } from "../../utils/constant";

const HIGH = "high";
const MODERATE = "moderate";
const LOW = "low";
const AddIssue = ({ visible, hideModal }) => {
  const [severityType, setSeverityType] = useState(MODERATE);
  const [valueOfFirstDropdown, setValueOfFirstDropdown] = useState();
  const [focusOfFirstDropdown, setFocusOfFirstDropdown] = useState();
  const bottomDrawerRef = useRef(null);
  const handleSeverity = useCallback(() => {
    bottomDrawerRef.current?.present();
  }, []);
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
            title={<Text variant="titleMedium">Add issue</Text>}
          />
        </Appbar>
        <View style={styles.contentContainer}>
          <View>
            <Text>Issue ID</Text>
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
            <Text>Issue Name</Text>
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
              />
            </Surface>
          </View>
          <View>
            <Text>Severity</Text>
            <Surface
              elevation={Platform.OS === "ios" ? 6 : null}
              mode="flat"
              style={styles.surface}
            >
              <TouchableOpacity
                // activeUnderlineColor={palette.grey200}
                // contentStyle={styles.issueContentStyle}
                // dense={true}
                style={styles.severity}
                // underlineColor={CombinedDefaultTheme.colors.background}
                // value={severityType}
                onPress={handleSeverity}
              >
                <Dropdown
                  search
                  renderRightIcon={() => (
                    <Image
                      color={focusOfFirstDropdown ? "blue" : "black"}
                      // name="Safety"
                      source={require("../../assets/icons/chevron_down.png")}
                      // size={20}
                      style={styles.dropDownIcon}
                    />
                  )}
                  style={[
                    styles.singleList,
                    { borderColor: palette.transparent },
                  ]}
                  data={dropdownData}
                  iconStyle={styles.iconStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  labelField="label"
                  maxHeight={300}
                  placeholder={!focusOfFirstDropdown ? "Status" : "..."}
                  placeholderStyle={styles.placeholderStyle}
                  searchPlaceholder="Search..."
                  selectedTextStyle={styles.selectedTextStyle}
                  value={valueOfFirstDropdown}
                  valueField="value"
                  onChange={(item) => {
                    setValueOfFirstDropdown(item.value);
                    setFocusOfFirstDropdown(false);
                  }}
                  onBlur={() => setFocusOfFirstDropdown(false)}
                  onFocus={() => setFocusOfFirstDropdown(true)}
                />
              </TouchableOpacity>
            </Surface>
          </View>
          <View>
            <Text>Description</Text>
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
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </Surface>
          </View>
          <View>
            <Text>Upload additional file</Text>
            <TouchableOpacity
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
                      <Text numberOfLines={1} variant="labelSmall">
                        {/* {fileName} */}
                        kit_cover.jpg
                      </Text>
                      <Image
                        source={require("../../assets/icons/check.png")}
                        style={styles.backIcon}
                      />
                    </View>
                    <Text numberOfLines={1} variant="labelSmall">
                      {/* {fileSize} */}
                      200KB
                    </Text>
                    <View style={styles.progress}>
                      <ProgressBar
                        color={palette.success600}
                        progress={100 / 100}
                        style={styles.progressBar}
                      />
                      <Text style={styles.progressText} variant="labelSmall">
                        {100} %
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.attendanceContainer}>
            <PrimaryButton
              backgroundColor={palette.grey100}
              borderColor={palette.grey200}
              content={"Clear"}
              textColor={palette.grey900}
              //   onPress={onPress}
            />
          </View>
          <View style={styles.attendanceContainer}>
            <PrimaryButton
              backgroundColor={CombinedDefaultTheme.colors.primary}
              borderColor={palette.purple600}
              content={"Add issue"}
              textColor={CombinedDefaultTheme.colors.background}
              //   onPress={onPress}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    height: 100,
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
    borderRadius: 16,
    height: 6,
    width: "236",
  },
  selectedTextStyle: {},
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
