import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ProgressBar, Text } from "react-native-paper";

import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";
import CommentView from "../CommentView";

const startArray = [
  { color: "#0064D6", no: 5, parcentage: 90 },
  { color: "#039855", no: 4, parcentage: 70 },
  { color: "#FDB022", no: 3, parcentage: 50 },
  { color: "#DC6803", no: 2, parcentage: 30 },
  { color: "#D92D20", no: 1, parcentage: 10 },
];

const reviewArray = [{ label: "All Review", value: "all" }];

const RatingRow = ({ color = "#0064D6", star }) => {
  const progress = star?.parcentage / 100;

  return (
    <View style={styles.ratingRow}>
      <View style={styles.ratingLabel}>
        <Text style={{ color: "#475467" }} variant="bodySmall">
          {star?.no}-star
        </Text>
        <Text style={{ color: "#475467" }} variant="bodySmall">
          {star?.parcentage}%
        </Text>
      </View>
      <ProgressBar
        color={star?.color}
        progress={progress}
        style={{ borderRadius: 10, height: 8 }}
      />
    </View>
  );
};

const DropDownRightIcon = () => (
  <Image
    source={require("../../assets/icons/chevron_down.png")}
    style={styles.dropDownIcon}
  />
);

const ReviewsContent = () => {
  const [reviewSelect, setReviewSelect] = React.useState("all");

  const randerStars = () => {
    return startArray.map((item, index) => (
      <RatingRow key={index} percentage={90} star={item} />
    ));
  };

  return (
    <View style={styles.containers}>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.ratingBox}>
            <Text style={styles.rating}>4.8</Text>
            <View>
              <Text style={styles.excellentText} variant="labelLarge">
                Excellent
              </Text>
              <Text style={styles.ratingText} variant="bodyMedium">
                898 ratings
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.starBox}>{randerStars()}</View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.dropDownContainer}>
          <Text style={styles.ratingCount} variant="">
            56 Reviews
          </Text>
          <View style={{ flex: 1 }}></View>
          <Dropdown
            data={reviewArray}
            itemTextStyle={{ color: "black" }}
            labelField="label"
            maxHeight={300}
            renderRightIcon={DropDownRightIcon}
            searchPlaceholder="Search..."
            selectedTextProps={{ ellipsizeMode: "tail", numberOfLines: 1 }}
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.singleList}
            value={reviewSelect}
            valueField="value"
            onChange={(item) => {
              setReviewSelect(item.value);
            }}
          />
        </View>
        <View style={styles.commentContainer}>
          {[1, 2, 3].map((item, index) => (
            <CommentView key={index} item={item}></CommentView>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ReviewsContent;

const styles = StyleSheet.create({
  bottomContainer: {
    rowGap: 24,
  },
  commentContainer: {
    rowGap: 24,
  },
  containers: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    rowGap: 32,
  },
  dropDownContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDownIcon: {
    height: Dimensions.margin * 1.25,
    resizeMode: "cover",
    width: Dimensions.margin * 1.25,
  },
  excellentText: {
    color: CombinedDefaultTheme.colors.primary,
    textAlign: "center",
  },
  rating: {
    color: CombinedDefaultTheme.colors.primary,
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 36,
    textAlign: "center",
  },
  ratingBox: {
    backgroundColor: palette.primaryStudent50,
    borderRadius: 8,
    padding: 16,
    rowGap: 4,
  },
  ratingCount: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: "left",
  },
  ratingLabel: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingRow: {
    rowGap: 5,
  },
  ratingText: {
    color: "#475467",
    textAlign: "center",
  },
  selectedTextStyle: {
    color: "#101828",
    flex: 1,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 20,
  },
  singleList: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    borderRadius: 12,
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
  starBox: {
    flex: 1,
    rowGap: 16,
  },
  topContainer: {
    columnGap: 24,
    flex: 1,
    flexDirection: "row",
    height: "auto",
  },
});
