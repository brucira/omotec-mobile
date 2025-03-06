import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";
import CourseTabBack from "../CourseTabBack";
import Quiz from "../Quiz";

const SIZE_16 = Dimensions.margin;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_14 = SIZE_16 * 0.875;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const TestHeader = () => {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [isSubmittedQuiz, setIsSubmittedQuiz] = useState(false);

  const startQuizHandler = () => {
    setOpenQuiz(true);
    setIsSubmittedQuiz(false);
  };

  const hideQuizHandler = () => {
    setOpenQuiz(false);
  };

  const submitQuizHandler = () => {
    setOpenQuiz(false);
    setIsSubmittedQuiz(true);
  };

  return (
    <View style={styles.testContainer}>
      <Quiz
        hideModal={hideQuizHandler}
        submitMoal={submitQuizHandler}
        visible={openQuiz && !isSubmittedQuiz}
      />

      <CourseTabBack style={styles.backButtton} />
      <View style={styles.contentContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText} variant="titleMedium">
              Submit your Test
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.labelText} variant="labelMedium">
                Due: &nbsp;
                <Text style={styles.bodySmallText} variant="bodySmall">
                  Nov 5, 11:59 PM PDT
                </Text>
              </Text>
              <Text style={styles.labelText} variant="labelMedium">
                Attempts: &nbsp;
                <Text style={styles.bodySmallText} variant="bodySmall">
                  2/3
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.buttonRowContainer}>
            <TouchableOpacity
              style={styles.ratingButtonStyle}
              onPress={startQuizHandler}
            >
              <Text style={styles.buttonText} variant="titleSmall">
                Start your Test
              </Text>
            </TouchableOpacity>
            <View style={styles.flexContainer}></View>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.flexContainer}>
              <Text style={styles.labelTitleText} variant="labelMedium">
                Receive grade
              </Text>
              <Text style={styles.labelText} variant="labelMedium">
                To pass &nbsp;
                <Text style={styles.bodySmallText} variant="bodySmall">
                  75% or higher
                </Text>
              </Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.labelTitleText} variant="labelMedium">
                Total Marks
              </Text>
              <Text style={styles.bodySmallText} variant="bodySmall">
                50
              </Text>
            </View>
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={styles.rowContainer}>
            <View style={styles.flexContainer}>
              <Text style={styles.labelTitleText} variant="labelMedium">
                Difficult level
              </Text>
              <Text style={styles.bodySmallText} variant="bodySmall">
                Medium
              </Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.labelTitleText} variant="labelMedium">
                Total grade
              </Text>
              <Text style={styles.bodySmallText} variant="bodySmall">
                -
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TestHeader;

const styles = StyleSheet.create({
  backButtton: {
    paddingHorizontal: 8,
  },
  bodySmallText: {
    color: palette.grey500,
  },
  buttonRowContainer: {
    flexDirection: DIRECTION.ROW,
  },
  buttonText: {
    color: CombinedDefaultTheme.colors.background,
    textAlign: JUSTIFY.CENTER,
  },
  cardContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: SIZE_12,
    borderWidth: 1,
    padding: SIZE_12,
    rowGap: SIZE_14,
  },
  contentContainer: {
    paddingHorizontal: SIZE_16,
    rowGap: SIZE_16 * 2,
  },
  dividerStyle: {
    backgroundColor: palette.grey200,
  },
  flexContainer: {
    flex: 1,
  },
  headerContainer: {
    rowGap: 4,
  },
  labelText: {
    color: palette.grey700,
  },
  labelTitleText: {
    color: palette.grey900,
  },
  ratingButtonStyle: {
    alignItems: JUSTIFY.CENTER,
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: CombinedDefaultTheme.colors.primary,
    borderRadius: SIZE_14,
    columnGap: SIZE_16 / 2,
    elevation: 4,
    height: SIZE_20 * 2,
    justifyContent: JUSTIFY.CENTER,
    paddingHorizontal: SIZE_24,
    paddingVertical: 10,
    shadowColor: palette.purple600,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  rowContainer: {
    alignItems: JUSTIFY.CENTER,
    columnGap: SIZE_12,
    flexDirection: DIRECTION.ROW,
  },
  sectionContainer: {
    rowGap: SIZE_16,
  },
  testContainer: {
    backgroundColor: palette.grey50,
    paddingBottom: SIZE_20,
    paddingTop: SIZE_12,
    rowGap: SIZE_12,
  },
  titleText: {
    color: palette.blue800,
  },
});
