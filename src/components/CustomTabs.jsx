import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key || "");
  const theme = useTheme();
  const scrollViewRef = useRef(null);
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const tabPositions = useRef({});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      width: indicatorWidth.value,
    };
  });

  const updateIndicator = (key) => {
    const { position, width } = tabPositions.current[key] || {};
    if (position !== undefined && width !== undefined) {
      indicatorPosition.value = withSpring(position);
      indicatorWidth.value = withTiming(width);
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: Math.max(0, position - 50),
      });
    }
  };

  const renderContent = () => {
    const activeTabObj = tabs.find((tab) => tab.key === activeTab);
    return activeTabObj?.content || null;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <Pressable
                key={tab.key}
                style={styles.tab}
                onLayout={({ nativeEvent }) => {
                  const { x, width } = nativeEvent.layout;
                  tabPositions.current[tab.key] = { position: x, width };
                  if (tab.key === activeTab) {
                    updateIndicator(tab.key);
                  }
                }}
                onPress={() => {
                  setActiveTab(tab.key);
                  updateIndicator(tab.key);
                }}
              >
                <Text
                  style={{
                    color: isActive
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant,
                  }}
                  variant="custom500_14"
                >
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor: theme.colors.primary },
            animatedStyles,
          ]}
        />
      </ScrollView>

      {/* Render Content Based on Active Tab */}
      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  indicator: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: 0,
    height: 4,
    position: "absolute",
  },
  scrollContent: {
    minWidth: "100%",
    paddingRight: 24,
  },
  scrollView: {
    flexGrow: 0,
    marginBottom: 12,
    paddingLeft: 15,
  },
  tab: {
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  tabsContainer: {
    borderBottomColor: "#E4E4E7",
    borderBottomWidth: 1,
    columnGap: 24,
    flexDirection: "row",
  },
});
