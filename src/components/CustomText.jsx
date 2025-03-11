import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

const CustomText = ({ variant = "bodyLarge", style, ...props }) => {
  const theme = useTheme();
  return <Text style={[styles.text, theme.fonts[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});

export default CustomText;
