import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";

const CustomButton = ({
  variant = "primary",
  onPress,
  title = "",
  style = {},
  textStyle = {},
  textVariantt = "titleSmall",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          variant === "primary" ? styles.primaryText : styles.secondaryText,
          textStyle,
        ]}
        textVariant={"labelMedium"}
        variant={textVariantt}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    paddingHorizontal: 28,
    paddingVertical: 10,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  primaryButton: {
    backgroundColor: CombinedDefaultTheme.colors.primary,
    borderColor: palette.purple600,
    shadowColor: palette.purple600,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderColor: palette.grey200,
    shadowColor: palette.grey200,
  },
  secondaryText: {
    color: palette.grey900,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
