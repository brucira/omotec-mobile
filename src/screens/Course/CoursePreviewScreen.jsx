import React from "react";
import { StyleSheet, View } from "react-native";

import AssignmentHeader from "../../components/CourseHeader/AssignmentHeader";
import OverView from "../../components/CourseHeader/OverView";
import PDFViewer from "../../components/CourseHeader/PDFViewer";
import TestHeader from "../../components/CourseHeader/TestHeader";
import VideoPlayer from "../../components/CourseHeader/VideoPlayer";
import WebLink from "../../components/CourseHeader/WebLink";
import { DiscussionsContent } from "../../components/CourseTabs/DiscussionsContent";
import { KitContent } from "../../components/CourseTabs/KitContent";
import NoteContent from "../../components/CourseTabs/NoteContent";
import { OverviewContent } from "../../components/CourseTabs/OverviewContent";
import RecordingsContent from "../../components/CourseTabs/RecordingsContent";
import ReviewsContent from "../../components/CourseTabs/ReviewsContent";
import { SessionsContent } from "../../components/CourseTabs/SessionsContent";
import CourseTitle from "../../components/CourseTitle";
import CustomTabs from "../../components/CustomTabs";
import { CombinedDefaultTheme } from "../../styles/theme";
import { ACCORDIOM_ITEM_TYPE, TEMP_VIDEO_URL } from "../../utils/constant";

const TABS = [
  {
    content: <SessionsContent />,
    key: "sessions",
    title: "Sessions",
  },
  {
    content: <OverviewContent />,
    key: "overview",
    title: "Overview",
  },
  {
    content: <KitContent />,
    key: "kits",
    title: "Kits",
  },
  {
    content: <DiscussionsContent />,
    key: "discussions",
    title: "Discussions",
  },
  {
    content: <NoteContent />,
    key: "notes",
    title: "Notes",
  },
  {
    content: <ReviewsContent />,
    key: "reviews",
    title: "Reviews",
  },
  {
    content: <RecordingsContent />,
    key: "recordings",
    title: "Recordings",
  },
];

const CourseHeaderContent = ({ type }) => {
  if (type === ACCORDIOM_ITEM_TYPE.OVERVIEW) {
    return <OverView />;
  } else if (type === ACCORDIOM_ITEM_TYPE.VIDEO) {
    return <VideoPlayer url={TEMP_VIDEO_URL} />;
  } else if (type === ACCORDIOM_ITEM_TYPE.READING) {
    return <PDFViewer />;
  } else if (type === ACCORDIOM_ITEM_TYPE.WEBLINK) {
    return <WebLink />;
  } else if (type === ACCORDIOM_ITEM_TYPE.TEST) {
    return <TestHeader />;
  } else if (type === ACCORDIOM_ITEM_TYPE.ASSIGNMENT) {
    return <AssignmentHeader />;
  }
};

export const CoursePreviewScreen = (props) => {
  const { type } = props?.route?.params;

  return (
    <View style={styles.container}>
      <CourseHeaderContent type={type} />
      <View style={styles.detailsContainer}>
        <CourseTitle />
        <CustomTabs tabs={TABS} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    rowGap: 8,
  },
  tabContainer: {
    flex: 1,
  },
});

export default CoursePreviewScreen;
