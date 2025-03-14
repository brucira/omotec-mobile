import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";
import AssignmentModal from "../AssignmentModal";
import CourseTabBack from "../CourseTabBack";

const SIZE_16 = Dimensions.margin;
const SIZE_8 = SIZE_16 / 2;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const AssignmentHeader = () => {
  const [showModal, setShowModal] = React.useState(false);

  const submitHandler = () => {
    setShowModal(true);
  };

  const onFileSaveHandler = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <CourseTabBack style={{ paddingHorizontal: SIZE_8 }} />
      <AssignmentModal
        hideModal={() => setShowModal(false)}
        visible={showModal}
        onSavePress={onFileSaveHandler}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.questionText} variant="custom400_14">
            How can I create and organize robotics course materials on an LMS?
          </Text>
          <View style={styles.marksContainer}>
            <Text style={styles.marksText} variant="custom500_12">
              10 Marks
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ratingButtonStyle}
            onPress={submitHandler}
          >
            <Text style={styles.submitText} variant="labelLarge">
              Submit
            </Text>
          </TouchableOpacity>
          <View style={styles.flexOne} />
        </View>
      </View>
    </View>
  );
};

export default AssignmentHeader;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: DIRECTION.ROW,
  },
  container: {
    backgroundColor: palette.grey50,
    paddingBottom: SIZE_24,
    paddingTop: SIZE_12,
    rowGap: SIZE_24,
  },
  contentContainer: {
    paddingHorizontal: SIZE_16,
    rowGap: SIZE_16,
  },
  flexOne: {
    flex: 1,
  },
  headerContainer: {
    alignItems: JUSTIFY.CENTER,
    flexDirection: DIRECTION.ROW,
  },
  marksContainer: {
    backgroundColor: palette.primaryStudent50,
    borderRadius: SIZE_20 * 2,
    columnGap: SIZE_8,
    paddingHorizontal: SIZE_8,
    paddingVertical: 3,
  },
  marksText: {
    color: CombinedDefaultTheme.colors.primary,
  },
  questionText: {
    color: palette.grey900,
    flex: 1,
  },
  ratingButtonStyle: {
    alignItems: JUSTIFY.CENTER,
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: CombinedDefaultTheme.colors.primary,
    borderRadius: 14,
    columnGap: SIZE_8,
    elevation: 4,
    height: 40,
    justifyContent: JUSTIFY.CENTER,
    paddingHorizontal: SIZE_24,
    paddingVertical: 10,
    shadowColor: palette.purple600,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  submitText: {
    color: CombinedDefaultTheme.colors.background,
    textAlign: JUSTIFY.CENTER,
  },
});
