import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Image, StyleSheet, View } from "react-native";

import { CombinedDefaultTheme } from "../styles/theme";
import { Dimensions } from "../utils/constant";

function RenderBackdropComponent({ backgroundColor, showIndicator }) {
  return (
    <View
      style={[styles.handleIndicator, { backgroundColor: backgroundColor }]}
    >
      {showIndicator && (
        <Image
          source={require("../assets/icons/handle_indicator.png")}
          style={styles.indicatorIcon}
        />
      )}
    </View>
  );
}

const BottomDrawer = forwardRef(
  (
    { children, onDismiss, backgroundColor, snapPoints, showIndicator = true },
    ref,
  ) => {
    const HandleIndicator = () => {
      return (
        <RenderBackdropComponent
          backgroundColor={backgroundColor}
          showIndicator={showIndicator}
        />
      );
    };

    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.7}
            pressBehavior="close"
          />
        )}
        enablePanDownToClose={true}
        handleComponent={HandleIndicator}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  handleIndicator: {
    alignItems: "center",
    backgroundColor: CombinedDefaultTheme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    paddingTop: Dimensions.padding * 1.25,
  },
  indicatorIcon: {
    height: Dimensions.margin / 5.33,
    resizeMode: "contain",
  },
});

BottomDrawer.displayName = "BottomDrawer";

export default BottomDrawer;
