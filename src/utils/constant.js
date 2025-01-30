import { Dimensions as NativeDimensions } from "react-native";

import palette from "../styles/palette";

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
};

export const tabData = [
  {
    city: "Mumbai",
    id: 1,
  },
  {
    city: "Pune",
    id: 2,
  },
  {
    city: "Goa",
    id: 3,
  },
  {
    city: "Delhi",
    id: 4,
  },
  {
    city: "Kolkata",
    id: 5,
  },
  {
    city: "Bengaluru",
    id: 6,
  },
];

export const cardData = [
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    id: 31,
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    id: 32,
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    id: 33,
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    id: 34,
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
];

export const dropdownData = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export const todoCardData = [
  {
    date: "20 March",
    id: 21,
    imageSource: require("../assets/icons/clock.png"),
    label: "In Progress",
    subject: "Robotics",
    todoTitle: "Complete the quiz",
  },
  {
    date: "20 March",
    id: 22,
    imageSource: require("../assets/icons/rocket.png"),
    label: "In Progress",
    subject: "Robotics",
    todoTitle: "Complete the quiz",
  },
  {
    date: "20 March",
    id: 23,
    imageSource: require("../assets/icons/clock.png"),
    label: "In Progress",
    subject: "Robotics",
    todoTitle: "Complete the quiz",
  },
];

export const lineGraphData = {
  datasets: [
    {
      data: [0, 30, 68, 100],
    },
  ],
  labels: ["Session 1", "Session 2", "Session 3", "Session 4"],
};

export const barGraphData = {
  datasets: [
    {
      data: [42, 64, 37, 83, 55],
    },
    {
      data: [1],
    },
    {
      data: [100],
    },
  ],
  labels: ["Quiz 1", "Assignment", "Puzzle", "Quiz 2", "Assignment"],
};

export const RouteNames = {
  Calender: "Calender",
  Home: "Home",
  Learning: "My Learning",
  Notifications: "Notifications",
  Profile: "Profile",
  Search: "Search",
  Tabs: "Tabs",
};
