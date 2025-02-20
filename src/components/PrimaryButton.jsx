import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import palette from "../styles/palette";
import { Dimensions } from "../utils/constant";

export default function PrimaryButton({
  backgroundColor,
  borderColor,
  content,
  textColor,
}) {
  return (
    <View>
      <View
        style={[
          styles.gradientBackground,
          {
            backgroundColor: borderColor,
          },
        ]}
      />
      <Button
        labelStyle={{
          marginHorizontal: Dimensions.margin * 1.5,
          marginVertical: Dimensions.padding / 1.6,
        }}
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor,
            // borderColor: borderColor,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{content}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    elevation: 4,
    justifyContent: "center",
    shadowColor: palette.primaryStudent300,
    shadowOffset: { height: 2, width: 0 },
  },
  gradientBackground: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    bottom: -4,
    height: "33%",
    left: 0,
    position: "absolute",
    right: 0,
  },
});
