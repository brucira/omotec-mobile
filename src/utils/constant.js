import { Dimensions as NativeDimensions } from "react-native";

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

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
};

export const notificationData = [
  {
    course: "Robotic kit handling",
    duration: "1h",
    id: 1001,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: true,
    notificationType: "newCourse",
  },
  {
    course: "Robotic Kit",
    duration: "15 min",
    grade: "A+",
    id: 1002,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: true,
    notificationType: "grades",
  },
  {
    course: "Robotic Kit",
    duration: "34 min",
    feedback: "This is looking good",
    id: 1003,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: false,
    notificationType: "feedback",
  },
  {
    course: "Robotic Kit",
    duration: "51 min",
    id: 1004,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: false,
    notificationType: "certificate",
  },
  {
    course: "Robotic Kit",
    duration: "1d",
    fileName: "Omotec design requirements.pdf",
    fileSize: "200KB",
    id: 1005,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: false,
    notificationType: "assignment",
  },
];

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

export const RouteNames = {
  Calender: "Calender",
  Home: "Home",
  Learning: "My Learning",
  Notifications: "Notifications",
  Profile: "Profile",
  Search: "Search",
  Tabs: "Tabs",
};
