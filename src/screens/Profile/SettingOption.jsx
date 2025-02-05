import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import palette from "../../styles/palette";
import { Dimensions } from "../../utils/constant";

const SettingOption = ({ title, onPress, icon }) => {
  return (
    <TouchableRipple rippleColor="rgba(0, 0, 0, .04)" onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.settingContent}>
          <Image source={icon} style={styles.icon} />
          <Text style={{ color: palette.grey900 }} variant="labelLarge">
            {title}
          </Text>
        </View>
        <Image
          source={require("../../assets/icons/chevron_right.png")}
          style={styles.rightIcon}
        />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Dimensions.padding / 1.6,
  },
  icon: {
    height: Dimensions.margin * 1.125,
    width: Dimensions.margin * 1.125,
  },
  rightIcon: {
    height: Dimensions.margin * 1.25,
    width: Dimensions.margin * 1.25,
  },
  settingContent: {
    flexDirection: "row",
    gap: Dimensions.margin,
  },
});

export default SettingOption;
