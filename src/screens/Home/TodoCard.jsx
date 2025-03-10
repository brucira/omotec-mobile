import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const TodoCard = ({
  imageSource,
  todoTitle,
  subject,
  date,
  label,
  isChecked,
  onCheck,
}) => {
  return (
    <View style={styles.todoCardContainer}>
      <View style={styles.todoContentContainer}>
        <Image source={imageSource} style={styles.todoImage} />
        <View style={{ justifyContent: "space-between" }}>
          <Text variant="custom600_16">{todoTitle}</Text>
          <View style={styles.subHeading}>
            <Text style={{ color: palette.grey600 }} variant="bodySmall">
              {subject}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                color: palette.grey200,
                paddingHorizontal: Dimensions.padding / 6,
              }}
              variant="bodySmall"
            >
              |
            </Text>
            <Text style={{ color: palette.grey600 }} variant="bodySmall">
              {date}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.todoProgress}>
        <View style={styles.radioContainer}>
          <RadioButton
            status={isChecked ? "checked" : "unchecked"}
            value="first"
            onPress={onCheck}
          />
        </View>
        <Tag
          backgroundColor={palette.success50}
          label={label}
          textColor={palette.success600}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    alignItems: "center",
    flexDirection: "row",
  },
  todoCardContainer: {
    alignItems: "center",
    borderColor: palette.grey200,
    borderRadius: Dimensions.margin / 2,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Dimensions.padding / 1.33,
  },
  todoContentContainer: {
    flexDirection: "row",
    gap: Dimensions.margin / 1.33,
    maxHeight: 48,
  },
  todoImage: {
    height: Dimensions.margin * 3,
    resizeMode: "contain",
    width: Dimensions.margin * 3,
  },
  todoProgress: {
    alignItems: "flex-end",
    paddingVertical: 0,
    transform: [{ scale: 0.8 }],
  },
});

export default TodoCard;
