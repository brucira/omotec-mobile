import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import FeedbackForm from "../../components/FeedbackForm";
import useModal from "../../hooks/useModal";
import { DIRECTION, JUSTIFY, SIZE } from "../../styles/constStyle";
import palette from "../../styles/palette";
import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_12 = SIZE_16 * 0.75;
const SIZE_14 = SIZE_16 * 0.875;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const DigiWrapper = ({ icon, title = "", des = "" }) => {
  return (
    <View style={styles.digitWrapper}>
      <View style={styles.ratingContainer}>
        <Text style={styles.titleSmall} variant="titleSmall">
          {title}
        </Text>
        {icon && <Image source={icon} style={styles.iconSmall} />}
      </View>
      <Text style={styles.bodySmall} variant="bodySmall">
        {des}
      </Text>
    </View>
  );
};

export const OverviewContent = () => {
  const { modalRef, openModal, closeModal } = useModal();
  const message = "Your long description text here...";
  const starIcon = require("../../assets/icons/star_1.png");
  const infoIcon = require("../../assets/icons/info.png");

  const onSubmitRatingHandler = (rating, feedback) => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoDetailsContainer}>
        <View style={styles.videoDetailsWrapper}>
          <View style={styles.detailsWrapper}>
            <DigiWrapper des="45, 800 rating" icon={starIcon} title="4.5" />
            <DigiWrapper des="Students" title="186,000" />
            <DigiWrapper des="Total" title="9.5 hours" />
          </View>
          <View style={styles.dateWrapper}>
            <Image source={infoIcon} style={styles.iconSmall} />
            <Text style={styles.bodySmall} variant="bodySmall">
              Last updated on August 2023
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.ratingButtonStyle}
            onPress={openModal}
          >
            <Image source={starIcon} style={styles.iconSmall} />
            <Text style={styles.textCenter}>Trainer Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.titleSmall} variant="titleSmall">
          Description
        </Text>
        <Text style={styles.bodyMedium} variant="bodyMedium">
          {message}
        </Text>
      </View>
      <BottomDrawer ref={modalRef} showIndicator={false}>
        <FeedbackForm onSubmit={onSubmitRatingHandler} />
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyMedium: {
    color: palette.grey700,
  },
  bodySmall: {
    color: palette.grey500,
  },
  container: {
    flex: 1,
    paddingBottom: SIZE_16,
    rowGap: SIZE_24,
  },
  dateWrapper: {
    alignItems: JUSTIFY.CENTER,
    columnGap: 8,
    flexDirection: DIRECTION.ROW,
    width: SIZE.FULL,
  },
  descriptionContainer: {
    paddingHorizontal: SIZE_16,
    rowGap: 8,
  },
  detailsWrapper: {
    flexDirection: DIRECTION.ROW,
    justifyContent: JUSTIFY.SPACE_BETWEEN,
    width: SIZE.FULL,
  },
  digitWrapper: {
    flex: 1,
    rowGap: 4,
  },
  divider: {
    color: palette.grey200,
    marginHorizontal: SIZE_16,
  },
  iconSmall: {
    height: SIZE_16,
    width: SIZE_16,
  },
  ratingButtonStyle: {
    alignItems: JUSTIFY.CENTER,
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: SIZE_12,
    borderWidth: 1,
    columnGap: 8,
    elevation: 4,
    flexDirection: DIRECTION.ROW,
    height: 40,
    justifyContent: JUSTIFY.CENTER,
    paddingHorizontal: SIZE_16,
    paddingVertical: 10,
    shadowColor: palette.grey200,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  ratingContainer: {
    alignItems: JUSTIFY.CENTER,
    columnGap: 6,
    flexDirection: DIRECTION.ROW,
  },
  rowContainer: {
    flexDirection: DIRECTION.ROW,
  },
  textCenter: {
    textAlign: JUSTIFY.CENTER,
  },
  titleSmall: {
    color: palette.grey900,
  },
  videoDetailsContainer: {
    paddingHorizontal: SIZE_16,
    rowGap: SIZE_20,
  },
  videoDetailsWrapper: {
    rowGap: SIZE_14,
  },
});
