import React from "react";
import { StyleSheet, View } from "react-native";

import palette from "../styles/palette";
import { STATUS_COLORS } from "../utils/constant";
import Tag from "./Tag";

const UNDER_REVIEW = "under_review";
const COMPLETED = "completed";
const ONGOING = "ongoing";

const StatusTag = ({ status }) => {
  const { background, text } = STATUS_COLORS[status] || STATUS_COLORS.ongoing;

  return (
    <View style={styles.container}>
      <Tag
        label={
          status === UNDER_REVIEW
            ? "Under Review"
            : status === COMPLETED
              ? "Completed"
              : status === ONGOING
                ? "Ongoing"
                : status
        }
        backgroundColor={background}
        textColor={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
});

export default StatusTag;
