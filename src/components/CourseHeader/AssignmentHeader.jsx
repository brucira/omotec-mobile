import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";
import AssignmentModal from "../AssignmentModal";
import CourseTabBack from "../CourseTabBack";
import { CombinedDefaultTheme } from "../../styles/theme";

const SIZE_16 = Dimensions.margin;
const SIZE_8 = SIZE_16 / 2;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_14 = SIZE_16 * 0.875;
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
      <CourseTabBack />
      <AssignmentModal
        hideModal={() => setShowModal(false)}
        visible={showModal}
        onSavePress={onFileSaveHandler}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.questionText} variant="bodyMedium">
            How can I create and organize robotics course materials on an LMS?
          </Text>
          <View style={styles.marksContainer}>
            <Text style={styles.marksText} variant="labelMedium">
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
    flex: 1,
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
    flex: 1,
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
    color: "#101828",
    flex: 1,
  },
  ratingButtonStyle: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: CombinedDefaultTheme.colors.primary,
    borderRadius: 14,
    columnGap: 8,
    elevation: 4,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: "#60179C",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  submitText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
