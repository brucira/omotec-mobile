import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Divider, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";
import CustomButton from "../CustomButton";
import Editor from "../dom-components/hello-dom";
import DropDownRightIcon from "../DropDownRightIcon";

export const lectureDropdownData = [
  { label: "All Lecture", value: "all" },
  { label: "Recorded", value: "recorded" },
  { label: "Live", value: "live" },
];

export const sortDropdownData = [
  { label: "Sort By Most Recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
];

const itemData = [
  {
    des: "What is Employee Training?",
    heading: "Section 1",
    message: "How?",
    time: "00:02",
  },
  {
    des: "Why is Training Important?",
    heading: "Section 2",
    message: "Why?",
    time: "00:10",
  },
  {
    des: "Types of Employee Training",
    heading: "Section 3",
    message: "What types? ",
    time: "00:25",
  },
  {
    des: "Best Practices for Training",
    heading: "Section 4",
    message: "How to improve?",
    time: "00:40",
  },
];

const NoteItem = ({ item }) => (
  <View style={{ marginBottom: 20, rowGap: 8 }}>
    <View style={styles.timelineContainer}>
      <View style={styles.timeLine}>
        <Text style={styles.seconds} variant="labelMedium">
          {item?.time}
        </Text>
        <Text
          style={{
            color: "#101828",
            flex: 1,
            flexWrap: "wrap",
            wordWrap: "wrap",
          }}
          variant="labelMedium"
        >
          {item.heading}: &nbsp;
          <Text
            style={{
              color: "#475467",
              flex: 1,
              flexWrap: "wrap",
              wordWrap: "wrap",
            }}
            variant="bodySmall"
          >
            {item.des}
          </Text>
        </Text>
      </View>
      <Image
        source={require("../../assets/icons/more_vertical.png")}
        style={{ height: 20, width: 20 }}
      />
    </View>
    <View style={styles.messageContainer}>
      <Text style={styles.messageText} variant="labelLarge">
        {item.message}
      </Text>
    </View>
  </View>
);

const NoteContent = () => {
  const [lectureSelect, setLectureSelect] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [addingNote, setAddingNote] = useState(false);
  const [editorState, setEditorState] = useState(null);
  const [plainText, setPlainText] = useState("");

  const addNoteHandler = () => {
    setAddingNote(true);
  };

  const saveNoteHandler = () => {
    setAddingNote(false);
  };

  const cancelNoteHandler = () => {
    setAddingNote(false);
  };

  const emptyNotes = useMemo(() => itemData?.length === 0, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={{ columnGap: 12, flexDirection: "row" }}>
          <Dropdown
            search
            data={lectureDropdownData}
            itemTextStyle={{ color: "black" }}
            labelField="label"
            maxHeight={300}
            renderRightIcon={DropDownRightIcon}
            searchPlaceholder="Search..."
            selectedTextProps={{ ellipsizeMode: "tail", numberOfLines: 1 }}
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.singleList}
            value={lectureSelect}
            valueField="value"
            onChange={(item) => {
              setLectureSelect(item.value);
            }}
          />

          <Dropdown
            search
            data={sortDropdownData}
            itemTextStyle={{ color: "black" }}
            labelField="label"
            maxHeight={300}
            renderRightIcon={DropDownRightIcon}
            searchPlaceholder="Sort By"
            selectedTextProps={{ ellipsizeMode: "tail", numberOfLines: 1 }}
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.singleList}
            value={sortBy}
            valueField="value"
            onChange={(item) => {
              setSortBy(item.value);
            }}
          />
        </View>
        {!addingNote && (
          <TouchableOpacity
            style={styles.addNoteButton}
            onPress={addNoteHandler}
          >
            <Text
              numberOfLines={1}
              style={styles.addNoteText}
              variant="bodyMedium"
            >
              Create a new note at 0:02
            </Text>
            <Image
              source={require("../../assets/icons/plus.png")}
              style={styles.dropDownIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {addingNote && (
        <View style={styles.richTextContainer}>
          <View style={styles.editorContainer}>
            <Editor
              setEditorState={setEditorState}
              setPlainText={setPlainText}
            />
          </View>
          <View style={styles.richTextFooter}>
            <CustomButton
              style={{ marginBottom: 10 }} // Additional styling if needed
              title="Save Note"
              onPress={saveNoteHandler}
            />

            <CustomButton
              style={{ marginBottom: 10 }} // Additional styling if needed
              title="Back"
              variant="secondary"
              onPress={cancelNoteHandler}
            />
          </View>
        </View>
      )}
      {!addingNote && (
        <>
          {!emptyNotes && <Divider style={{ marginHorizontal: 16 }} />}
          <View style={{ paddingHorizontal: Dimensions.padding }}>
            {emptyNotes ? (
              <View
                style={{
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../assets/empty_notes.png")}
                  style={{ height: 186, width: 172 }}
                />
              </View>
            ) : (
              itemData?.map((item, index) => {
                return <NoteItem key={index} item={item}></NoteItem>;
              })
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default NoteContent;

const styles = StyleSheet.create({
  addNoteButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    borderRadius: 12,
    borderWidth: 1,
    columnGap: 8,
    elevation: 2,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#101828",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  addNoteText: {
    color: "#98A2B3",
    flex: 1,
  },
  container: {
    paddingVertical: Dimensions.padding,
    rowGap: 24,
  },
  dropDownIcon: {
    height: Dimensions.margin * 1.25,
    resizeMode: "cover",
    width: Dimensions.margin * 1.25,
  },
  editorContainer: {
    borderColor: "#EAECF0",
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: 250,
    minHeight: 50,
  },
  headerSection: {
    paddingHorizontal: Dimensions.padding,
    rowGap: 12,
  },
  messageContainer: {
    backgroundColor: palette.grey50,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: palette.grey50,
    borderTopRightRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageText: {
    color: "#101828",
  },
  noteListContainer: {
    borderWidth: 1,
    paddingVertical: Dimensions.padding,
    rowGap: 12,
  },
  richTextContainer: {
    flex: 1,
    marginHorizontal: 16,
    rowGap: 20,
  },
  richTextFooter: {
    columnGap: 12,
    flexDirection: "row",
  },
  seconds: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderRadius: 40,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  selectedTextStyle: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 20,
  },
  singleList: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    borderRadius: (Dimensions.margin * 3) / 4,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    height: 40,
    padding: (Dimensions.margin * 3) / 4,
    shadowColor: "#101828",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  timeLine: {
    alignItems: "center",
    columnGap: 12,
    flex: 1,
    flexDirection: "row",
  },
  timelineContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
