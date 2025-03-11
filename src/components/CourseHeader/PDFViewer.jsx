import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import Pdf from "react-native-pdf";

import { CombinedDefaultTheme } from "../../styles/theme";
import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const AbsoluteMenu = ({
  currentPage,
  scale,
  setCurrentPage,
  setScale,
  totalPages,
}) => {
  const zoomIn = require("../../assets/icons/zoom_in.png");
  const zoomOut = require("../../assets/icons/zoom_out.png");
  const upIcon = require("../../assets/icons/chevron_up1.png");
  const downIcon = require("../../assets/icons/chevron_down1.png");

  const zoomInHandler = () => {
    const newZoom = Math.min(scale + 0.2, 3);
    setScale(newZoom);
  };

  const zoomOutHandler = () => {
    const newZoom = Math.max(scale - 0.2, 1);
    setScale(newZoom);
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageChangeHandler = (text) => {
    console.log(text);
    if (isNaN(text)) {
      setCurrentPage(currentPage);
    } else {
      if (text >= 1 && text <= totalPages) {
        let pageNum = parseInt(text);
        setCurrentPage((pre) => pageNum);
      } else {
        setCurrentPage((pre) => currentPage);
      }
    }
  };

  return (
    <View style={styles.menuStyle}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.pdfIcon}
          onPress={(e) => {
            e.stopPropagation();
            zoomInHandler();
          }}
        >
          <Image contentFit={"cover"} source={zoomIn} style={styles.pdfIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pdfIcon}
          onPress={(e) => {
            e.stopPropagation();
            zoomOutHandler();
          }}
        >
          <Image contentFit={"cover"} source={zoomOut} style={styles.pdfIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.pdfIcon} onPress={previousPageHandler}>
          <Image contentFit={"cover"} source={upIcon} style={styles.pdfIcon} />
        </TouchableOpacity>
        <TextInput
          inputMode="numeric"
          keyboardType="numeric"
          style={styles.pageView}
          value={String(currentPage)}
          onChangeText={pageChangeHandler}
        />
        <Text style={styles.totalPageCount} variant="bodySmall">
          /{totalPages}
        </Text>
        <TouchableOpacity style={styles.pdfIcon} onPress={nextPageHandler}>
          <Image
            contentFit={"cover"}
            source={downIcon}
            style={styles.pdfIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PDFViewer = ({ customBackNavigate }) => {
  const navigation = useNavigation();
  const backIcon = require("../../assets/icons/chevron_left.png");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [showMenu, setShowMenu] = useState(true);

  const source = {
    cache: true,
    // uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uri: "https://www.sldttc.org/allpdf/21583473018.pdf",
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        if (Platform.Version >= 33) {
          // Android 13+ (API 33+)
          const granted = await PermissionsAndroid.request(
            // eslint-disable-next-line prettier/prettier
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Storage permission denied for Android 13+");
          }
        } else if (Platform.Version >= 30) {
          // Android 11-12 (Scoped Storage)
          console.log(
            // eslint-disable-next-line prettier/prettier
            "No need to request permission for Scoped Storage (Android 11+)"
          );
        } else {
          // Android 10 and below
          const granted = await PermissionsAndroid.request(
            // eslint-disable-next-line prettier/prettier
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Storage permission denied for Android 10 and below");
          }
        }
      } catch (err) {
        console.warn("Error requesting storage permission:", err);
      }
    }
  };

  const checkPermissionStatus = async () => {
    const status = await PermissionsAndroid.check(
      // eslint-disable-next-line prettier/prettier
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    );
    console.log("Permission status:", status ? "Granted" : "Denied");
  };

  const gobackHandler = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      customBackNavigate && customBackNavigate();
    }
  };

  const toggleMenu = () => {
    setShowMenu((pre) => setShowMenu(!pre));
  };

  useEffect(() => {
    requestStoragePermission();
    checkPermissionStatus();
  }, []);

  return (
    <View style={styles.pdfContainer}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={gobackHandler}
      >
        <Image contentFit={"cover"} source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Pdf
        enableAnnotationRendering={true}
        // enableAntialiasing={true}
        enablePaging={true}
        fitPolicy={1}
        page={currentPage}
        scale={scale}
        setCurrentPage={setCurrentPage}
        source={source}
        style={styles.pdf}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages) => {
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
        }}
        onError={(error) => console.log("PDF Error: ", error)}
        onPageSingleTap={toggleMenu}
      />
      {showMenu && (
        <AbsoluteMenu
          currentPage={currentPage}
          scale={scale}
          setCurrentPage={setCurrentPage}
          setScale={setScale}
          totalPages={totalPages}
        />
      )}
    </View>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  backIcon: {
    height: SIZE_24,
    width: SIZE_24,
  },
  backIconContainer: {
    left: SIZE_16 / 2,
    position: "absolute",
    top: SIZE_16 * 0.75,
    zIndex: 1,
  },
  iconContainer: {
    alignItems: "center",
    columnGap: 12,
    flexDirection: "row",
  },
  menuStyle: {
    alignItems: "center",
    backgroundColor: "#101828E0",
    borderRadius: 92,
    borderWidth: 1,
    bottom: 12,
    columnGap: 14,
    flexDirection: "row",
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: "absolute",
  },
  pageView: {
    backgroundColor: CombinedDefaultTheme.colors.background,
    borderColor: "#EAECF0",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 1,
    height: 28,
    padding: 2,
    shadowColor: "#101828",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    textAlign: "center",
    width: 42,
  },
  pdf: {
    height: SIZE_16 * 13.5,
    width: "100%",
  },
  pdfContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: SIZE_20,
  },
  pdfIcon: {
    height: 20,
    width: 20,
  },
  totalPageCount: {
    color: CombinedDefaultTheme.colors.background,
  },
});
