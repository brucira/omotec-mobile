import { Dimensions as NativeDimensions } from "react-native";

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

export const Dimensions = {
  margin: 16,
  padding: 16,
  screenHeight: NativeDimensions.get("window").height,
  screenWidth: NativeDimensions.get("window").width,
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
