import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

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
    backgroundColor: "#852DCD",
    borderColor: "#60179C",
    shadowColor: "#60179C",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    shadowColor: "#EAECF0",
  },
  secondaryText: {
    color: "##101828",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
