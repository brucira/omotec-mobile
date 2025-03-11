import { useState } from "react";
import { View } from "react-native";

import ListAccordion from "../ListAccordion";

const { ACCORDIOM_ITEM_ICON } = require("../../utils/constant");

export const SessionsContent = () => {
  const downloadIcon = require("../../assets/icons/arrow_circle_down.png");

  const navigationHandler = () => {
    console.log("session Item click");
  };

  const SessionItems = {
    description: "1/4 | 28min",
    items: [
      {
        checked: true,
        descriptionIcon: ACCORDIOM_ITEM_ICON.text,
        id: "1",
        rightIcon: downloadIcon,
        text: "5 Min",
        title: "Welcome to Employee Training 101",
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.video,
        id: "2",
        rightIcon: downloadIcon,
        selected: true,
        text: "5 Min",
        title: "Welcome to Employee Training?",
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.video,
        id: "3",
        rightIcon: downloadIcon,
        text: "5 Min",
        title: "Benefits of Employee Training",
      },
      {
        descriptionIcon: ACCORDIOM_ITEM_ICON.globel,
        id: "4",
        rightIcon: downloadIcon,
        text: "Web link",
        title: "How to Set Up an Employee Training Plan",
      },
    ],
    title: "Session",
  };

  const [list, setList] = useState(SessionItems);
  return (
    <View>
      <ListAccordion
        expandedState={true}
        listData={list}
        rightIcon={downloadIcon}
        updateData={setList}
        onItemPress={navigationHandler}
      ></ListAccordion>
      <ListAccordion
        listData={list}
        rightIcon={downloadIcon}
        updateData={setList}
        onItemPress={navigationHandler}
      ></ListAccordion>
    </View>
  );
};
