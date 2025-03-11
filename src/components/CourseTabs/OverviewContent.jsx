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
        <Text style={styles.titleSmall} variant="custom600_14">
          {title}
        </Text>
        {icon && <Image source={icon} style={styles.iconSmall} />}
      </View>
      <Text style={styles.bodySmall} variant="custom400_12">
        {des}
      </Text>
    </View>
  );
};

export const OverviewContent = () => {
  const { modalRef, openModal, closeModal } = useModal();
  const message =
    "When talking about employee training, we’re basically referring to a program designed to increase employees’ technical skills and knowledge, so they can do their jobs in a better way. Employee training doesn’t only contribute to performance development, but also to the growth of the organization. Employee training, however, is not only essential for new hires but also for existing employees as well. By investing in training, companies get the chance to keep employees updated about latest trends, company goals, productivity tips, etc. Don’t think of training as a once-off, tick-the-box event. Rather, it’s periodical and given at regular intervals or when needs arise (i.e., employee relocation, new skill development). Topics include: Choosing the right typeface Designing with simple shapes Adding shine, texture, beveled edges, and transparency Designing with negative space Choosing logo colors Preparing final files Note: I have use used Adobe Illustrator cc version for this course. Design a logo that stands out from the crowd with the help of these video tutorials. * Fully explained tutorial from starting to end. * Provided you secret techniques of creation. You also get the Project file to enhance your work flow.. Contents and Overview This course, containing over 45 lectures and 2.5 hours of content, provides step-by-step instructions on logo design. Along with this you also get the AI. Working File to download and practice along the tutorials. No logo design experience is required; however, you should have a full or free trial version of Adobe Illustrator, even though you don't need prior knowledge working in this program. Upon completion of this course. You'll know how to create unique symbols, add elements to a word, use geometric shapes and initials, and position text properly. Students will nail the basics of Illustrator, and create logos in color, black and white, and in different formats. All of these skills will make you a more valuable designer or allow you to use your creativity to make your own logos. What you’ll learn Design a Professional Logo Design a logo that stand out from the croud Design a new logo for a real client Fine-tuning a design after client selection Understand the techniques used in logo creation Apply various new techniques to your own work Are there any course requirements or prerequisites? Have a Basic knowledge about illustrator, as this course is little advanced. Who this course is for: This course is for those how want to learn how to design a logo Want to know how different logos are design and what are the techniques used in their creation. Want to learn how to fine-tune your logo design";
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
            <Text style={styles.dateText} variant="custom400_12">
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
            <Text style={styles.textCenter} variant="custom500_14">
              Trainer Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.titleSmall} variant="custom600_14">
          Description
        </Text>
        <Text style={styles.bodyMedium} variant="custom400_14">
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
  dateText: {
    color: palette.grey600,
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
    color: palette.grey900,
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
