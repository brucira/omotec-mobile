import React from "react";

import AssignmentScreen from "../screens/Course/AssignmentScreen";
import TestScreen from "../screens/Course/TestScreen";
import { ACCORDIOM_ITEM_TYPE } from "../utils/constant";
import OverView from "./CourseHeader/OverView";
import PDFViewer from "./CourseHeader/PDFViewer";
import VideoPlayer from "./CourseHeader/VideoPlayer";
import WebLink from "./CourseHeader/WebLink";

const CourseHeaderContent = ({ type }) => {
  const url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  if (type === ACCORDIOM_ITEM_TYPE.OVERVIEW) {
    return <OverView />;
  } else if (type === ACCORDIOM_ITEM_TYPE.VIDEO) {
    return <VideoPlayer url={url} />;
  } else if (type === ACCORDIOM_ITEM_TYPE.READING) {
    return <PDFViewer />;
  } else if (type === ACCORDIOM_ITEM_TYPE.WEBLINK) {
    return <WebLink />;
  } else if (type === ACCORDIOM_ITEM_TYPE.TEST) {
    return <TestScreen />;
  } else if (type === ACCORDIOM_ITEM_TYPE.ASSIGNMENT) {
    return <AssignmentScreen />;
  }
};

export default CourseHeaderContent;
