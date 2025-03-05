/* eslint-disable sort-keys */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";

import CourseTabBack from "../../components/CourseTabBack";
import Quiz from "../../components/Quiz";

const TestScreen = () => {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [isSubmittedQuiz, setIsSubmittedQuiz] = useState(false);

  const startQuizHandler = () => {
    setOpenQuiz(true);
    setIsSubmittedQuiz(false);
  };

  const hideQuizHandler = () => {
    setOpenQuiz(false);
  };

  const submitQuiz = () => {
    setOpenQuiz(false);
    setIsSubmittedQuiz(true);
  };

  if (openQuiz && !isSubmittedQuiz) {
    return (
      <Quiz
        hideModal={hideQuizHandler}
        submitMoal={submitQuiz}
        visible={true}
      />
    );
  }

  return (
    <View style={styles.testContainer}>
      <CourseTabBack />
      <View style={{ rowGap: 28, paddingHorizontal: 16 }}>
        <View style={{ rowGap: 16 }}>
          <View style={{ rowGap: 4 }}>
            <Text style={{ color: "#1E293B" }} variant="titleMedium">
              Submit your Test
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                columnGap: 12,
              }}
            >
              <Text style={{ color: "#344054" }} variant="labelMedium">
                Due: &nbsp;
                <Text style={{ color: "#667085" }} variant="bodySmall">
                  Nov 5, 11:59 PM PDT
                </Text>
              </Text>
              <Text style={{ color: "#344054" }} variant="labelMedium">
                Attempts: &nbsp;
                <Text style={{ color: "#667085" }} variant="bodySmall">
                  2/3
                </Text>
              </Text>
            </View>
            <Text></Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.ratingButtonStyle}
              onPress={startQuizHandler}
            >
              <Text
                style={{ color: "#FFFFFF", textAlign: "center" }}
                variant="titleSmall"
              >
                Start your Test
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        <View
          style={{
            borderRadius: 11,
            padding: 12,
            rowGap: 14,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#EAECF0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              columnGap: 16,
            }}
          >
            <View style={{ rowGap: 4, flex: 1 }}>
              <Text style={{ color: "#0F172A" }} variant="labelMedium">
                Receive grade
              </Text>
              <Text style={{ color: "#101828" }} variant="labelMedium">
                To pass &nbsp;
                <Text style={{ color: "#667085" }} variant="bodySmall">
                  75% or higher
                </Text>
              </Text>
            </View>
            <View style={{ rowGap: 4, flex: 1 }}>
              <Text style={{ color: "#0F172A" }} variant="labelMedium">
                Total Marks
              </Text>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                50
              </Text>
            </View>
          </View>
          <Divider sttyle={{ backgroundColor: "#EAECF0" }}></Divider>
          <View
            style={{
              flexDirection: "row",
              columnGap: 16,
            }}
          >
            <View style={{ rowGap: 4, flex: 1 }}>
              <Text style={{ color: "#0F172A" }} variant="labelMedium">
                Difficult level
              </Text>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                Medium
              </Text>
            </View>
            <View style={{ rowGap: 4, flex: 1 }}>
              <Text style={{ color: "#0F172A" }} variant="labelMedium">
                Total grade
              </Text>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                -
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  testContainer: {
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#F9FAFB",
    rowGap: 12,
  },
  ratingButtonStyle: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#852DCD",
    borderColor: "#852DCD",

    columnGap: 8,
    elevation: 4,
    height: 40,
    justifyContent: "center",
    shadowColor: "#60179C",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
