import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Router from "./src/Router";
import { CombinedDefaultTheme } from "./src/styles/theme";

(async () => {
  await SplashScreen.preventAutoHideAsync();
})();
export default function App() {
  const [fontsLoaded] = useFonts([
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  ]);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (fontsLoaded) {
    return (
      <GestureHandlerRootView>
        <PaperProvider theme={CombinedDefaultTheme}>
          <StatusBar style="dark" />
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <SafeAreaView
                edges={["top", "right", "left"]}
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
