import React, { Dimensions, Image, StyleSheet } from "react-native";

export const DropDownRightIcon = () => (
  <Image
    source={require("../assets/icons/chevron_down.png")}
    style={styles.dropDownIcon}
  />
);

export default DropDownRightIcon;

const styles = StyleSheet.create({
  dropDownIcon: {
    height: Dimensions.margin * 1.25,
    resizeMode: "cover",
    width: Dimensions.margin * 1.25,
  },
});
