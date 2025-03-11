import merge from "deepmerge";
import { Platform } from "react-native";
import { configureFonts, MD3LightTheme } from "react-native-paper";

const fontConfig = {
  custom100_12: {
    fontFamily: Platform.select({
      android: "Inter_100Thin",
      ios: "Inter-Thin",
    }),
    fontSize: 12,
    latterSpacing: 0,
    lineHeight: 16,
  },
  custom400_10: {
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
    fontSize: 10,
    latterSpacing: 0,
    lineHeight: 16,
  },
  custom400_18: {
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
    fontSize: 18,
    latterSpacing: 0,
    lineHeight: 28,
  },
  custom500_10: {
    fontFamily: Platform.select({
      android: "Inter_500Medium",
      ios: "Inter-Medium",
    }),
    fontSize: 10,
    latterSpacing: 0,
    lineHeight: 12,
  },
  custom500_18: {
    fontFamily: Platform.select({
      android: "Inter_500Medium",
      ios: "Inter-Medium",
    }),
    fontSize: 18,
    latterSpacing: 0,
    lineHeight: 28,
  },
  custom600_12: {
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
    fontSize: 12,
    latterSpacing: -0.5,
    lineHeight: 20,
  },
  custom600_14: {
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
    fontSize: 14,
    latterSpacing: 0,
    lineHeight: 20,
  },
  custom600_16: {
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },
  custom600_24: {
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 32,
  },
  custom700: {
    fontFamily: Platform.select({
      android: "Inter_700Bold",
      ios: "Inter-Bold",
    }),
    latterSpacing: 0,
  },
  custom700_18: {
    fontFamily: Platform.select({
      android: "Inter_700Bold",
      ios: "Inter-Bold",
    }),
    fontSize: 18,
    latterSpacing: 0,
    lineHeight: 28,
  },
  custom900: {
    fontFamily: Platform.select({
      android: "Inter_900Black",
      ios: "Inter-Black",
    }),
    lineHeight: 42,
  },
};

const themeObj = {
  animation: {
    scale: 1.0,
  },
  colors: {
    /* eslint-disable sort-keys */
    primary: "#852DCD",
    // primaryContainer: palette.primary90,
    secondary: "#852DCD",
    // secondaryContainer: palette.secondary90,
    tertiary: "#8A959C",
    // tertiaryContainer: palette.tertiary90,
    surface: "#F6F7F8",
    // surfaceVariant: palette.neutralVariant90,
    // surfaceDisabled: color(palette.neutral10)
    //   .alpha(opacity.level2)
    //   .rgb()
    //   .string(),
    background: "#FFFFFF",
    // error: palette.error40,
    // errorContainer: palette.error90,
    // onPrimary: palette.primary100,
    // onPrimaryContainer: palette.primary10,
    // onSecondary: palette.secondary100,
    // onSecondaryContainer: palette.secondary10,
    // onTertiary: palette.tertiary100,
    // onTertiaryContainer: palette.tertiary10,
    // onSurface: palette.neutral10,
    // onSurfaceVariant: palette.neutralVariant30,
    // onSurfaceDisabled: color(palette.neutral10)
    //   .alpha(opacity.level4)
    //   .rgb()
    //   .string(),
    // onError: palette.error100,
    // onErrorContainer: palette.error10,
    // onBackground: palette.neutral10,
    // outline: palette.neutralVariant50,
    // outlineVariant: palette.neutralVariant80,
    // inverseSurface: palette.neutral20,
    // inverseOnSurface: palette.neutral95,
    // inversePrimary: palette.primary80,
    // shadow: palette.neutral0,
    // scrim: palette.neutral0,
    // backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
    // elevation: {
    //   level0: 'transparent',
    //   // Note: Color values with transparency cause RN to transfer shadows to children nodes
    //   // instead of View component in Surface. Providing solid background fixes the issue.
    //   // Opaque color values generated with `palette.primary99` used as background
    //   level1: 'rgb(247, 243, 249)', // palette.primary40, alpha 0.05
    //   level2: 'rgb(243, 237, 246)', // palette.primary40, alpha 0.08
    //   level3: 'rgb(238, 232, 244)', // palette.primary40, alpha 0.11
    //   level4: 'rgb(236, 230, 243)', // palette.primary40, alpha 0.12
    //   level5: 'rgb(233, 227, 241)', // palette.primary40, alpha 0.14
    // },
    /* eslint-enable sort-keys */
  },
  dark: false,
  fonts: configureFonts({
    config: fontConfig,
  }),
  isV3: true,
  roundness: 4,
  version: 3,
};

export const CombinedDefaultTheme = merge(MD3LightTheme, {
  ...themeObj,
  colors: {
    ...themeObj.colors,
  },
  ...themeObj,
});
