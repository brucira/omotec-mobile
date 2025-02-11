// import { CalendarUtils, TimelineEventProps } from "react-native-calendars";

// import palette from "../../styles/palette";
// import { CombinedDefaultTheme } from "../../styles/theme";

// const EVENT_COLOR = palette.blue500;
// const EVENT_COLOR_TWO = palette.green500;
// const EVENT_COLOR_THREE = palette.secondary400;
// const today = new Date();
// export const getDate = (offset = 0) => {
//   return CalendarUtils.getCalendarDateString(
//     // eslint-disable-next-line prettier/prettier
//     new Date().setDate(today.getDate() + offset)
//   );
// };

// export const timelineEvents = [
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate(-1)} 12:00:00`,
//     start: `${getDate(-1)} 09:20:00`,
//     summary: "Merge Timeline Calendar to React Native Calendars",
//     title: "Merge Request to React Native Calendars",
//   },
//   {
//     color: "transparent",
//     end: `${getDate()} 02:30:00`,
//     start: `${getDate()} 01:15:00`,
//     summary: "Summary for meeting A",
//     title: "Meeting A",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate()} 02:30:00`,
//     start: `${getDate()} 01:30:00`,
//     summary: "Summary for meeting B",
//     title: "Meeting B",
//   },
//   {
//     color: EVENT_COLOR_TWO,
//     end: `${getDate()} 02:45:00`,
//     start: `${getDate()} 01:45:00`,
//     summary: "Summary for meeting C",
//     title: "Meeting C",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate()} 03:10:00`,
//     start: `${getDate()} 02:40:00`,
//     summary: "Summary for meeting D",
//     title: "Meeting D",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate()} 03:20:00`,
//     start: `${getDate()} 02:50:00`,
//     summary: "Summary for meeting E",
//     title: "Meeting E",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate()} 05:30:00`,
//     start: `${getDate()} 04:30:00`,
//     summary: "Summary for meeting F",
//     title: "Meeting F",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate()} 16:00:00`,
//     start: `${getDate()} 15:00:00`,
//     summary: "Summary for meeting M",
//     title: "Meeting F",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate()} 17:00:00`,
//     start: `${getDate()} 16:00:00`,
//     summary: "Summary for meeting M",
//     title: "Meeting F",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(1)} 01:30:00`,
//     start: `${getDate(1)} 00:30:00`,
//     summary: "Visit Grand Mother and bring some fruits.",
//     title: "Visit Grand Mother",
//   },
//   {
//     color: EVENT_COLOR_TWO,
//     end: `${getDate(1)} 03:20:00`,
//     start: `${getDate(1)} 02:30:00`,
//     summary: "Meeting with Prof. Behjet at 130 in her office.",
//     title: "Meeting with Prof. Behjet Zuhaira",
//   },
//   {
//     color: EVENT_COLOR_TWO,
//     end: `${getDate(1)} 04:40:00`,
//     start: `${getDate(1)} 04:10:00`,
//     summary: "Tea Time with Dr. Hasan, Talk about Project",
//     title: "Tea Time with Dr. Hasan",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate(1)} 01:35:00`,
//     start: `${getDate(1)} 01:05:00`,
//     summary: "3412 Piedmont Rd NE, GA 3032",
//     title: "Dr. Mariana Joseph",
//   },
//   {
//     color: EVENT_COLOR_THREE,
//     end: `${getDate(1)} 16:30:00`,
//     start: `${getDate(1)} 14:30:00`,
//     summary: "Arsalan, Hasnaat, Talha, Waleed, Bilal",
//     title: "Meeting Some Friends in ARMED",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(2)} 02:25:00`,
//     start: `${getDate(2)} 01:40:00`,
//     summary: "Computer Science Dept. Comsats Islamabad",
//     title: "Meet Sir Khurram Iqbal",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(2)} 04:40:00`,
//     start: `${getDate(2)} 04:10:00`,
//     summary: "WeRplay",
//     title: "Tea Time with Colleagues",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(2)} 01:45:00`,
//     start: `${getDate(2)} 00:45:00`,
//     summary: "with Boys at Work",
//     title: "Lets Play Apex Legends",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(2)} 12:30:00`,
//     start: `${getDate(2)} 11:30:00`,
//     summary: "3412 Piedmont Rd NE, GA 3032",
//     title: "Dr. Mariana Joseph",
//   },
//   {
//     color: EVENT_COLOR,
//     end: `${getDate(4)} 13:45:00`,
//     start: `${getDate(4)} 12:10:00`,
//     summary: "Merge Timeline Calendar to React Native Calendars",
//     title: "Merge Request to React Native Calendars",
//   },
// ];
