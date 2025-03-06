import React from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Appbar, Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions, testData } from "../utils/constant";
import PrimaryButton from "./PrimaryButton";
import Question from "./Question";
import Tag from "./Tag";

const Quiz = ({ visible, hideModal, submitMoal }) => {
  const keyExtractor = (item) => item.id.toString();
  const itemSeperatorComponent = () => <View style={styles.seperator} />;
  const TestContent = gestureHandlerRootHOC(() => {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar style={styles.appBarContainer}>
          <Appbar.Content
            title={
              <View>
                <Text style={styles.headerContent} variant="titleSmall">
                  Test:
                </Text>
                <Text style={styles.headerContent} variant="bodyMedium">
                  30 min • 10 marks
                </Text>
              </View>
            }
          />
          <Appbar.Action
            color={CombinedDefaultTheme.colors.background}
            icon={require("../assets/icons/close.png")}
            style={styles.backIcon}
            onPress={hideModal}
          />
        </Appbar>
        <View style={styles.contentContainer}>
          <View style={styles.remainingTimeContainer}>
            <Text>Time Remaining:</Text>
            <Tag
              backgroundColor={palette.grey200}
              label={"00:25:30"}
              textColor={palette.grey700}
            />
          </View>
          <View style={styles.questionsContainer}>
            <Text style={{ color: palette.grey900 }} variant="labelMedium">
              Instruction{" "}
              <Text style={{ color: palette.grey500 }} variant="labelMedium">
                Look at the following image and read the accompanying
                description. Then, answer the question that follows:
              </Text>
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ rowGap: 16 }}
            >
              <FlatList
                data={testData}
                ItemSeparatorComponent={itemSeperatorComponent}
                keyExtractor={keyExtractor}
                renderItem={renderQuestion}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
              <PrimaryButton
                style={{
                  marginBottom: 12,
                  marginTop: 32,
                }}
                backgroundColor={CombinedDefaultTheme.colors.primary}
                borderColor={palette.purple600}
                content={"Submit"}
                textColor={CombinedDefaultTheme.colors.background}
                onPress={submitMoal}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  });

  const renderQuestion = ({ item }) => {
    return (
      <Question
        key={item.id}
        options={item.options}
        question={item.question}
        questionNumber={item.id}
        questionType={item.type}
      />
    );
  };
  return (
    <Modal
      animationType="slide"
      coverScreen={false}
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <TestContent />
    </Modal>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: palette.primaryStudent900,
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
    borderTopColor: palette.neutral100,
    // borderTopWidth: 1,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: Dimensions.padding,
  },
  header: {
    color: CombinedDefaultTheme.colors.background,
  },
  headerContent: {
    color: CombinedDefaultTheme.colors.background,
  },
  questionsContainer: {
    flex: 1,
    paddingVertical: Dimensions.padding * 1.25,
  },
  remainingTimeContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: Dimensions.margin / 4,
    justifyContent: "center",
    paddingVertical: Dimensions.padding / 1.6,
  },
  seperator: {
    height: Dimensions.margin * 2,
  },
});

export default Quiz;
