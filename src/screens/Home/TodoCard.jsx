import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

import Tag from "../../components/Tag";
import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const TodoCard = ({ item, index }) => {
  const [checked, setChecked] = useState("first");

  return (
    <View key={index} style={styles.todoCardContainer}>
      <View style={styles.todoContentContainer}>
        <Image
          source={require("../../assets/icons/clock.png")}
          style={styles.todoImage}
        />
        <View style={{ justifyContent: "space-between" }}>
          <Text>Complete the quiz</Text>
          <View style={styles.subHeading}>
            <Text variant="bodySmall">Robotics</Text>
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: Dimensions.padding / 6,
              }}
            >
              &bull;
            </Text>
            <Text variant="bodySmall">20 March</Text>
          </View>
        </View>
      </View>
      <View style={styles.todoProgress}>
        <View style={styles.radioContainer}>
          <RadioButton
            status={checked === "first" ? "checked" : "unchecked"}
            value="first"
            onPress={() => setChecked("first")}
          />
        </View>
        <Tag
          backgroundColor={palette.success50}
          label={"In Progress"}
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
