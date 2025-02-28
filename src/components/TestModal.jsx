import React, { useState } from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { Appbar, Divider, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";
import PrimaryButton from "./PrimaryButton";
import Quiz from "./Quiz";

const TestModal = ({ visible, hideModal }) => {
  const [testQuestionVisible, setTestQuestionVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
      >
        <SafeAreaView style={styles.container}>
          <Appbar style={styles.appBarContainer}>
            <Appbar.Action
              icon={require("../assets/icons/close.png")}
              style={styles.backIcon}
              onPress={hideModal}
            />
            <Appbar.Content title={"Quiz"} />
          </Appbar>
          <View style={styles.contentContainer}>
            <Text variant="titleMedium">Submit your Test</Text>
            <View style={styles.testTimingContainer}>
              <Text style={styles.testTimingKey} variant="labelMedium">
                Due:{" "}
                <Text style={styles.testTimingValue}>Nov 5, 11:59 PM PDT</Text>
              </Text>
              <Text variant="labelMedium">
                Attempts: <Text style={styles.testTimingValue}>2/3</Text>
              </Text>
            </View>
            <View style={styles.startTestButton}>
              <PrimaryButton
                backgroundColor={CombinedDefaultTheme.colors.primary}
                borderColor={palette.purple600}
                content={"Start your Test"}
                textColor={CombinedDefaultTheme.colors.background}
                onPress={() => setTestQuestionVisible(true)}
              />
            </View>
            <View style={styles.testDetailGrid}>
              <View style={styles.testDetailRow}>
                <View style={styles.individualTestDetail}>
                  <Text
                    style={{ color: palette.grey900 }}
                    variant="labelMedium"
                  >
                    Recieve grade
                  </Text>
                  <Text
                    style={{ color: palette.grey900 }}
                    variant="labelMedium"
                  >
                    To pass{" "}
                    <Text style={{ color: palette.grey500 }}>
                      75% or higher
                    </Text>{" "}
                  </Text>
                </View>
                <View style={styles.individualTestDetail}>
                  <Text
                    style={{ color: palette.grey900 }}
                    variant="labelMedium"
                  >
                    Total marks
                  </Text>
                  <Text
                    style={{ color: palette.grey500 }}
                    variant="labelMedium"
                  >
                    50
                  </Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.testDetailRow}>
                <View style={styles.individualTestDetail}>
                  <Text
                    style={{ color: palette.grey900 }}
                    variant="labelMedium"
                  >
                    Difficulty level
                  </Text>
                  <Text
                    style={{ color: palette.grey500 }}
                    variant="labelMedium"
                  >
                    Medium
                  </Text>
                </View>
                <View style={styles.individualTestDetail}>
                  <Text
                    style={{ color: palette.grey900 }}
                    variant="labelMedium"
                  >
                    Your grade
                  </Text>
                  <Text
                    style={{ color: palette.grey500 }}
                    variant="labelMedium"
                  >
                    -
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <Quiz
          hideModal={() => setTestQuestionVisible(false)}
          visible={testQuestionVisible}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderBottomWidth: 1,
    borderColor: palette.grey200,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding * 1.25,
  },
  divider: {
    marginVertical: Dimensions.margin / 1.14,
  },
  individualTestDetail: {
    flex: 0.5,
    gap: Dimensions.margin / 4,
  },
  startTestButton: {
    alignSelf: "baseline",
    marginTop: Dimensions.margin,
  },
  testDetailGrid: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 1.6,
    borderWidth: 1,
    marginBottom: Dimensions.margin * 1.25,
    marginTop: Dimensions.margin * 1.75,
    padding: Dimensions.padding / 1.33,
  },
  testDetailRow: {
    flexDirection: "row",
    gap: Dimensions.margin,
    textAlign: "left",
  },
  testTimingContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 1.33,
    paddingTop: Dimensions.padding / 4,
  },
  testTimingKey: {
    color: palette.grey700,
  },
  testTimingValue: {
    color: palette.grey500,
  },
});

export default TestModal;
