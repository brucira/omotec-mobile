import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";
import { ACCORDIOM_ITEM_TYPE } from "../utils/constant";

const ItemDescription = ({ text = "", showResource = false, icon }) => {
  const folderClosed = require("../assets/icons/folder_closed.png");

  const getIconImage = useCallback((icon) => {
    switch (icon) {
      case "WEBLINK":
        return require("../assets/icons/item_globe.png");
      case "VIDEO":
        return require("../assets/icons/item_video.png");
      case "TEXT":
        return require("../assets/icons/item_text.png");
      case "TEST":
        return require("../assets/icons/pencil.png");
      case "ASSIGNMENT":
        return require("../assets/icons/file_edit.png");
      case "READING":
        return require("../assets/icons/book_1.png");
      default:
        return require("../assets/icons/item_text.png");
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
        {showResource && (
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
  onItemPress,
  updateData,
  expandedState = false,
  rightIcon,
}) => {
  const [expanded, setExpanded] = useState(expandedState);

  const upIcon = require("../../src/assets/icons/chevron_up.png");
  const downIcon = require("../../src/assets/icons/chevron_down.png");
  const statusPurpleCircle = require("../assets/icons/status_purple.png");
  const statusCircle = require("../assets/icons/status.png");
  const checkCircle = require("../assets/icons/check_circle.png");

  const listItemHandler = (type) => {
    if (onItemPress) {
      onItemPress(type || ACCORDIOM_ITEM_TYPE.OVERVIEW);
    }
  };

  const changeSelected = (newItem) => {
    const newList = listData?.items?.map((item) => {
      if (item?.id === newItem?.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    updateData({ ...listData, items: newList });
  };

  return (
    <List.Accordion
      right={(props) => {
        const iconToShow = rightIcon
          ? rightIcon
          : props.isExpanded
            ? upIcon
            : downIcon;
        return (
          <List.Icon
            {...props}
            icon={iconToShow}
            style={{ height: 20, width: 20 }}
          />
        );
      }}
      description={listData?.description || null}
      descriptionStyle={styles.accordionDescriptionStyle}
      expanded={expanded}
      style={styles.accordionStyle}
      title={listData?.title || null}
      titleStyle={styles.accordionTitleStyle}
      onPress={() => setExpanded(!expanded)}
    >
      {listData?.items?.map((item, index) => (
        <List.Item
          key={index}
          description={
            <ItemDescription
              icon={item?.descriptionIcon}
              showResource={item?.showResource}
              text={item?.text}
            />
          }
          left={() => {
            const iconToShow = item?.hideLeft
              ? null
              : item?.leftIcon
                ? item?.leftIcon
                : item?.checked
                  ? checkCircle
                  : item?.selected
                    ? statusPurpleCircle
                    : statusCircle;
            return (
              !!iconToShow && (
                <Image source={iconToShow} style={{ height: 24, width: 24 }} />
              )
            );
          }}
          right={() =>
            item?.rightIcon ? (
              <Image
                source={item?.rightIcon}
                style={{ height: 24, width: 24 }}
              />
            ) : null
          }
          style={[
            styles.accordionItemsStyle,
            item?.selected && styles.accordionSelectedItemsStyle,
            item?.extraStyles || {},
          ]}
          title={item.title}
          titleStyle={styles.itemTitleStyle}
          onPress={() => {
            if (item?.onClick) {
              changeSelected(item);
              item.onClick(item?.type);
            } else if (listItemHandler) {
              changeSelected(item);
              listItemHandler(item?.type);
            }
          }}
        />
      ))}
    </List.Accordion>
  );
};

export default ListAccordion;

const styles = StyleSheet.create({
  accordionDescriptionStyle: {
    color: palette.grey500,
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
    borderLeftColor: CombinedDefaultTheme.colors.primary,
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  accordionStyle: {
    backgroundColor: palette.grey50,
    marginTop: -8,
  },
  accordionTitleStyle: {
    color: palette.grey900,
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
    color: palette.purple600,
    fontWeight: 500,
  },
  itemDescriptionText: {
    color: palette.grey600,
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 16,
  },
  itemImageStyle: {
    height: 20,
    width: 20,
  },
  itemTitleStyle: {
    color: palette.grey900,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 20,
    marginBottom: 6,
  },
});
