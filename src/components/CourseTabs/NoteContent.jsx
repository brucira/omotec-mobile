import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Text } from "react-native-paper";

import { DIRECTION, JUSTIFY, RESIZE_MODE, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import {
  Dimensions,
  LECTURE_SELECT,
  NOTE_ITEM,
  SORT_SELECT,
} from "../../utils/constant";
import CustomButton from "../CustomButton";
import DropdownSelector from "../DropdownSelector";

const SIZE_16 = Dimensions.margin;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const NoteItem = ({ item }) => (
  <View style={styles.noteItemContainer}>
    <View style={styles.timelineContainer}>
      <View style={styles.timeLine}>
        <Text style={styles.seconds} variant="labelMedium">
          {item?.time}
        </Text>
        <Text style={styles.headingText} variant="labelMedium">
          {item.heading}: &nbsp;
          <Text style={styles.descriptionText} variant="bodySmall">
            {item.des}
          </Text>
        </Text>
      </View>
      <Image
        source={require("../../assets/icons/more_vertical.png")}
        style={styles.moreIcon}
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
  const plusIcon = require("../../assets/icons/plus.png");
  const [plainText, setPlainText] = useState("");
  const [noteList, setNoteList] = useState(NOTE_ITEM);
  const handleEditorChange = async () => {
    try {
      const text = await editor.getText();
      setPlainText(text);
    } catch (error) {
      console.error("Error fetching editor text:", error);
    }
  };

  const editor = useEditorBridge({
    autofocus: true,
    onChange: handleEditorChange,
    theme: {
      toolbar: {
        toolbarBody: {
          maxHeight: 32,
          paddingVertical: 0,
        },
      },
    },
  });

  const addNoteHandler = () => {
    setAddingNote(true);
  };

  const saveNoteHandler = () => {
    if (!plainText.trim()) return;

    const messageObj = {
      des: "What is Employee Training?",
      heading: "Section 1",
      message: plainText,
      time: "00:02",
    };

    setNoteList((prevNotes) => [...prevNotes, messageObj]);
    setPlainText("");
    setAddingNote(false);
  };

  const cancelNoteHandler = () => {
    setAddingNote(false);
  };

  const emptyNotes = useMemo(() => noteList.length === 0, [noteList]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.headerSection}>
          <View style={styles.dropDownContainer}>
            <DropdownSelector
              data={LECTURE_SELECT}
              placeholder="Search..."
              setValue={setLectureSelect}
              value={lectureSelect}
            />
            <DropdownSelector
              data={SORT_SELECT}
              placeholder="Sort By"
              setValue={setSortBy}
              value={sortBy}
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
              <Image source={plusIcon} style={styles.dropDownIcon} />
            </TouchableOpacity>
          )}
        </View>
        {addingNote ? (
          <View style={styles.richTextContainer}>
            <View style={styles.editorContainer}>
              <Toolbar editor={editor} />
              <RichText
                containerStyle={{ paddingHorizontal: SIZE_16 }}
                editor={editor}
                // onSourceChanged={on}
              />
            </View>
            <View style={styles.richTextFooter}>
              <CustomButton
                style={{ marginBottom: 10 }}
                title="Save Note"
                onPress={saveNoteHandler}
              />
              <CustomButton
                style={{ marginBottom: 10 }}
                title="Back"
                variant="secondary"
                onPress={cancelNoteHandler}
              />
            </View>
          </View>
        ) : (
          <>
            {!emptyNotes && <Divider style={styles.divider} />}
            <View style={styles.noteListContainer}>
              {emptyNotes ? (
                <View style={styles.emptyNotesContainer}>
                  <Image
                    contentFit={RESIZE_MODE.CONTAIN}
                    source={require("../../assets/empty/empty_notes.png")}
                    style={styles.emptyNotesImage}
                  />
                </View>
              ) : (
                noteList?.map((item, index) => (
                  <NoteItem key={index} item={item} />
                ))
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default NoteContent;

const styles = StyleSheet.create({
  addNoteButton: {
    alignItems: JUSTIFY.CENTER,
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: SIZE_12,
    borderWidth: 1,
    columnGap: 8,
    elevation: 2,
    flexDirection: DIRECTION.ROW,
    // marginBottom: 16,
    paddingHorizontal: SIZE_12,
    paddingVertical: 8,
    shadowColor: palette.grey900,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  addNoteText: { color: "#98A2B3", flex: 1 },
  container: { paddingVertical: SIZE_16, rowGap: SIZE_24 },
  descriptionText: {
    color: palette.grey600,
    flex: 1,
    flexWrap: "wrap",
    wordWrap: "wrap",
  },
  divider: { marginHorizontal: SIZE_16, marginTop: SIZE_16 },
  dropDownContainer: { columnGap: SIZE_12, flexDirection: DIRECTION.ROW },
  dropDownIcon: {
    height: SIZE_20,
    width: SIZE_20,
  },
  editorContainer: {
    borderColor: palette.grey200,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 250,
    // minHeight: 50,
    marginTop: SIZE_12,
  },
  emptyNotesContainer: {
    alignItems: JUSTIFY.CENTER,
    justifyContent: JUSTIFY.CENTER,
    marginTop: Dimensions.margin * 2.625,
    width: SIZE.FULL,
  },
  emptyNotesImage: { height: 186, width: 172 },
  headerSection: {
    paddingHorizontal: Dimensions.padding,
    rowGap: SIZE_12,
  },
  headingText: {
    color: palette.grey900,
    flex: 1,
    flexWrap: "wrap",
    wordWrap: "wrap",
  },
  messageContainer: {
    backgroundColor: palette.grey50,
    borderBottomLeftRadius: SIZE_12,
    borderBottomRightRadius: SIZE_12,
    borderColor: palette.grey50,
    borderTopRightRadius: SIZE_12,
    borderWidth: 1,
    paddingHorizontal: SIZE_12,
    paddingVertical: 10,
  },
  messageText: { color: palette.grey900 },
  moreIcon: { height: SIZE_20, width: SIZE_20 },
  noteItemContainer: { marginBottom: SIZE_20, rowGap: 8 },
  noteListContainer: {
    marginTop: SIZE_16,
    paddingHorizontal: SIZE_16,
    rowGap: SIZE_12,
  },
  richTextContainer: {
    flex: 1,
    marginHorizontal: SIZE_16,
    rowGap: SIZE_20,
  },
  richTextFooter: {
    columnGap: SIZE_12,
    flexDirection: DIRECTION.ROW,
  },
  seconds: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderRadius: SIZE_20 * 2,
    color: CombinedDefaultTheme.colors.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timeLine: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_12,
    flex: 1,
    flexDirection: DIRECTION.ROW,
  },
  timelineContainer: {
    alignItems: JUSTIFY.CENTER,
    flexDirection: DIRECTION.ROW,
    justifyContent: JUSTIFY.SPACE_BETWEEN,
  },
});
