/* eslint-disable simple-import-sort/imports */
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Router from "./src/Router";
import { CombinedDefaultTheme } from "./src/styles/theme";
import { BugTracking } from "@ruttl/bug-tracking";

const BUILD = false;
const PROJECT_ID = BUILD ? "HE667tH71bHPguKvvHd5" : "UAIiqxkYSyleRSM1kDiY";
const TOKEN = BUILD
  ? "EolWVGDVNuZHnwZVG1TMDWbtAji1"
  : "DUZBs8DMgcX4LpXHmoRJqQG2flt2";

(async () => {
  await SplashScreen.preventAutoHideAsync();
})();
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={CombinedDefaultTheme}>
          {/* <StatusBar hidden /> */}
          <BugTracking projectID={PROJECT_ID} token={TOKEN} />
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <SafeAreaView
                edges={["top", "left", "right"]}
                style={styles.container}
                onLayout={onLayout}
              >
                <Router />
              </SafeAreaView>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
