import React from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";

import { Dimensions } from "../../utils/constant";

const SIZE_16 = Dimensions.margin;
const SIZE_20 = SIZE_16 * 1.25;
const SIZE_24 = SIZE_16 * 1.5;

const PDFViewer = () => {
  const source = {
    cache: true,
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  };

  return (
    <View style={styles.pdfContainer}>
      <Pdf
        source={source}
        style={styles.pdf}
        onError={(error) => console.log(error)}
      />
    </View>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  pdf: {
    height: SIZE_16 * 12.5,
    width: "100%",
  },
  pdfContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: SIZE_20,
    marginTop: SIZE_24,
  },
});
