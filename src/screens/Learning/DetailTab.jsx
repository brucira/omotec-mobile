import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { Dimensions, projectDetailData } from "../../utils/constant";

const DetailTab = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text variant="titleMedium">Project Details</Text>
        <Divider style={styles.divider} />
        <View>
          <View style={styles.detailContainer}>
            <View style={styles.individualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Project ID
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.projectDetails.projectId}
              </Text>
            </View>
            <View style={styles.individualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Project title
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.projectDetails.projectTitle}
              </Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.individualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Student name
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.projectDetails.studentName}
              </Text>
            </View>
            <View style={styles.individualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Project category
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.projectDetails.projectCategory}
              </Text>
            </View>
          </View>
          <View style={{ gap: Dimensions.margin / 4 }}>
            <Text style={styles.heading} variant="labelMedium">
              Description
            </Text>
            <Text style={styles.content} variant="labelLarge">
              {projectDetailData.projectDetails.description}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: Dimensions.margin * 1.5 }}>
        <Text variant="titleMedium">Other Details</Text>
        <Divider style={styles.divider} />
        <View>
          <View style={styles.otherContainer}>
            <View style={styles.othersIndividualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Prerequisites
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.otherDetails.preRequsite}
              </Text>
            </View>
          </View>
          <View style={styles.otherContainer}>
            <View style={styles.othersIndividualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Project formats
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.otherDetails.projectFormat}
              </Text>
            </View>
          </View>
          <View style={styles.otherContainer}>
            <View style={styles.othersIndividualContainer}>
              <Text style={styles.heading} variant="labelMedium">
                Visibility
              </Text>
              <Text style={styles.content} variant="labelLarge">
                {projectDetailData.otherDetails.visibility}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: Dimensions.margin * 1.5,
    marginTop: Dimensions.margin * 1.25,
  },
  content: {
    color: palette.grey900,
  },
  detailContainer: {
    flexDirection: "row",
    gap: Dimensions.margin * 1.5,
    paddingBottom: Dimensions.padding * 1.5,
  },
  divider: {
    marginBottom: Dimensions.margin * 1.5,
    marginTop: Dimensions.margin / 1.33,
  },
  heading: {
    color: palette.grey500,
  },
  individualContainer: {
    gap: Dimensions.margin / 4,
    width: 160,
  },
  otherContainer: {
    flexDirection: "row",
    gap: Dimensions.margin * 1.5,
    paddingBottom: Dimensions.padding * 1.875,
  },
  othersIndividualContainer: {
    gap: Dimensions.margin / 4,
  },
});
export default DetailTab;
