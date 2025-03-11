import React from "react";
import { StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

import { DIRECTION, JUSTIFY } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions, REVIEW_LIST, STAR_LIST } from "../../utils/constant";
import CommentView from "../CommentView";
import DropdownSelector from "../DropdownSelector";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const RatingRow = ({ color = "#0064D6", star }) => {
  const progress = star?.parcentage / 100;
  return (
    <View style={styles.ratingRow}>
      <View style={styles.ratingLabel}>
        <Text style={{ color: palette.grey600 }} variant="custom400_12">
          {star?.no}-star
        </Text>
        <Text style={{ color: palette.grey900 }} variant="custom500_12">
          {star?.parcentage}%
        </Text>
      </View>
      <ProgressBar
        color={star?.color}
        progress={progress}
        style={styles.progressBar}
      />
    </View>
  );
};

const ReviewsContent = () => {
  const [reviewSelect, setReviewSelect] = React.useState("all");

  const randerStars = () => {
    return STAR_LIST.map((item, index) => (
      <RatingRow key={index} percentage={90} star={item} />
    ));
  };

  const randerComment = () => {
    return [1, 2, 3].map((item, index) => (
      <CommentView key={index} item={item}></CommentView>
    ));
  };

  return (
    <View style={styles.containers}>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.ratingBox}>
            <Text style={styles.rating} variant="custom700_28">
              4.8
            </Text>
            <View>
              <Text style={styles.excellentText} variant="custom500_14">
                Excellent
              </Text>
              <Text style={styles.ratingText} variant="custom400_14">
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
          <Text style={styles.ratingCount} variant="custom600_18">
            56 Reviews
          </Text>
          <View style={{ flex: 1 }}></View>
          <DropdownSelector
            data={REVIEW_LIST}
            search={false}
            searchPlaceholder="Search..."
            setValue={setReviewSelect}
            value={reviewSelect}
          ></DropdownSelector>
        </View>
        <View style={styles.commentContainer}>{randerComment()}</View>
      </View>
    </View>
  );
};

export default ReviewsContent;

const styles = StyleSheet.create({
  bottomContainer: {
    rowGap: SIZE_24,
  },
  commentContainer: {
    rowGap: SIZE_24,
  },
  containers: {
    paddingHorizontal: SIZE_16,
    paddingVertical: SIZE_20,
    rowGap: 32,
  },
  dropDownContainer: {
    alignItems: JUSTIFY.CENTER,
    flex: 1,
    flexDirection: DIRECTION.ROW,
    justifyContent: JUSTIFY.SPACE_BETWEEN,
  },
  excellentText: {
    color: CombinedDefaultTheme.colors.primary,
    textAlign: JUSTIFY.CENTER,
  },
  progressBar: { borderRadius: 10, height: 8 },
  rating: {
    color: CombinedDefaultTheme.colors.primary,
    textAlign: JUSTIFY.CENTER,
  },
  ratingBox: {
    backgroundColor: palette.primaryStudent50,
    borderRadius: SIZE_16 / 2,
    padding: SIZE_16,
    rowGap: 4,
  },
  ratingCount: {
    color: palette.grey900,
    textAlign: "left",
  },
  ratingLabel: {
    flex: 1,
    flexDirection: DIRECTION.ROW,
    justifyContent: JUSTIFY.SPACE_BETWEEN,
  },
  ratingRow: {
    rowGap: 5,
  },
  ratingText: {
    color: palette.grey600,
    textAlign: JUSTIFY.CENTER,
  },
  starBox: {
    flex: 1,
    rowGap: SIZE_16,
  },
  topContainer: {
    columnGap: SIZE_24,
    flex: 1,
    flexDirection: DIRECTION.ROW,
    height: "auto",
  },
});
