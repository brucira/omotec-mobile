import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Menu } from "react-native-paper";

const CustomMenu = ({ anchor, children, menuStyle = {} }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  return (
    <Menu
      anchor={
        <TouchableOpacity onPress={toggleMenu}>{anchor}</TouchableOpacity>
      }
      contentStyle={[styles.menuContainer, menuStyle]}
      style={{ paddingRight: 4, paddingTop: 32 }}
      visible={visible}
      onDismiss={toggleMenu}
    >
      {children}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "white",
    borderColor: "#EAECF0",
    borderRadius: 8,
    width: 164,
  },
});

export default CustomMenu;
