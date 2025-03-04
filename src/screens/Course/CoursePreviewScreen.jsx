/*global setTimeout, clearTimeout*/
import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-paper";
import Pdf from "react-native-pdf";

import { DiscussionsContent } from "../../components/CourseTabs/DiscussionsContent";
import { KitContent } from "../../components/CourseTabs/KitContent";
import NoteContent from "../../components/CourseTabs/NoteContent";
import { OverviewContent } from "../../components/CourseTabs/OverviewContent";
import ReviewsContent from "../../components/CourseTabs/ReviewsContent";
import { SessionsContent } from "../../components/CourseTabs/SessionsContent";
import CustomMenu from "../../components/CustomMenu";
import CustomTabs from "../../components/CustomTabs";
import VideoPlayer from "../../components/VideoPlayer";

const HeaderContent = ({ type }) => {
  const [viewAllText, setViewAllText] = React.useState(7);
  const [urlCopy, setUrlCopy] = React.useState(false);
  const copyIcon = require("../../assets/icons/copy_1.png");
  const copiedIcon = require("../../assets/icons/copy.png");
  const externalIcon = require("../../assets/icons/external_link.png");
  const thumbnailImage = require("../../assets/thumbnail.png");
  const workingCopyLink = urlCopy ? copyIcon : copiedIcon;

  const url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const source = {
    cache: true,
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  };

  const viewMoreHandler = () => {
    setViewAllText(null);
  };

  const copyHandler = async (url) => {
    Clipboard.setString(url);
    setUrlCopy(true);
    const timeout = setTimeout(() => {
      setUrlCopy(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const externalLinkHandler = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Can't open this link.");
    }
  };

  if (type === "OVERVIEW") {
    return (
      <View style={styles.readingContainer}>
        <Image
          resizeMode="cover"
          source={thumbnailImage}
          style={[styles.thumbnail]}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            numberOfLines={viewAllText}
            style={{ color: "#101828" }}
            variant="bodyMedium"
          >
            No matter what technical level your employees are at, there's always
            some room for improvement. Technical skills (or hard skills as some
            people like to call them) mainly include on-the-job tasks like data
            analysis, coding, writing, account management, programming, etc.
            Technical skills training is an essential process every business
            needs to put their employees through, simply, because employees will
            know how to do their job right. And as for those who are already
            good at what they're doing, trust us, they'll become the stars of
            your organization by learning more than they already know. Technical
            skills training can either be included in employees' onboarding
            training or anytime an existing employee would like to expand their
            skillset. Never forget there's always something new to learn.
          </Text>
          {viewAllText && (
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={viewMoreHandler}
            >
              <Text style={{ color: "#852DCD" }} variant="labelMedium">
                View More
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else if (type === "VIDEO") {
    return (
      <VideoPlayer
        containerStyle={styles.playerContainerStyle}
        playerStyle={styles.playerStyle}
        url={url}
      ></VideoPlayer>
    );
  } else if (type === "READING") {
    return (
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
          style={styles.pdf}
          onError={(error) => {
            console.log(error);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
        />
      </View>
    );
  } else if (type === "WEBLINK") {
    return (
      <View style={styles.webLinkContainer}>
        <View style={{ height: 24 }}></View>
        <View style={{ rowGap: 12 }}>
          <View style={{ rowGap: 6 }}>
            <Text style={styles.copyHeadingText} variant="labelLarge">
              URL of webpage
            </Text>
            <View style={styles.copyLinkContainer}>
              <Text style={styles.copyLinkText} variant="bodyMedium">
                https://onmyowntechnology.com/
              </Text>
              <TouchableOpacity
                onPress={() => copyHandler("https://onmyowntechnology.com")}
              >
                <Image source={workingCopyLink} style={styles.menuImage} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewLinkContainer}
            onPress={() => externalLinkHandler("https://onmyowntechnology.com")}
          >
            <Image source={externalIcon} style={styles.menuImage} />
            <Text style={{ color: "#60179C" }} variant="labelMedium">
              View Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export const CoursePreviewScreen = (props) => {
  const { type } = props?.route?.params;
  console.log(type);

  const tabs = [
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
  ];

  const menuItem = [
    {
      imageurl: require("../../assets/icons/star_1.png"),
      onItemPress: () => console.log("Leave a rating"),
      title: "Leave a rating",
    },
    {
      imageurl: require("../../assets/icons/share.png"),
      onItemPress: () => console.log("Share"),
      title: "Share",
    },
  ];

  const menuItemHanler = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={item?.onItemPress}
      >
        <Image source={item.imageurl} style={styles.menuImage} />
        <Text style={{ flex: 1 }} variant="titleSmall">
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 0 : 100}
      style={{ backgroundColor: "white", flex: 1 }}
    >
      <HeaderContent type={type} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title} variant="titleMedium">
              What is Employee Training ?
            </Text>
            <CustomMenu
              anchor={
                <Image
                  source={require("../../assets/icons/more_vertical.png")}
                  style={styles.moreVerticalIcon}
                />
              }
            >
              {menuItem?.map(menuItemHanler)}
            </CustomMenu>
          </View>
          <Text
            numberOfLines={2}
            style={styles.description}
            variant={"bodySmall"}
          >
            John Doe
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <CustomTabs tabs={tabs} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CoursePreviewScreen;

const styles = StyleSheet.create({
  copyHeadingText: {
    color: "#101828",
    fontWeight: 600,
  },
  copyLinkContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EAECF0",
    borderRadius: 12,
    borderWidth: 1,
    columnGap: 8,
    elevation: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#101828",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  copyLinkText: {
    color: "#101828",
    flex: 1,
  },
  description: {
    color: "#475467",
  },
  detailsContainer: {
    flex: 1,
    rowGap: 8,
  },
  menuImage: {
    height: 20,
    width: 20,
  },
  menuItem: {
    columnGap: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  moreVerticalIcon: {
    height: 24,
    width: 24,
  },
  pdf: {
    height: 200,
    width: "100%",
  },
  pdfContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginTop: 25,
  },
  playerContainerStyle: {
    marginBottom: 20,
  },
  playerStyle: {
    height: 222,
  },
  readingContainer: {
    marginBottom: 20,
    rowGap: 16,
  },
  tabContainer: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 16,
    rowGap: 2,
  },
  thumbnail: {
    height: 230,
    width: "100%",
  },
  title: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 24,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewLinkContainer: {
    alignItems: "center",
    columnGap: 8,
    flexDirection: "row",
  },
  webLinkContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    rowGap: 20,
  },
});
