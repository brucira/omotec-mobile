import React, { Image, StyleSheet } from "react-native";

export const DropDownRightIcon = () => (
  <Image
    source={require("../assets/icons/chevron_down.png")}
    style={styles.dropDownIcon}
  />
);

export default DropDownRightIcon;

const styles = StyleSheet.create({
  dropDownIcon: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
});
