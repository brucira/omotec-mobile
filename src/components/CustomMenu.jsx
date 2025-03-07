import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Menu } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";

const CustomMenu = ({ anchor, children, menuStyle = {} }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <Menu
      anchor={
        <TouchableOpacity onPress={toggleMenu}>{anchor}</TouchableOpacity>
      }
      contentStyle={[styles.menuContainer, menuStyle]}
      style={styles.menuContent}
      visible={visible}
      onDismiss={toggleMenu}
    >
      {children}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: palette.grey200,
    borderRadius: 8,
    width: 164,
  },
  menuContent: { paddingRight: 4, paddingTop: 32 },
});

export default CustomMenu;
