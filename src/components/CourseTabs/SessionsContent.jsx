import { View } from "react-native";

import ListAccordion from "../ListAccordion";

const { ACCORDIOM_ITEM_ICON } = require("../../utils/constant");

export const SessionsContent = () => {
  const checkCircle = require("../../assets/icons/check_circle.png");
  const statusCircle = require("../../assets/icons/status.png");
  const statusPurpleCircle = require("../../assets/icons/status_purple.png");
  const downloadIcon = require("../../assets/icons/arrow_circle_down.png");

  const navigationHandler = () => {
    console.log("click");
  };

  const SessionItems = [
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.text,
      leftIcon: checkCircle,
      rightIcon: downloadIcon,
      text: "5 Min",
      title: "Welcome to Employee Training 101",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.video,
      leftIcon: statusPurpleCircle,
      rightIcon: downloadIcon,
      selected: true,
      text: "5 Min",
      title: "Welcome to Employee Training?",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.video,
      leftIcon: statusCircle,
      rightIcon: downloadIcon,
      text: "5 Min",
      title: "Benefits of Employee Training",
    },
    {
      descriptionIcon: ACCORDIOM_ITEM_ICON.globel,
      leftIcon: statusCircle,
      rightIcon: downloadIcon,
      text: "Web link",
      title: "How to Set Up an Employee Training Plan",
    },
  ];
  return (
    <View>
      <ListAccordion
        description="1/4 | 28min"
        expandedState={true}
        listData={SessionItems}
        rightIcon={downloadIcon}
        title="Session 1"
        onItemPress={navigationHandler}
      ></ListAccordion>
      <ListAccordion
        description="1/4 | 28min"
        listData={SessionItems}
        rightIcon={downloadIcon}
        title="Session 2"
      ></ListAccordion>
    </View>
  );
};
