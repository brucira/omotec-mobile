import { Dimensions as NativeDimensions } from "react-native";

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
};

export const popularCourseCardData = [
  {
    coverImage: require("../assets/dummy_11.png"),
    duration: "4 months",
    enrolls: "12.1k",
    id: 121,
    location: "Mumbai",
    rating: "4.5",
    session: 12,
    title: "Mastering Python",
  },
  {
    coverImage: require("../assets/dummy_11.png"),
    duration: "4 months",
    enrolls: "12.1k",
    id: 122,
    location: "Chennai",
    rating: "4.5",
    session: 12,
    title: "Mastering Java",
  },
  {
    coverImage: require("../assets/dummy_11.png"),
    duration: "4 months",
    enrolls: "12.1k",
    id: 123,
    location: "Mumbai",
    rating: "4.5",
    session: 12,
    title: "Mastering Python",
  },
];

export const browseCourseCardData = [
  {
    coverImage: require("../assets/dummy_22.png"),
    enrolls: "12.1k",
    id: 131,
    location: "Mumbai",
    rating: "4.5",
    session: 12,
    title: "Mastering Python",
  },
  {
    coverImage: require("../assets/dummy_22.png"),
    enrolls: "12.1k",
    id: 132,
    location: "Mumbai",
    rating: "4.5",
    session: 12,
    title: "Mastering Python",
  },
  {
    coverImage: require("../assets/dummy_22.png"),
    enrolls: "12.1k",
    id: 133,
    location: "Mumbai",
    rating: "4.5",
    session: 12,
    title: "Mastering Python",
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
