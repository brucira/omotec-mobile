/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import { Dimensions as NativeDimensions } from "react-native";

import palette from "../styles/palette";
import { CombinedDefaultTheme } from "../styles/theme";

export const testIDs = {
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  calendarList: { CONTAINER: "calendarList" },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  horizontalList: { CONTAINER: "horizontalList" },
  menu: {
    AGENDA: "agenda_btn",
    AGENDA_INFINITE: "agenda_infinite_btn",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    CONTAINER: "menu",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    PLAYGROUND: "playground_btn",
    TIMELINE_CALENDAR: "timeline_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
  },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

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

export const barGraphPerformanceData = {
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
export const barGraphAttendanceData = {
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
  labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"],
};

export const calendarTheme = {
  palette: {
    gray: {
      grey200: palette.grey200,
    },
    nowIndicator: palette.primaryStudent400,
  },
};

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

export const courseCardData = [
  {
    avgPerformance: "78%",
    avgProgress: "78%",
    batch: 1,
    coverImage: require("../assets/dummy_2.png"),
    date: "May 1 - Jun 30",
    id: 211,
    learningType: "course",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    sessions: 12,
    title: "Science, technology, engineering design and math skills",
    trainer: "John Doe",
  },
  {
    avgPerformance: "78%",
    avgProgress: "78%",
    batch: 1,
    coverImage: require("../assets/dummy_2.png"),
    date: "May 1 - Jun 30",
    id: 212,
    learningType: "course",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    sessions: 12,
    title: "Science, technology, engineering design and math skills",
    trainer: "John Doe",
  },
  {
    avgPerformance: "78%",
    avgProgress: "78%",
    batch: 1,
    coverImage: require("../assets/dummy_2.png"),
    date: "May 1 - Jun 30",
    id: 213,
    learningType: "course",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    sessions: 12,
    title: "Science, technology, engineering design and math skills",
    trainer: "John Doe",
  },
];

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
};
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
export const today = new Date();

export const events = [
  {
    address: "Powai, Mumbai, Maharastra",
    attachment: "Course Details",
    attendance: [
      {
        name: "Ralph Edwards",
        status: "present",
      },
      {
        name: "Leslie Alexander",
        status: "absent",
      },
      {
        name: "Darlene Robertson",
        status: "absent",
      },
      {
        name: "Guy Hawkins",
        status: "present",
      },
      {
        name: "Devon Lane",
        status: "present",
      },
      {
        name: "Ralph Edwards",
        status: "present",
      },
    ],
    background: palette.blue400,
    batchName: "B1",
    batchStudents: [
      {
        avatar: require("../assets/avatar.png"),
        name: "Ralph Edwards",
      },
      {
        avatar: require("../assets/avatar.png"),
        name: "Leslie Alexander",
      },
      {
        avatar: require("../assets/avatar.png"),
        name: "Darlene Robertson",
      },
      {
        avatar: require("../assets/avatar.png"),
        name: "Guy Hawkins",
      },
      {
        avatar: require("../assets/avatar.png"),
        name: "Devon Lane",
      },
      {
        avatar: require("../assets/avatar.png"),
        name: "Ralph Edwards",
      },
    ],
    course: "CS50",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    location: "Powai",
    notify: "10 minutes before",
    specialDay: "Mahavir Jayanti",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      8,
      0
    ),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Proposal Submission",
    trainer: "John Doe",
  },
  {
    background: palette.yellow700,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Proposal Submission",
  },
  {
    background: palette.pink700,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
      13,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0
    ),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Proposal Submission",
  },
  {
    background: palette.purple500,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      14,
      0
    ),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Proposal Submission",
  },
  {
    background: palette.purple500,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      14,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      11,
      0
    ),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Proposal Submission",
  },
  {
    background: palette.purple500,
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    specialDay: true,
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    subtitle: "Web Development Bootcamp · Mumbai",
    title: "Diwali",
  },

  // {
  //   background: palette.blue400,
  //   end: dayjs("2025-02-17").toDate(),
  //   start: dayjs("2025-02-11").toDate(),
  //   title: "Web",
  // },
  // {
  //   background: palette.pink700,
  //   end: dayjs("2025-02-12").toDate(),
  //   start: dayjs("2025-02-12").toDate(),
  //   title: "Python",
  // },
  // {
  //   background: palette.purple500,
  //   end: dayjs("2025-02-27").toDate(),
  //   start: dayjs("2025-02-13").toDate(),
  //   title: "Java",
  // },
  // {
  //   end: dayjs("2025-02-3").toDate(),
  //   specialDay: true,
  //   start: dayjs("2025-02-3").toDate(),
  //   title: "Diwali",
  // },
  // {
  //   background: palette.purple500,
  //   end: dayjs("2025-02-7").toDate(),
  //   start: dayjs("2025-02-7").toDate(),
  //   title: "Java",
  // },
  // {
  //   background: palette.yellow700,
  //   end: dayjs("2025-02-7").toDate(),
  //   start: dayjs("2025-02-7").toDate(),
  //   title: "Java",
  // },
  // {
  //   end: dayjs("2025-02-7").toDate(),
  //   overlapPosition: 24,
  //   specialDay: true,
  //   start: dayjs("2025-02-7").toDate(),
  //   title: "Makar Sankranti",
  // },
  // {
  //   end: dayjs("2025-02-13").toDate(),
  //   specialDay: true,
  //   start: dayjs("2025-02-13").toDate(),
  //   special: "Diwali",
  // },
  // {
  //   background: palette.yellow700,
  //   end: dayjs().add(5, "days").hour(0).minute(0).second(0).toDate(),
  //   start: dayjs().hour(0).minute(0).second(0).toDate(),
  //   title: "RX-1002",
  // },
];
export const lineGraphData = {
  datasets: [
    {
      data: [0, 30, 68, 100],
    },
  ],
  labels: ["Session 1", "Session 2", "Session 3", "Session 4"],
};

export const projectCardData = [
  {
    batch: 1,
    coverImage: require("../assets/dummy_1.png"),
    duration: "4 months",
    endDate: "12 Sept,2024",
    id: 311,
    learningType: "project",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    startDate: "3 May,2024",
    subject: "Machine",
    tasks: 5,
    title: "Science, technology, engineering design and math skills",
  },
  {
    batch: 1,
    coverImage: require("../assets/dummy_2.png"),
    duration: "4 months",
    endDate: "12 Sept,2024",
    id: 312,
    learningType: "project",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    startDate: "3 May,2024",
    subject: "Machine",
    tasks: 5,
    title: "Science, technology, engineering design and math skills",
  },
  {
    batch: 1,
    coverImage: require("../assets/dummy_2.png"),
    duration: "4 months",
    endDate: "12 Sept,2024",
    id: 313,
    learningType: "project",
    location: "Mumbai",
    progressDenominator: 5,
    progressNumerator: 4,
    startDate: "3 May,2024",
    subject: "Machine",
    tasks: 5,
    title: "Science, technology, engineering design and math skills",
  },
];

export const progressData = {
  colors: [CombinedDefaultTheme.colors.primary],
  data: [0.2],
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
export const monthly_events = [
  {
    background: palette.blue400,
    end: dayjs("2025-02-17").toDate(),
    start: dayjs("2025-02-11").toDate(),
    title: "Web",
  },
  {
    background: palette.pink700,
    end: dayjs("2025-02-12").toDate(),
    start: dayjs("2025-02-12").toDate(),
    title: "Python",
  },
  {
    background: palette.purple500,
    end: dayjs("2025-02-27").toDate(),
    start: dayjs("2025-02-13").toDate(),
    title: "Java",
  },
  {
    end: dayjs("2025-02-3").toDate(),
    specialDay: true,
    start: dayjs("2025-02-3").toDate(),
    title: "Diwali",
  },
  {
    background: palette.purple500,
    end: dayjs("2025-02-7").toDate(),
    start: dayjs("2025-02-7").toDate(),
    title: "Java",
  },
  {
    background: palette.yellow700,
    end: dayjs("2025-02-7").toDate(),
    start: dayjs("2025-02-7").toDate(),
    title: "Java",
  },
  {
    end: dayjs("2025-02-7").toDate(),
    overlapPosition: 24,
    specialDay: true,
    start: dayjs("2025-02-7").toDate(),
    title: "Makar Sankranti",
  },
  // {
  //   end: dayjs("2025-02-13").toDate(),
  //   specialDay: true,
  //   start: dayjs("2025-02-13").toDate(),
  //   special: "Diwali",
  // },
  {
    background: palette.yellow700,
    end: dayjs().add(5, "days").hour(0).minute(0).second(0).toDate(),
    start: dayjs().hour(0).minute(0).second(0).toDate(),
    title: "RX-1002",
  },
  // {
  //   background: palette.yellow700,
  //   end: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     12,
  //     0
  //   ),
  //   start: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     11,
  //     0
  //   ),
  //   subtitle: "Web Development Bootcamp · Mumbai",
  //   title: "Proposal Submission",
  // },
  // {
  //   background: palette.pink700,
  //   end: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     13,
  //     0
  //   ),
  //   start: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     12,
  //     0
  //   ),
  //   subtitle: "Web Development Bootcamp · Mumbai",
  //   title: "Proposal Submission",
  // },
  // {
  //   background: palette.purple500,
  //   end: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     15,
  //     0
  //   ),
  //   start: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate(),
  //     14,
  //     0
  //   ),
  //   subtitle: "Web Development Bootcamp · Mumbai",
  //   title: "Proposal Submission",
  // },
  // {
  //   background: palette.purple500,
  //   end: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + 1,
  //     14,
  //     0
  //   ),
  //   start: new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + 1,
  //     11,
  //     0
  //   ),
  //   subtitle: "Web Development Bootcamp · Mumbai",
  //   title: "Proposal Submission",
  // },
];
export const notificationData = [
  {
    course: "Robotic kit handling",
    duration: "1 min",
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
    // course: "Robotic kit handling",
    duration: "45 min",
    id: 1004,
    imageSource: require("../assets/dummy_1.png"),
    // newNotification: true,
    notificationType: "enrollment",
  },
  {
    course: "Robotic Kit",
    duration: "51 min",
    id: 1005,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: false,
    notificationType: "certificate",
  },
  {
    course: "Robotic Kit",
    duration: "1d",
    fileName: "Omotec design requirements.pdf",
    fileSize: "200KB",
    id: 1006,
    imageSource: require("../assets/dummy_1.png"),
    newNotification: false,
    notificationType: "assignment",
    progress: 100,
  },
];
export const specialDays = {
  "02-10": "Gandhi Jayanti",
  "13-02": "Special Holiday",
  "15-08": "Independence Day",
  "25-12": "Christmas",
  "26-01": "Republic Day",
};

export const suggestions = [
  "Physics",
  "Maths",
  "Robotics",
  "AI",
  "Python",
  "JavaScript",
  "React",
];
const monday = dayjs().day(1);
const wednusday = dayjs().day(3);
export const week_events = [
  {
    allDay: true,
    background: palette.blue400,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    specialDay: "Mahavir Jayanti",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      8,
      0
    ),
    subtitle: "Web Development",
    title: "Holiday",
  },
  {
    allDay: true,
    end: wednusday.add(4, "day").set("hour", 0).set("minute", 0).toDate(),
    start: wednusday.add(4, "day").set("hour", 0).set("minute", 0).toDate(),
    title: "Vacation Recovery",
  },
];
export const allDayEvents = [
  {
    background: "blue", // Ensure colors are correctly referenced
    end: new Date(2025, 1, 12, 0, 0), // Corrected to February
    specialDay: "Mahavir Jayanti",
    start: new Date(2025, 1, 12, 23, 0), // Start of the day
    subtitle: "Web Development",
    title: "Holiday",
  },
];
export const weekEvents = [
  {
    allDayEvents: [{ title: "1" }],
    background: palette.blue400,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    specialDay: "Mahavir Jayanti",
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      8,
      0
    ),
    subtitle: "Web Development",
    title: "Meeting",
  },
  {
    background: palette.yellow700,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0
    ),
    title: "Meeting",
  },
  {
    background: palette.pink700,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      13,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0
    ),
    title: "Meeting",
  },
  {
    background: palette.purple500,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      14,
      0
    ),
    title: "Meeting",
  },
  {
    background: palette.purple500,
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      14,
      0
    ),
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      11,
      0
    ),
    title: "Meeting",
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
