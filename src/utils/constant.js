import { Dimensions as NativeDimensions } from "react-native";

import palette from "../styles/palette";

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
};

export const tabData = [
  "Mumbai",
  "Pune",
  "Goa",
  "Delhi",
  "Kolkata",
  "Bengaluru",
];

export const cardData = [
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
  {
    background: palette.tintGreen,
    gradient: require("../assets/green_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI/UX Design Course",
  },
  {
    background: palette.tintOrange,
    gradient: require("../assets/orange_gradient.png"),
    location: "Mumbai",
    members: "57",
    time: "2:00 - 4:00 PM",
    title: "UI Research Design Course",
  },
];

export const RouteNames = {
  Calender: "Calender",
  Home: "Home",
  Learning: "My Learning",
  Notifications: "Notifications",
  Profile: "Profile",
  Search: "Search",
  Tabs: "Tabs",
};
