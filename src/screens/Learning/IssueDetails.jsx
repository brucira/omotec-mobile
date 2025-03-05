import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Divider, List, ProgressBar, Text } from "react-native-paper";

import PrimaryButton from "../../components/PrimaryButton";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, issueData } from "../../utils/constant";
import AddIssue from "./AddIssue";

const IssueDetails = ({ visible, hideModal, event }) => {
  const [expanded] = useState(true);
  const [addIssueVisible, setAddIssueVisible] = useState(false);
  const handleFileItem = (file, index) => (
    <TouchableOpacity
      key={index}
      style={styles.fileContainer}
      onPress={() => {}}
    >
      <View style={styles.fileContent}>
        <Image
          source={require("../../assets/icons/file.png")}
          style={styles.file}
        />
        <View style={styles.content}>
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text numberOfLines={1} variant="labelSmall">
                {file.fileName}
              </Text>
              <Image
                source={require("../../assets/icons/check.png")}
                style={styles.check}
              />
            </View>
            <Text numberOfLines={1} variant="labelSmall">
              {file.fileSize}
            </Text>
            <View style={styles.progress}>
              <ProgressBar
                color={palette.success600}
                progress={100}
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
  );
  const itemSeperator = () => <Divider />;
  const keyExtractor = (item) => item.id.toString();
  const onPress = () => setAddIssueVisible(true);
  const renderItem = ({ item }) => (
    <List.AccordionGroup>
      <List.Accordion
        description={
          expanded ? (
            <Text style={{ color: palette.grey500 }} variant="titleSmall">
              {item.subHeading}
            </Text>
          ) : null
        }
        right={() => (
          <View
            style={[
              styles.rightContainer,
              // { alignItems: expanded ? "flex-start" : null },
            ]}
          >
            <Image
              style={[
                styles.dropdownIcon,
                { alignSelf: "flex-start", padding: 0 },
              ]}
              source={require("../../assets/icons/chevron_down.png")}
            />
          </View>
        )}
        style={{
          padding: 0,
        }}
        title={
          <View style={{ paddingHorizontal: 0 }}>
            <Text variant="titleMedium">{item.name}</Text>
          </View>
        }
        contentStyle={{ paddingHorizontal: 0 }}
        descriptionStyle={{ marginLeft: -8 }}
        expanded={expanded}
        id={2}
        rippleColor={palette.grey25}
        theme={{ isV3: false }}
        titleNumberOfLines={1}
        titleStyle={{ marginLeft: -8 }}
        // onPress={handlePress}
      >
        <List.Item
          style={{
            paddingVertical: Dimensions.padding / 1.6,
          }}
          title={
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text variant="titleSmall">Issue ID:</Text>
              <Text variant="bodyMedium"> {item.id}</Text>
            </View>
          }
          contentStyle={{ paddingLeft: 0 }}
          titleStyle={{}}
        />
        <List.Item
          style={{
            paddingVertical: Dimensions.padding / 1.6,
          }}
          title={
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text variant="titleSmall">Issue Name:</Text>
              <Text variant="bodyMedium"> {item.name}</Text>
            </View>
          }
          contentStyle={{ paddingLeft: 0 }}
          titleStyle={{}}
        />
        <List.Item
          style={{
            paddingVertical: Dimensions.padding / 1.6,
          }}
          title={
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text variant="titleSmall">Severity</Text>
              <Text variant="bodyMedium"> {item.severity}</Text>
            </View>
          }
          contentStyle={{ paddingLeft: 0 }}
          titleStyle={{}}
        />
        <List.Item
          style={{
            paddingVertical: Dimensions.padding / 1.6,
          }}
          title={
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text variant="titleSmall">Description</Text>
              <Text variant="bodyMedium"> {item.description}</Text>
            </View>
          }
          contentStyle={{ paddingLeft: 0 }}
          titleStyle={{}}
        />
        <List.Item
          contentStyle={{
            flex: 1,
            maxWidth: Dimensions.screenWidth - Dimensions.margin * 2,
            minWidth: Dimensions.screenWidth - Dimensions.margin * 2,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          description={() => (
            <>
              {item.uploads.map((file, index) => {
                return handleFileItem(file, index);
              })}
            </>
          )}
          style={{
            paddingVertical: Dimensions.padding / 1.6,
          }}
          title={
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: palette.grey600 }} variant="titleSmall">
                Upload additional file
              </Text>
            </View>
          }
          descriptionStyle={{ backgroundColor: "red" }}
          titleStyle={{}}
        />
      </List.Accordion>
    </List.AccordionGroup>
  );

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
              icon={require("../../assets/icons/chevron_left.png")}
              style={styles.backIcon}
              onPress={hideModal}
            />
            <Appbar.Content title={<Text variant="titleMedium">Issue</Text>} />
          </Appbar>
          <View style={styles.contentContainer}>
            <FlatList
              contentContainerStyle={styles.arrowIndicator}
              data={issueData}
              ItemSeparatorComponent={itemSeperator}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              style={styles.ongoingCardList}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.attendanceContainer}>
              <PrimaryButton
                backgroundColor={CombinedDefaultTheme.colors.primary}
                borderColor={palette.purple600}
                content={"Add issue"}
                textColor={CombinedDefaultTheme.colors.background}
                onPress={onPress}
              />
            </View>
          </View>
          <AddIssue
            hideModal={() => setAddIssueVisible(false)}
            visible={addIssueVisible}
          />
        </SafeAreaView>
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
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  attendanceContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  backIcon: {
    height: Dimensions.margin * 1.25,
    paddingBottom: 3,
    resizeMode: "contain",
    width: Dimensions.margin * 1.25,
  },
  badge: {
    borderRadius: Dimensions.margin / 4,
    height: Dimensions.margin,
    width: Dimensions.margin,
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
  check: {
    height: Dimensions.margin,
    width: Dimensions.margin,
  },
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderTopColor: palette.neutral100,
    borderTopWidth: 1,
    flex: 1,
    zIndex: 5,
  },
  content: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight: Dimensions.margin,
  },
  contentContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
    gap: Dimensions.padding,
    paddingHorizontal: Dimensions.padding,
    paddingVertical: Dimensions.padding,
  },
  dropdownIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  file: {
    height: Dimensions.margin * 2,
    width: Dimensions.margin * 2,
  },
  fileContainer: {
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    marginTop: Dimensions.margin / 1.33,
    paddingLeft: Dimensions.padding / 2.66,
    paddingRight: Dimensions.padding / 1.14,
    paddingVertical: Dimensions.padding / 2.66,
  },
  fileContent: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
  fileIcon: {
    height: Dimensions.margin * 2,
    width: Dimensions.margin * 2,
  },
  presentMarkingContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  progress: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: Dimensions.margin / 1.6,
    // justifyContent: "space-between",
  },
  progressBar: {
    borderRadius: Dimensions.margin,
    height: 6,
    width: 236,
    // paddingRight: 6,
  },
  progressText: {
    color: palette.grey600,
  },
  rightContainer: {},
  uploadContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default IssueDetails;
