import React, { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

const ItemDescription = ({ text = "", showResource = false, icon }) => {
  const folderClosed = require("../../src/assets/icons/folder_closed.png");

  const getIconImage = useCallback((icon) => {
    switch (icon) {
      case "GLOBEL":
        return require("../../src/assets/icons/item_globe.png");
      case "VIDEO":
        return require("../../src/assets/icons/item_video.png");
      case "TEXT":
        return require("../../src/assets/icons/item_text.png");
      default:
        return require("../../src/assets/icons/item_text.png");
    }
  }, []);
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={styles.itemDescriptionContainer}>
        <View style={styles.itemDescription}>
          <Image
            source={getIconImage(icon)}
            style={styles.itemDescriptionImage}
          />
          <Text style={styles.itemDescriptionText}>{text}</Text>
        </View>
        {!!showResource && (
          <View
            style={[
              styles.itemDescription,
              { flex: 0, justifyContent: "flex-end" },
            ]}
          >
            <Image source={folderClosed} style={styles.itemDescriptionImage} />
            <Text
              style={[
                styles.itemDescriptionText,
                styles.itemDescriptionResourcesText,
              ]}
            >
              Resources
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const ListAccordion = ({
  listData,
  title = "",
  description = "",
  onItemPress,
}) => {
  const listItemHandler = () => {
    if (onItemPress) {
      onItemPress();
    }
  };
  return (
    <List.Accordion
      right={(props) => (
        <List.Icon
          {...props}
          icon={
            props.isExpanded
              ? require("../../src/assets/icons/chevron_up.png")
              : require("../../src/assets/icons/chevron_down.png")
          }
        />
      )}
      description={description}
      descriptionStyle={styles.accordionDescriptionStyle}
      style={styles.accordionStyle}
      title={title}
      titleStyle={styles.accordionTitleStyle}
    >
      {listData.map((item, index) => (
        <List.Item
          key={index}
          description={
            <ItemDescription
              icon={item.descriptionIcon}
              showResource={item.showResource}
              text={item.text}
            />
          }
          left={() => (
            <Image source={item?.icon} style={styles.itemImageStyle} />
          )}
          style={[
            styles.accordionItemsStyle,
            item?.selected && styles.accordionSelectedItemsStyle,
            item?.extraStyles || {},
          ]}
          title={item.title}
          titleStyle={styles.itemTitleStyle}
          onPress={
            (item?.onClick && item?.onClick) ||
            (listItemHandler && listItemHandler)
          }
        />
      ))}
    </List.Accordion>
  );
};

export default ListAccordion;

const styles = StyleSheet.create({
  accordionDescriptionStyle: {
    color: "#667085",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
  },
  accordionItemsStyle: {
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  accordionSelectedItemsStyle: {
    backgroundColor: "#FDFAFF",
    borderLeftColor: "#852DCD",
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  accordionStyle: {
    backgroundColor: "#F9FAFB",
    marginTop: -8,
  },
  accordionTitleStyle: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    marginBottom: 2,
  },
  itemDescription: {
    alignItems: "center",
    columnGap: 4,
    flex: 1,
    flexDirection: "row",
  },
  itemDescriptionContainer: {
    alignItems: "center",
    columnGap: 4,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDescriptionImage: {
    height: 16,
    width: 16,
  },
  itemDescriptionResourcesText: {
    color: "#60179C",
    fontWeight: 500,
  },
  itemDescriptionText: {
    color: "#475467",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 16,
  },
  itemImageStyle: {
    height: 18,
    marginTop: 6,
    width: 18,
  },
  itemTitleStyle: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 20,
    marginBottom: 6,
  },
});
