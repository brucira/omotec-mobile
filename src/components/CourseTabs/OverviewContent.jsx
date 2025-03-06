import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import BottomDrawer from "../../components/BottomDrawer";
import FeedbackForm from "../../components/FeedbackForm";
import useModal from "../../hooks/useModal";
import palette from "../../styles/palette";

export const OverviewContent = () => {
  const { modalRef, openModal, closeModal } = useModal();
  const message =
    "When talking about employee training, we’re basically referring to a program designed to increase employees’ technical skills and knowledge, so they can do their jobs in a better way. Employee training doesn’t only contribute to performance development, but also to the growth of the organization.   Employee training, however, is not only essential for new hires but also for existing employees as well. By investing in training, companies get the chance to keep employees updated about latest trends, company goals, productivity tips, etc.  Don’t think of training as a once-off, tick-the-box event. Rather, it’s periodical and given at regular intervals or when needs arise (i.e., employee relocation, new skill development). Topics include: Choosing the right typeface Designing with simple shapes Adding shine, texture, beveled edges, and transparency Designing with negative space Choosing logo colors Preparing final files Note: I have use used Adobe Illustrator cc version for this course. Design a logo that stands out from the crowd with the help of these video tutorials. * Fully explained tutorial from starting to end. * Provided you secret techniques of creation. You also get the Project file to enhance your work flow.. Contents and Overview This course, containing over 45 lectures and 2.5 hours of content, provides step-by-step instructions on logo design. Along with this you also get the AI. Working File to download and practice along the tutorials. No logo design experience is required; however, you should have a full or free trial version of Adobe Illustrator, even though you don't need prior knowledge working in this program. Upon completion of this course. You'll know how to create unique symbols, add elements to a word, use geometric shapes and initials, and position text properly. Students will nail the basics of Illustrator, and create logos in color, black and white, and in different formats. All of these skills will make you a more valuable designer or allow you to use your creativity to make your own logos. What you’ll learn Design a Professional Logo Design a logo that stand out from the croud Design a new logo for a real client Fine-tuning a design after client selection Understand the techniques used in logo creation Apply various new techniques to your own work Are there any course requirements or prerequisites? Have a Basic knowledge about illustrator, as this course is little advanced. Who this course is for: This course is for those how want to learn how to design a logo Want to know how different logos are design and what are the techniques used in their creation. Want to learn how to fine-tune your logo design";

  const onSubmitRatingHandler = (rating, feedback) => {
    //TODO API CALL for SAVE RATING
    closeModal();
  };

  return (
    <View style={{ flex: 1, paddingBottom: 16, rowGap: 24 }}>
      <View style={styles.videoDetailsContainer}>
        <View style={styles.videoDetailsWrapper}>
          <View style={styles.detailsWrapper}>
            <View style={styles.digitWrapper}>
              <View
                style={{
                  alignItems: "center",
                  columnGap: 6,
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "#101828" }} variant="titleSmall">
                  4.5
                </Text>
                <Image
                  source={require("../../assets/icons/star_1.png")}
                  style={{ height: 16, width: 16 }}
                ></Image>
              </View>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                45,800 rating
              </Text>
            </View>
            <View style={styles.digitWrapper}>
              <Text style={{ color: "#101828" }} variant="titleSmall">
                186,000
              </Text>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                Students
              </Text>
            </View>
            <View style={styles.digitWrapper}>
              <Text style={{ color: "#101828" }} variant="titleSmall">
                9.5 hours
              </Text>
              <Text style={{ color: "#667085" }} variant="bodySmall">
                Total
              </Text>
            </View>
          </View>
          <View style={styles.dateWrapper}>
            <Image
              source={require("../../assets/icons/info.png")}
              style={{ height: 16, width: 16 }}
            />
            <Text style={{ color: "#475467" }} variant="bodySmall">
              Last updated on August 2023
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.ratingButtonStyle}
            onPress={openModal}
          >
            <Image
              source={require("../../assets/icons/star_1.png")}
              style={{ height: 16, width: 16 }}
            ></Image>
            <Text style={{ textAlign: "center" }}>Trainer Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.descriptionContainer}>
        <Text style={{ color: "#101828" }} variant="titleSmall">
          Description
        </Text>
        <Text style={{ color: palette.grey700 }} variant="bodyMedium">
          {message}
        </Text>
      </View>
      <BottomDrawer ref={modalRef} showIndicator={false}>
        <FeedbackForm onSubmit={onSubmitRatingHandler}></FeedbackForm>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  dateWrapper: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
    width: "100%",
  },
  description: {
    color: "#475467",
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    rowGap: 8,
  },
  detailsContainer: {
    flex: 1,
    rowGap: 8,
  },
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  digitWrapper: {
    flex: 1,
    rowGap: 4,
  },
  divider: {
    color: "#EAECF0",
    marginHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: "white",
    borderColor: "#EAECF0",
    borderRadius: 8,
    width: 164,
  },
  menuImage: {
    height: 20,
    width: 20,
  },
  menuItem: {
    columnGap: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  moreVerticalIcon: {
    height: 24,
    width: 24,
  },
  playerContainerStyle: {
    marginBottom: 20,
  },
  playerStyle: {
    height: 222,
  },
  ratingButtonStyle: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    borderRadius: 12,
    borderWidth: 1,
    columnGap: 8,
    elevation: 4,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#EAECF0",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  ratingButtonWrapper: {
    borderWidth: 1,
    width: "auto",
  },
  tabContainer: {
    flex: 1,
  },
  tabHeading: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 16,
    rowGap: 2,
  },
  title: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 24,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoDetailsContainer: {
    paddingHorizontal: 16,
    rowGap: 20,
  },
  videoDetailsWrapper: {
    rowGap: 14,
  },
});
